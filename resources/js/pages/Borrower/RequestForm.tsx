import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BorrowerLayout from '@/layouts/borrower-layout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormEventHandler } from 'react';

interface Item {
    id: number;
    nama_barang: string;
    deskripsi: string;
    kategori: string;
    jumlah_tersedia: number;
}

interface Props {
    items: Item[];
}

export default function RequestForm({ items }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: '',
        nama_peminjam: '',
        instansi: '',
        email: '',
        no_hp: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        jumlah: '',
        keperluan: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/borrower/submit-request');
    };

    const selectedItem = items.find(item => item.id === parseInt(data.item_id));

    return (
        <BorrowerLayout>
            <Head title="Form Peminjaman" />
            
            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Peminjaman</h1>
                            <p className="text-gray-600">Isi formulir untuk mengajukan peminjaman barang</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Peminjaman</CardTitle>
                                <CardDescription>
                                    Pastikan semua informasi yang Anda masukkan sudah benar
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="item_id">Barang <span className="text-red-500">*</span></Label>
                                        <Select value={data.item_id} onValueChange={(value) => setData('item_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih barang" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {items.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.nama_barang} (Tersedia: {item.jumlah_tersedia})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.item_id && <p className="text-sm text-red-500 mt-1">{errors.item_id}</p>}
                                    </div>

                                    {selectedItem && (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-700 mb-2">{selectedItem.deskripsi}</p>
                                            <p className="text-sm font-semibold text-blue-900">
                                                Jumlah Tersedia: {selectedItem.jumlah_tersedia} unit
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nama_peminjam">Nama Lengkap <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="nama_peminjam"
                                                value={data.nama_peminjam}
                                                onChange={(e) => setData('nama_peminjam', e.target.value)}
                                                required
                                            />
                                            {errors.nama_peminjam && <p className="text-sm text-red-500 mt-1">{errors.nama_peminjam}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="instansi">Instansi <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="instansi"
                                                value={data.instansi}
                                                onChange={(e) => setData('instansi', e.target.value)}
                                                required
                                            />
                                            {errors.instansi && <p className="text-sm text-red-500 mt-1">{errors.instansi}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="no_hp">No. HP <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="no_hp"
                                                value={data.no_hp}
                                                onChange={(e) => setData('no_hp', e.target.value)}
                                                required
                                            />
                                            {errors.no_hp && <p className="text-sm text-red-500 mt-1">{errors.no_hp}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="tanggal_mulai">Tanggal Mulai <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="tanggal_mulai"
                                                type="date"
                                                value={data.tanggal_mulai}
                                                onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                                required
                                            />
                                            {errors.tanggal_mulai && <p className="text-sm text-red-500 mt-1">{errors.tanggal_mulai}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="tanggal_selesai">Tanggal Selesai <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="tanggal_selesai"
                                                type="date"
                                                value={data.tanggal_selesai}
                                                onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                                required
                                            />
                                            {errors.tanggal_selesai && <p className="text-sm text-red-500 mt-1">{errors.tanggal_selesai}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="jumlah">Jumlah <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="jumlah"
                                            type="number"
                                            min="1"
                                            max={selectedItem?.jumlah_tersedia || 999}
                                            value={data.jumlah}
                                            onChange={(e) => setData('jumlah', e.target.value)}
                                            required
                                        />
                                        {errors.jumlah && <p className="text-sm text-red-500 mt-1">{errors.jumlah}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="keperluan">Keperluan <span className="text-red-500">*</span></Label>
                                        <Textarea
                                            id="keperluan"
                                            value={data.keperluan}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('keperluan', e.target.value)}
                                            rows={4}
                                            required
                                        />
                                        {errors.keperluan && <p className="text-sm text-red-500 mt-1">{errors.keperluan}</p>}
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit" disabled={processing} className="flex-1">
                                            {processing ? 'Mengirim...' : 'Ajukan Peminjaman'}
                                        </Button>
                                        <Link href="/borrower/catalog">
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
            </div>
        </BorrowerLayout>
    );
}
