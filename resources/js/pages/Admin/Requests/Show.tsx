import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Calendar, User, Building, Package, FileText } from 'lucide-react';
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
        id: number;
        nama_barang: string;
        kategori: string;
        deskripsi: string;
        jumlah_tersedia: number;
    };
    approval_history?: Array<{
        id: number;
        status: string;
        notes: string;
        created_at: string;
        admin: {
            name: string;
        };
    }>;
}

interface Props {
    request: BorrowRequest;
}

export default function RequestsShow({ request }: Props) {
    const handleApprove = () => {
        if (confirm('Apakah Anda yakin ingin menyetujui pengajuan ini?')) {
            router.post(`/admin/requests/${request.id}/approve`);
        }
    };

    const handleReject = () => {
        const reason = prompt('Masukkan alasan penolakan:');
        if (reason) {
            router.post(`/admin/requests/${request.id}/reject`, { reason });
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, label: 'Menunggu Persetujuan', color: 'bg-yellow-100 text-yellow-800' },
            approved: { variant: 'default' as const, label: 'Disetujui', color: 'bg-green-100 text-green-800' },
            rejected: { variant: 'destructive' as const, label: 'Ditolak', color: 'bg-red-100 text-red-800' },
            on_progress: { variant: 'default' as const, label: 'Sedang Berlangsung', color: 'bg-blue-100 text-blue-800' },
            completed: { variant: 'secondary' as const, label: 'Selesai', color: 'bg-gray-100 text-gray-800' },
        };

        const config = variants[status as keyof typeof variants] || variants.pending;
        return config;
    };

    const statusConfig = getStatusBadge(request.status);

    return (
        <AuthenticatedLayout>
            <Head title="Detail Pengajuan" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/admin/requests">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Detail Pengajuan</h1>
                                <p className="text-gray-600 mt-1">Informasi lengkap pengajuan peminjaman</p>
                            </div>
                            <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Peminjam Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Informasi Peminjam
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Nama</label>
                                    <p className="text-lg">{request.nama_peminjam}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Instansi</label>
                                    <p>{request.instansi}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Email</label>
                                    <p>{request.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">No. HP</label>
                                    <p>{request.no_hp}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Item Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Informasi Barang
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Barang</label>
                                    <p className="text-lg">{request.item.nama_barang}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Kategori</label>
                                    <p>{request.item.kategori}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Jumlah Dipinjam</label>
                                    <p className="text-lg font-semibold">{request.jumlah} unit</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Stok Tersedia</label>
                                    <p>{request.item.jumlah_tersedia} unit</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Periode */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Periode Peminjaman
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Tanggal Mulai</label>
                                    <p className="text-lg">{format(new Date(request.tanggal_mulai), 'dd MMMM yyyy', { locale: id })}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Tanggal Selesai</label>
                                    <p className="text-lg">{format(new Date(request.tanggal_selesai), 'dd MMMM yyyy', { locale: id })}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Tanggal Pengajuan</label>
                                    <p>{format(new Date(request.created_at), 'dd MMMM yyyy HH:mm', { locale: id })}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Keperluan */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Keperluan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap">{request.keperluan}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    {request.status === 'pending' && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Tindakan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <Button
                                        className="gap-2 bg-green-600 hover:bg-green-700"
                                        onClick={handleApprove}
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Setujui Pengajuan
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="gap-2"
                                        onClick={handleReject}
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Tolak Pengajuan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Approval History */}
                    {request.approval_history && request.approval_history.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Riwayat Persetujuan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {request.approval_history.map((history) => (
                                        <div key={history.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant={history.status === 'approved' ? 'default' : 'destructive'}>
                                                    {history.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    oleh {history.admin.name}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{history.notes}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {format(new Date(history.created_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
