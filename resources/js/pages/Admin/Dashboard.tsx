import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Stats {
    total_items: number;
    active_items: number;
    total_borrow_requests: number;
    pending_requests: number;
    approved_requests: number;
    on_progress_requests: number;
    returned_requests: number;
    rejected_requests: number;
}

interface BorrowRequest {
    id: number;
    nama_peminjam: string;
    status: string;
    created_at: string;
    item: {
        nama_barang: string;
    };
}

interface Props {
    stats: Stats;
    recentRequests: BorrowRequest[];
}

export default function Dashboard({ stats, recentRequests }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-gray-600">Ringkasan statistik sistem inventaris</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Total Barang</CardDescription>
                                <CardTitle className="text-3xl">{stats.total_items}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-gray-500">
                                    {stats.active_items} aktif
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Pengajuan Pending</CardDescription>
                                <CardTitle className="text-3xl">{stats.pending_requests}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-gray-500">
                                    Menunggu persetujuan
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Sedang Dipinjam</CardDescription>
                                <CardTitle className="text-3xl">{stats.on_progress_requests}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-gray-500">
                                    Dalam penggunaan
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Total Pengajuan</CardDescription>
                                <CardTitle className="text-3xl">{stats.total_borrow_requests}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-gray-500">
                                    {stats.approved_requests} disetujui
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Requests */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengajuan Terbaru</CardTitle>
                            <CardDescription>5 pengajuan peminjaman terbaru</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Peminjam</TableHead>
                                        <TableHead>Barang</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">
                                                {request.nama_peminjam}
                                            </TableCell>
                                            <TableCell>{request.item.nama_barang}</TableCell>
                                            <TableCell>
                                                <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                                                    {request.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(request.created_at).toLocaleDateString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
