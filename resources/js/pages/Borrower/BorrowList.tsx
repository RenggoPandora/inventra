import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BorrowerLayout from '@/layouts/borrower-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface BorrowRequest {
    id: number;
    nama_peminjam: string;
    instansi: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    jumlah: number;
    status: string;
    item: {
        nama_barang: string;
    };
}

interface Props {
    borrowRequests: BorrowRequest[];
}

export default function BorrowList({ borrowRequests }: Props) {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
            pending: { variant: 'secondary', label: 'Menunggu' },
            approved: { variant: 'default', label: 'Disetujui' },
            rejected: { variant: 'destructive', label: 'Ditolak' },
            on_progress: { variant: 'default', label: 'Berlangsung' },
            returned: { variant: 'secondary', label: 'Dikembalikan' },
        };

        const config = variants[status] || variants.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    return (
        <BorrowerLayout>
            <Head title="Daftar Peminjaman" />
            
            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Peminjaman</h1>
                        <p className="text-gray-600">Lihat semua pengajuan peminjaman yang telah diajukan</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Semua Peminjaman</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Peminjam</TableHead>
                                        <TableHead>Instansi</TableHead>
                                        <TableHead>Barang</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Waktu Peminjaman</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {borrowRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">{request.nama_peminjam}</TableCell>
                                            <TableCell>{request.instansi}</TableCell>
                                            <TableCell>{request.item.nama_barang}</TableCell>
                                            <TableCell>{request.jumlah}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{format(new Date(request.tanggal_mulai), 'dd MMM yyyy HH:mm', { locale: id })}</div>
                                                    <div className="text-gray-500">s/d {format(new Date(request.tanggal_selesai), 'dd MMM yyyy HH:mm', { locale: id })}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {borrowRequests.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Belum ada pengajuan peminjaman</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </BorrowerLayout>
    );
}
