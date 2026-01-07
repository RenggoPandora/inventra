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
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Item {
    id: number;
    nama_barang: string;
    deskripsi: string;
    kategori: string;
    jumlah_total: number;
    jumlah_tersedia: number;
    status: string;
}

interface Props {
    items: Item[];
}

export default function ItemsIndex({ items }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
            router.delete(`/admin/items/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Barang" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manajemen Barang</h1>
                            <p className="text-gray-600 mt-1">Kelola data barang inventaris</p>
                        </div>
                        <Link href="/admin/items/create">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Barang
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Barang</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Barang</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Jumlah Total</TableHead>
                                        <TableHead>Tersedia</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                {item.nama_barang}
                                            </TableCell>
                                            <TableCell>{item.kategori}</TableCell>
                                            <TableCell>{item.jumlah_total}</TableCell>
                                            <TableCell>{item.jumlah_tersedia}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === 'available' ? 'default' : 'secondary'}>
                                                    {item.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/items/${item.id}/edit`}>
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <Pencil className="h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {items.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Belum ada barang yang terdaftar</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
