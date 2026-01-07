import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Calendar, ClipboardCheck, Shield, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function Welcome({ auth }: Props) {
    const features = [
        {
            icon: Package,
            title: 'Manajemen Inventaris',
            description: 'Kelola aset dan barang inventaris dengan sistem yang terorganisir dan mudah diakses'
        },
        {
            icon: Calendar,
            title: 'Penjadwalan Real-time',
            description: 'Lihat ketersediaan barang dalam kalender interaktif untuk menghindari konflik jadwal'
        },
        {
            icon: ClipboardCheck,
            title: 'Persetujuan Digital',
            description: 'Proses approval peminjaman yang cepat dengan notifikasi dan tracking status'
        },
        {
            icon: Shield,
            title: 'Keamanan Data',
            description: 'Sistem pencatatan yang aman dengan riwayat lengkap setiap transaksi peminjaman'
        },
        {
            icon: Users,
            title: 'Multi User Access',
            description: 'Akses untuk peminjam dan admin dengan hak akses yang terpisah'
        },
        {
            icon: TrendingUp,
            title: 'Laporan & Analitik',
            description: 'Dashboard dan laporan lengkap untuk monitoring penggunaan aset'
        }
    ];

    const benefits = [
        'Efisiensi waktu dalam proses peminjaman',
        'Mengurangi kehilangan atau kerusakan aset',
        'Transparansi penggunaan barang inventaris',
        'Dokumentasi lengkap dan tertib administrasi'
    ];

    return (
        <>
            <Head title="INVENTRA - Sistem Manajemen Aset & Peminjaman" />
            
            {/* Navigation Bar */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3">
                            <img src="/assets/icon.svg" alt="INVENTRA" className="h-8 w-8 sm:h-10 sm:w-10" />
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                INVENTRA
                            </span>
                        </Link>
                        <div className="flex items-center gap-2 sm:gap-4">
                            {auth?.user ? (
                                <Link href="/admin/dashboard">
                                    <Button size="sm" className="sm:text-base">
                                        <span className="hidden sm:inline">Dashboard Admin</span>
                                        <span className="sm:hidden">Admin</span>
                                        <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/borrower/catalog" className="hidden sm:block">
                                        <Button variant="ghost" size="lg">
                                            Lihat Katalog
                                        </Button>
                                    </Link>
                                    <Link href="/borrower/catalog" className="sm:hidden">
                                        <Button variant="ghost" size="sm">
                                            Katalog
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="sm" className="sm:text-base sm:px-4 sm:py-2">
                                            <span className="hidden sm:inline">Login Admin</span>
                                            <span className="sm:hidden">Login</span>
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
                            Solusi Digital Manajemen Inventaris
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                            Kelola Aset Organisasi dengan
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Lebih Mudah</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
                            Platform manajemen inventaris berbasis web yang memudahkan anggota dalam meminjam barang 
                            dan administrator dalam mengelola aset dengan sistem yang transparan dan efisien.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <Link href="/borrower/catalog">
                                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all">
                                    Mulai Pinjam Barang
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </Link>
                            <Link href="/borrower/calendar">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2">
                                    Lihat Jadwal
                                    <Calendar className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-8 sm:py-12 bg-white border-y">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">24/7</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-600">Akses Online</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">Real-time</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-600">Tracking Status</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-1 sm:mb-2">Digital</div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-600">Approval Process</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
                                Fitur Unggulan
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                                Sistem lengkap untuk mengelola peminjaman barang inventaris organisasi dengan mudah dan efisien
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                                    <CardHeader className="pb-3">
                                        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                            <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Mengapa Memilih INVENTRA?
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                    Sistem yang dirancang khusus untuk kebutuhan organisasi dalam mengelola 
                                    aset dan memfasilitasi peminjaman barang oleh anggota dengan proses yang 
                                    transparan dan akuntabel.
                                </p>
                                <div className="space-y-3 sm:space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700 text-sm sm:text-base md:text-lg">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 sm:p-6 md:p-8">
                                <Card className="border-2">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-xl sm:text-2xl">Untuk Peminjam</CardTitle>
                                        <CardDescription className="text-sm sm:text-base">
                                            Akses mudah untuk anggota organisasi
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                                            <span>Lihat katalog barang tersedia</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                                            <span>Cek jadwal ketersediaan</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                                            <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                                            <span>Ajukan peminjaman online</span>
                                        </div>
                                        <Link href="/borrower/catalog" className="block mt-4 sm:mt-6">
                                            <Button className="w-full" size="lg">
                                                Mulai Sekarang
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                            Siap Mengelola Aset Organisasi Lebih Baik?
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
                            Bergabunglah dengan sistem manajemen inventaris yang memudahkan pelayanan kepada anggota
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                            <Link href="/borrower/catalog">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
                                    Pinjam Barang
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </Link>
                            {!auth?.user && (
                                <Link href="/login">
                                    <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white text-blue-600 hover:bg-gray-100">
                                        Login Admin
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <img src="/assets/icon.svg" alt="INVENTRA" className="h-7 w-7 sm:h-8 sm:w-8" />
                                    <span className="text-lg sm:text-xl font-bold text-white">INVENTRA</span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                    Sistem manajemen aset dan peminjaman barang untuk organisasi yang modern dan efisien.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Menu</h3>
                                <div className="space-y-2 text-sm sm:text-base">
                                    <Link href="/borrower/catalog" className="block hover:text-white transition-colors">
                                        Katalog Barang
                                    </Link>
                                    <Link href="/borrower/calendar" className="block hover:text-white transition-colors">
                                        Jadwal Peminjaman
                                    </Link>
                                    <Link href="/borrower/borrow-list" className="block hover:text-white transition-colors">
                                        Cek Status Pengajuan
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Admin</h3>
                                <div className="space-y-2 text-sm sm:text-base">
                                    {auth?.user ? (
                                        <Link href="/admin/dashboard" className="block hover:text-white transition-colors">
                                            Dashboard Admin
                                        </Link>
                                    ) : (
                                        <Link href="/login" className="block hover:text-white transition-colors">
                                            Login Admin
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
                            <p>&copy; 2026 INVENTRA. Sistem Manajemen Aset Organisasi.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
