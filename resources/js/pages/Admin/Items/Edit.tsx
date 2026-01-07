import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormEventHandler } from 'react';
import { ArrowLeft } from 'lucide-react';

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
    item: Item;
}

export default function ItemsEdit({ item }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama_barang: item.nama_barang,
        deskripsi: item.deskripsi,
        kategori: item.kategori,
        jumlah_total: item.jumlah_total.toString(),
        status: item.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/items/${item.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Barang" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/admin/items">
                            <Button variant="ghost" className="gap-2 mb-4">
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Barang</h1>
                        <p className="text-gray-600 mt-1">Perbarui informasi barang inventaris</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Barang</CardTitle>
                            <CardDescription>
                                Perbarui detail informasi barang
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nama_barang">Nama Barang *</Label>
                                    <Input
                                        id="nama_barang"
                                        value={data.nama_barang}
                                        onChange={(e) => setData('nama_barang', e.target.value)}
                                        required
                                    />
                                    {errors.nama_barang && (
                                        <p className="text-sm text-red-600">{errors.nama_barang}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kategori">Kategori *</Label>
                                    <Select
                                        value={data.kategori}
                                        onValueChange={(value) => setData('kategori', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Elektronik">Elektronik</SelectItem>
                                            <SelectItem value="Furniture">Furniture</SelectItem>
                                            <SelectItem value="Alat Tulis">Alat Tulis</SelectItem>
                                            <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                                            <SelectItem value="Peralatan">Peralatan</SelectItem>
                                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.kategori && (
                                        <p className="text-sm text-red-600">{errors.kategori}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deskripsi">Deskripsi *</Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        rows={4}
                                        required
                                    />
                                    {errors.deskripsi && (
                                        <p className="text-sm text-red-600">{errors.deskripsi}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jumlah_total">Jumlah Total *</Label>
                                    <Input
                                        id="jumlah_total"
                                        type="number"
                                        min="1"
                                        value={data.jumlah_total}
                                        onChange={(e) => setData('jumlah_total', e.target.value)}
                                        required
                                    />
                                    <p className="text-sm text-gray-500">
                                        Jumlah tersedia saat ini: {item.jumlah_tersedia} unit
                                    </p>
                                    {errors.jumlah_total && (
                                        <p className="text-sm text-red-600">{errors.jumlah_total}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="available">Tersedia</SelectItem>
                                            <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                    <Link href="/admin/items">
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
