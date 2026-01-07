import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LayoutDashboard, Package, ClipboardList, Calendar, Users, LogOut } from 'lucide-react';

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const { props } = usePage<PageProps>();
    const { auth } = props;
    const url = usePage().url;
    
    const isActive = (path: string) => {
        return url.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-8">
                            <Link href="/admin/dashboard" className="flex items-center gap-2">
                                <img src="/assets/icon.svg" alt="INVENTRA" className="h-8 w-8" />
                                <span className="text-2xl font-bold text-blue-600">INVENTRA</span>
                                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
                            </Link>
                            
                            <div className="hidden md:flex gap-2">
                                <Link href="/admin/dashboard">
                                    <Button 
                                        variant={isActive('/admin/dashboard') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Link href="/admin/items">
                                    <Button 
                                        variant={isActive('/admin/items') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <Package className="h-4 w-4" />
                                        Barang
                                    </Button>
                                </Link>
                                <Link href="/admin/requests">
                                    <Button 
                                        variant={isActive('/admin/requests') && !url.includes('history') && !url.includes('calendar') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <ClipboardList className="h-4 w-4" />
                                        Pengajuan
                                    </Button>
                                </Link>
                                <Link href="/admin/calendar">
                                    <Button 
                                        variant={isActive('/admin/calendar') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Kalender
                                    </Button>
                                </Link>
                                <Link href="/admin/requests/history">
                                    <Button 
                                        variant={url.includes('history') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <ClipboardList className="h-4 w-4" />
                                        Riwayat
                                    </Button>
                                </Link>
                                <Link href="/admin/users">
                                    <Button 
                                        variant={isActive('/admin/users') ? 'default' : 'ghost'} 
                                        size="sm" 
                                        className="gap-2"
                                    >
                                        <Users className="h-4 w-4" />
                                        Admin
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <User className="h-4 w-4" />
                                        {auth.user.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/" className="cursor-pointer">
                                            Ke Halaman Utama
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/logout" method="post" as="button" className="w-full cursor-pointer text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
