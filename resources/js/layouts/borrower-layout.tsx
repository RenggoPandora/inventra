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
                <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4">
                    <div className="flex flex-col gap-2 sm:gap-3">
                        {/* Top Row: Logo and Back Button */}
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
                                <img src="/assets/icon.svg" alt="INVENTRA" className="h-7 w-7 sm:h-8 sm:w-8" />
                                <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">INVENTRA</span>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-3 text-xs sm:text-sm">
                                    <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    <span className="hidden xs:inline">Kembali</span>
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Bottom Row: Navigation Menu */}
                        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
                            <Link href="/borrower/catalog">
                                <Button 
                                    size="sm"
                                    variant={isActive('/borrower/catalog') ? 'default' : 'ghost'} 
                                    className={`whitespace-nowrap text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9 ${isActive('/borrower/catalog') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
                                >
                                    Katalog
                                </Button>
                            </Link>
                            <Link href="/borrower/calendar">
                                <Button 
                                    size="sm"
                                    variant={isActive('/borrower/calendar') ? 'default' : 'ghost'} 
                                    className={`whitespace-nowrap text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9 ${isActive('/borrower/calendar') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
                                >
                                    Kalender
                                </Button>
                            </Link>
                            <Link href="/borrower/borrow-list">
                                <Button 
                                    size="sm"
                                    variant={isActive('/borrower/borrow-list') ? 'default' : 'ghost'} 
                                    className={`whitespace-nowrap text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9 ${isActive('/borrower/borrow-list') ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50'}`}
                                >
                                    <span className="hidden xs:inline">Daftar </span>Peminjaman
                                </Button>
                            </Link>
                            <Link href="/borrower/request-form">
                                <Button 
                                    size="sm"
                                    variant={isActive('/borrower/request-form') ? 'default' : 'outline'} 
                                    className={`whitespace-nowrap text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9 ${isActive('/borrower/request-form') ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                                >
                                    Ajukan<span className="hidden xs:inline"> Peminjaman</span>
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
