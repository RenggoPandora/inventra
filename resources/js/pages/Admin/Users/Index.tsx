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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

interface Props {
    users: User[];
    currentUserId: number;
}

export default function UsersIndex({ users, currentUserId }: Props) {
    const handleDelete = (userId: number, userName: string) => {
        if (userId === currentUserId) {
            alert('Anda tidak dapat menghapus akun sendiri.');
            return;
        }

        if (users.length <= 1) {
            alert('Tidak dapat menghapus admin terakhir. Harus ada minimal 1 admin aktif.');
            return;
        }

        if (confirm(`Apakah Anda yakin ingin menghapus admin "${userName}"?`)) {
            router.delete(`/admin/users/${userId}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Admin" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manajemen Admin</h1>
                            <p className="text-gray-600 mt-1">Kelola pengguna admin sistem</p>
                        </div>
                        <Link href="/admin/users/create">
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Admin
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Admin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Terdaftar</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.email_verified_at ? (
                                                    <Badge variant="default">Terverifikasi</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Belum Verifikasi</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(user.created_at), 'dd MMM yyyy', { locale: id })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}/edit`}>
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <Pencil className="h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        disabled={user.id === currentUserId || users.length <= 1}
                                                        title={
                                                            user.id === currentUserId 
                                                                ? 'Tidak dapat menghapus akun sendiri' 
                                                                : users.length <= 1 
                                                                    ? 'Harus ada minimal 1 admin aktif' 
                                                                    : ''
                                                        }
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

                            {users.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Belum ada admin terdaftar</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
