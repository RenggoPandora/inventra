import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface BorrowerLayoutProps {
    children: ReactNode;
}

export default function BorrowerLayout({ children }: BorrowerLayoutProps) {
    const { url } = usePage();
    
    const isActive = (path: string) => {
        return url === path;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                    <ArrowLeft className="h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>
                            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <img src="/assets/icon.svg" alt="INVENTRA" className="h-8 w-8" />
                                <span className="text-2xl font-bold text-blue-600">INVENTRA</span>
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/borrower/catalog">
                                <Button 
                                    variant={isActive('/borrower/catalog') ? 'default' : 'ghost'} 
                                    className={isActive('/borrower/catalog') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
                                >
                                    Katalog
                                </Button>
                            </Link>
                            <Link href="/borrower/calendar">
                                <Button 
                                    variant={isActive('/borrower/calendar') ? 'default' : 'ghost'} 
                                    className={isActive('/borrower/calendar') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
                                >
                                    Kalender
                                </Button>
                            </Link>
                            <Link href="/borrower/borrow-list">
                                <Button 
                                    variant={isActive('/borrower/borrow-list') ? 'default' : 'ghost'} 
                                    className={isActive('/borrower/borrow-list') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}
                                >
                                    Daftar Peminjaman
                                </Button>
                            </Link>
                            <Link href="/borrower/request-form">
                                <Button 
                                    variant={isActive('/borrower/request-form') ? 'default' : 'outline'} 
                                    className={isActive('/borrower/request-form') ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
                                >
                                    Ajukan Peminjaman
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-auto">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center text-gray-600 text-sm">
                        <p>&copy; 2026 INVENTRA - Sistem Manajemen Aset & Peminjaman Barang</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
