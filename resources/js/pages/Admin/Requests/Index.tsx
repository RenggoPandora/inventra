import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface BorrowRequest {
    id: number;
    nama_peminjam: string;
    instansi: string;
    email: string;
    no_hp: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    jumlah: number;
    keperluan: string;
    status: string;
    created_at: string;
    item: {
        nama_barang: string;
        kategori: string;
    };
}

interface Props {
    requests: BorrowRequest[];
}

export default function RequestsIndex({ requests }: Props) {
    const handleApprove = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menyetujui pengajuan ini?')) {
            router.post(`/admin/requests/${id}/approve`);
        }
    };

    const handleReject = (id: number) => {
        const reason = prompt('Masukkan alasan penolakan:');
        if (reason) {
            router.post(`/admin/requests/${id}/reject`, { reason });
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, label: 'Pending' },
            approved: { variant: 'default' as const, label: 'Disetujui' },
            rejected: { variant: 'destructive' as const, label: 'Ditolak' },
            on_progress: { variant: 'default' as const, label: 'Berlangsung' },
            completed: { variant: 'secondary' as const, label: 'Selesai' },
        };

        const config = variants[status as keyof typeof variants] || variants.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const pendingRequests = requests.filter(r => r.status === 'pending');

    return (
        <AuthenticatedLayout>
            <Head title="Persetujuan Peminjaman" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Persetujuan Peminjaman</h1>
                        <p className="text-gray-600 mt-1">Kelola pengajuan peminjaman barang yang menunggu persetujuan</p>
                    </div>

                    {/* Pending Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Menunggu Persetujuan
                                {pendingRequests.length > 0 && (
                                    <Badge variant="secondary">{pendingRequests.length}</Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Peminjam</TableHead>
                                        <TableHead>Barang</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Instansi</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{request.nama_peminjam}</div>
                                                    <div className="text-sm text-gray-500">{request.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{request.item.nama_barang}</div>
                                                    <div className="text-sm text-gray-500">{request.item.kategori}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{request.jumlah} unit</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{format(new Date(request.tanggal_mulai), 'dd MMM yyyy', { locale: id })}</div>
                                                    <div className="text-gray-500">s/d {format(new Date(request.tanggal_selesai), 'dd MMM yyyy', { locale: id })}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{request.instansi}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/requests/${request.id}`}>
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <Eye className="h-3 w-3" />
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="gap-2 bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleApprove(request.id)}
                                                    >
                                                        <CheckCircle className="h-3 w-3" />
                                                        Setujui
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() => handleReject(request.id)}
                                                    >
                                                        <XCircle className="h-3 w-3" />
                                                        Tolak
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {pendingRequests.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Tidak ada pengajuan yang menunggu persetujuan</p>
                                    <Link href="/admin/requests/history">
                                        <Button variant="outline" className="mt-4">
                                            Lihat Riwayat Pengajuan
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
