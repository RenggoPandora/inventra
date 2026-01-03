import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            INVENTRA
                        </h1>
                        <p className="text-xl text-gray-600 mb-2">
                            Sistem Manajemen Aset & Peminjaman Barang
                        </p>
                    </div>

                    {/* Main Card */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Selamat Datang!</CardTitle>
                            <CardDescription>
                                Platform manajemen inventaris dan peminjaman peralatan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-700">
                                Inventra adalah aplikasi berbasis website yang memungkinkan organisasi untuk 
                                melakukan manajemen aset berupa barang atau peralatan dengan sistem peminjaman 
                                yang mudah dan terorganisir.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Fitur Utama:</h3>
                                <ul className="list-disc list-inside text-blue-800 space-y-1">
                                    <li>Lihat katalog barang yang tersedia</li>
                                    <li>Ajukan peminjaman barang dengan mudah</li>
                                    <li>Lihat jadwal peminjaman dalam kalender</li>
                                    <li>Pantau status pengajuan peminjaman</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-blue-600">Peminjam</CardTitle>
                                <CardDescription>
                                    Akses katalog dan ajukan peminjaman barang
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/borrower/catalog">
                                    <Button className="w-full" size="lg">
                                        Mulai Pinjam Barang
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-indigo-600">Administrator</CardTitle>
                                <CardDescription>
                                    Kelola inventaris dan persetujuan peminjaman
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/login">
                                    <Button variant="outline" className="w-full" size="lg">
                                        Login Admin
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
