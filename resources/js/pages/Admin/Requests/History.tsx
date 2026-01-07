import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
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
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface BorrowRequest {
    id: number;
    nama_peminjam: string;
    instansi: string;
    email: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    jumlah: number;
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

export default function RequestsHistory({ requests = [] }: Props) {
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

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Peminjaman" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Riwayat Peminjaman</h1>
                        <p className="text-gray-600 mt-1">Semua riwayat pengajuan dan peminjaman barang</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Riwayat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal Pengajuan</TableHead>
                                        <TableHead>Peminjam</TableHead>
                                        <TableHead>Instansi</TableHead>
                                        <TableHead>Barang</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Periode Pinjam</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                {format(new Date(request.created_at), 'dd MMM yyyy HH:mm', { locale: id })}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{request.nama_peminjam}</div>
                                                    <div className="text-sm text-gray-500">{request.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{request.instansi}</TableCell>
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
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/admin/requests/${request.id}`}>
                                                    <Button variant="outline" size="sm" className="gap-2">
                                                        <Eye className="h-3 w-3" />
                                                        Detail
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {requests.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Belum ada riwayat peminjaman</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
