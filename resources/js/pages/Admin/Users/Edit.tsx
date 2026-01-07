import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    user: User;
}

export default function UsersEdit({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Admin" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/admin/users">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Admin</h1>
                        <p className="text-gray-600 mt-1">Perbarui informasi admin</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Admin</CardTitle>
                            <CardDescription>
                                Perbarui detail informasi admin
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="border-t pt-6 mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Ubah Password</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Kosongkan jika tidak ingin mengubah password
                                    </p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password Baru</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                                            <p className="text-sm text-gray-500">
                                                Minimal 8 karakter
                                            </p>
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                            />
                                            {errors.password_confirmation && (
                                                <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                    <Link href="/admin/users">
                                        <Button type="button" variant="outline">
                                            Batal
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
