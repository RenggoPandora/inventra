import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface BorrowerLayoutProps {
    children: ReactNode;
}

export default function BorrowerLayout({ children }: BorrowerLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            INVENTRA
                        </Link>
                        <div className="flex gap-4">
                            <Link href="/borrower/catalog">
                                <Button variant="ghost" className="hover:bg-blue-50">
                                    Katalog
                                </Button>
                            </Link>
                            <Link href="/borrower/calendar">
                                <Button variant="ghost" className="hover:bg-blue-50">
                                    Kalender
                                </Button>
                            </Link>
                            <Link href="/borrower/borrow-list">
                                <Button variant="ghost" className="hover:bg-blue-50">
                                    Daftar Peminjaman
                                </Button>
                            </Link>
                            <Link href="/borrower/request-form">
                                <Button className="bg-blue-600 hover:bg-blue-700">
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
