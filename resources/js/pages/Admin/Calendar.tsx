import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar as CalendarIcon, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    borderColor: string;
    extendedProps: {
        nama_peminjam: string;
        instansi: string;
        email: string;
        no_hp: string;
        item_name: string;
        jumlah: number;
        keperluan: string;
        status: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
    };
}

interface Props {
    events: Event[];
}

export default function AdminCalendar({ events }: Props) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [sortedEvents, setSortedEvents] = useState(events);
    const [sortField, setSortField] = useState<'start' | 'item' | 'status'>('start');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleEventClick = (info: { event: { id: string } }) => {
        const event = events.find(e => e.id === info.event.id);
        if (event) {
            setSelectedEvent(event);
        }
    };

    const handleSort = (field: 'start' | 'item' | 'status') => {
        const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newOrder);

        const sorted = [...events].sort((a, b) => {
            let aVal: string, bVal: string;
            
            if (field === 'start') {
                aVal = a.start;
                bVal = b.start;
            } else if (field === 'item') {
                aVal = a.extendedProps.item_name;
                bVal = b.extendedProps.item_name;
            } else {
                aVal = a.extendedProps.status;
                bVal = b.extendedProps.status;
            }

            if (newOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        setSortedEvents(sorted);
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            approved: { variant: 'default' as const, label: 'Disetujui', color: 'bg-green-100 text-green-800' },
            on_progress: { variant: 'default' as const, label: 'Sedang Berlangsung', color: 'bg-blue-100 text-blue-800' },
            returned: { variant: 'secondary' as const, label: 'Dikembalikan', color: 'bg-gray-100 text-gray-800' },
        };

        const config = variants[status as keyof typeof variants] || variants.approved;
        return config;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kalender Peminjaman" />

            <div className="py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kalender Peminjaman</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">Jadwal peminjaman barang yang telah disetujui</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Total Peminjaman</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{events.length}</div>
                                <p className="text-xs text-gray-500 mt-1">Peminjaman aktif</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {events.filter(e => e.extendedProps.status === 'approved').length}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Belum berlangsung</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Berlangsung</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    {events.filter(e => e.extendedProps.status === 'on_progress').length}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Sedang dipinjam</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Dikembalikan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-600">
                                    {events.filter(e => e.extendedProps.status === 'returned').length}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Sudah dikembalikan</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">Jadwal Peminjaman</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-6">
                            <Tabs defaultValue="calendar" className="w-full">
                                <TabsList className="grid w-full max-w-md grid-cols-2">
                                    <TabsTrigger value="calendar" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                                        <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="hidden sm:inline">Tampilan </span>Kalender
                                    </TabsTrigger>
                                    <TabsTrigger value="list" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                                        <List className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="hidden sm:inline">Tampilan </span>List
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="calendar" className="mt-4">
                                    <style>{`
                                        @media (max-width: 640px) {
                                            .fc .fc-button {
                                                padding: 0.25rem 0.5rem;
                                                font-size: 0.75rem;
                                            }
                                            .fc .fc-toolbar-title {
                                                font-size: 1rem;
                                            }
                                            .fc .fc-col-header-cell {
                                                font-size: 0.75rem;
                                            }
                                            .fc .fc-daygrid-day-number {
                                                font-size: 0.75rem;
                                            }
                                            .fc .fc-event {
                                                font-size: 0.65rem;
                                                padding: 1px 2px;
                                                margin-bottom: 1px;
                                            }
                                            .fc .fc-event-title {
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                            }
                                            .fc .fc-event-time {
                                                display: none;
                                            }
                                            .fc .fc-daygrid-event {
                                                white-space: nowrap;
                                            }
                                        }
                                    `}</style>
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        events={events}
                                        eventClick={handleEventClick}
                                        height="auto"
                                        locale="id"
                                        buttonText={{
                                            today: 'Hari Ini',
                                            month: 'Bulan',
                                            week: 'Minggu',
                                            day: 'Hari'
                                        }}
                                        slotLabelFormat={{
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        }}
                                        eventTimeFormat={{
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        }}
                                    />
                                </TabsContent>

                                <TabsContent value="list" className="mt-4">
                                    <div className="rounded-md border overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleSort('item')}
                                                            className="font-semibold"
                                                        >
                                                            Barang {sortField === 'item' && (sortOrder === 'asc' ? '↑' : '↓')}
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead>Peminjam</TableHead>
                                                    <TableHead>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleSort('start')}
                                                            className="font-semibold"
                                                        >
                                                            Waktu Mulai {sortField === 'start' && (sortOrder === 'asc' ? '↑' : '↓')}
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead>Waktu Selesai</TableHead>
                                                    <TableHead>Jumlah</TableHead>
                                                    <TableHead>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleSort('status')}
                                                            className="font-semibold"
                                                        >
                                                            Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                                                        </Button>
                                                    </TableHead>
                                                    <TableHead>Aksi</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sortedEvents.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                                            Tidak ada data peminjaman
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    sortedEvents.map((event) => (
                                                        <TableRow key={event.id}>
                                                            <TableCell className="font-medium">
                                                                {event.extendedProps.item_name}
                                                            </TableCell>
                                                            <TableCell>
                                                                <div>
                                                                    <div className="font-medium">{event.extendedProps.nama_peminjam}</div>
                                                                    <div className="text-sm text-gray-500">{event.extendedProps.instansi}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{event.extendedProps.tanggal_mulai}</TableCell>
                                                            <TableCell>{event.extendedProps.tanggal_selesai}</TableCell>
                                                            <TableCell>{event.extendedProps.jumlah} unit</TableCell>
                                                            <TableCell>
                                                                <Badge className={getStatusBadge(event.extendedProps.status).color}>
                                                                    {getStatusBadge(event.extendedProps.status).label}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex gap-1 sm:gap-2">
                                                                    <Button 
                                                                        size="sm" 
                                                                        variant="outline"
                                                                        onClick={() => setSelectedEvent(event)}
                                                                        className="px-2"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Link href={`/admin/requests/${event.id}`}>
                                                                        <Button size="sm" variant="default" className="px-2 sm:px-4">
                                                                            <span className="hidden sm:inline">Detail</span>
                                                                            <span className="sm:hidden">→</span>
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Event Detail Dialog */}
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                {selectedEvent && (
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl">Detail Peminjaman</DialogTitle>
                            <DialogDescription className="text-sm">
                                Informasi lengkap peminjaman barang
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Barang</label>
                                    <p className="text-lg">{selectedEvent.extendedProps.item_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Jumlah</label>
                                    <p className="text-lg font-semibold">{selectedEvent.extendedProps.jumlah} unit</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Status</label>
                                    <div className="mt-1">
                                        <Badge className={getStatusBadge(selectedEvent.extendedProps.status).color}>
                                            {getStatusBadge(selectedEvent.extendedProps.status).label}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Peminjam</label>
                                    <p className="text-lg">{selectedEvent.extendedProps.nama_peminjam}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Instansi</label>
                                    <p>{selectedEvent.extendedProps.instansi}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Kontak</label>
                                    <p className="text-sm">{selectedEvent.extendedProps.email}</p>
                                    <p className="text-sm">{selectedEvent.extendedProps.no_hp}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Waktu Mulai</label>
                                <p className="text-sm sm:text-base">{selectedEvent.extendedProps.tanggal_mulai}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Waktu Selesai</label>
                                <p className="text-sm sm:text-base">{selectedEvent.extendedProps.tanggal_selesai}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-sm font-semibold text-gray-600">Keperluan</label>
                            <p className="text-sm sm:text-base text-gray-700 mt-1 whitespace-pre-wrap">{selectedEvent.extendedProps.keperluan}</p>
                        </div>
                        <div className="mt-4 sm:mt-6 flex gap-2">
                            <Link href={`/admin/requests/${selectedEvent.id}`}>
                                <Button className="gap-2 w-full sm:w-auto text-sm">
                                    <Eye className="h-4 w-4" />
                                    <span className="hidden sm:inline">Lihat Detail Lengkap</span>
                                    <span className="sm:hidden">Detail Lengkap</span>
                                </Button>
                            </Link>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </AuthenticatedLayout>
    );
}
