import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Package, Shield, CheckCircle2, TrendingUp } from 'lucide-react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const features = [
        {
            icon: Package,
            text: 'Manajemen inventaris terpusat'
        },
        {
            icon: Shield,
            text: 'Keamanan data terjamin'
        },
        {
            icon: CheckCircle2,
            text: 'Persetujuan digital cepat'
        },
        {
            icon: TrendingUp,
            text: 'Laporan dan analitik lengkap'
        }
    ];

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
                </div>
                
                <div className="relative z-10">
                    <Link href={home()} className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
                        <img src="/assets/icon.svg" alt="INVENTRA" className="h-10 w-10" />
                        <span className="text-3xl font-bold">INVENTRA</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Sistem Manajemen Aset untuk Organisasi
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Platform lengkap untuk mengelola inventaris dan peminjaman barang dengan sistem yang transparan dan efisien.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-white">
                                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <span className="text-white/90">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white/70 text-sm">
                    &copy; 2026 INVENTRA. All rights reserved.
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href={home()} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img src="/assets/icon.svg" alt="INVENTRA" className="h-10 w-10" />
                            <span className="text-2xl font-bold text-blue-600">
                                INVENTRA
                            </span>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>

                    {/* Mobile Footer */}
                    <div className="lg:hidden mt-8 text-center text-xs text-gray-500">
                        &copy; 2026 INVENTRA. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
