import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BorrowerLayout from '@/layouts/borrower-layout';

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

export default function Catalog({ items }: Props) {
    return (
        <BorrowerLayout>
            <Head title="Katalog Barang" />
            
            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog Barang</h1>
                        <p className="text-gray-600">Lihat dan pilih barang yang tersedia untuk dipinjam</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <Card key={item.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-lg">{item.nama_barang}</CardTitle>
                                        <Badge variant={item.jumlah_tersedia > 0 ? 'default' : 'secondary'}>
                                            {item.kategori}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">
                                        {item.deskripsi}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Total:</span>
                                            <span className="font-semibold">{item.jumlah_total}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tersedia:</span>
                                            <span className={`font-semibold ${item.jumlah_tersedia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.jumlah_tersedia}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="/borrower/request-form">
                                        <Button 
                                            className="w-full mt-4" 
                                            disabled={item.jumlah_tersedia === 0}
                                        >
                                            {item.jumlah_tersedia > 0 ? 'Pinjam Barang' : 'Tidak Tersedia'}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {items.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Belum ada barang tersedia</p>
                        </div>
                    )}
                </div>
            </div>
        </BorrowerLayout>
    );
}
