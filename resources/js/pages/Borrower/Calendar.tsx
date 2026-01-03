import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import BorrowerLayout from '@/layouts/borrower-layout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    extendedProps: {
        nama_peminjam: string;
        instansi: string;
        item_name: string;
        jumlah: number;
        keperluan: string;
        status: string;
    };
}

interface Props {
    events: Event[];
}

export default function Calendar({ events }: Props) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleEventClick = (info: { event: { id: string } }) => {
        const event = events.find(e => e.id === info.event.id);
        if (event) {
            setSelectedEvent(event);
        }
    };

    return (
        <BorrowerLayout>
            <Head title="Kalender Peminjaman" />
            
            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kalender Peminjaman</h1>
                        <p className="text-gray-600">Lihat jadwal peminjaman yang telah disetujui</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Peminjaman</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={events}
                                eventClick={handleEventClick}
                                height="auto"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,dayGridWeek'
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Event Detail Dialog */}
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                {selectedEvent && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detail Peminjaman</DialogTitle>
                            <DialogDescription>
                                Informasi lengkap peminjaman barang
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Barang</label>
                                <p className="text-lg">{selectedEvent.extendedProps.item_name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Peminjam</label>
                                <p>{selectedEvent.extendedProps.nama_peminjam}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Instansi</label>
                                <p>{selectedEvent.extendedProps.instansi}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Jumlah</label>
                                <p>{selectedEvent.extendedProps.jumlah} unit</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Keperluan</label>
                                <p>{selectedEvent.extendedProps.keperluan}</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Status</label>
                                <div className="mt-1">
                                    <Badge variant={selectedEvent.extendedProps.status === 'on_progress' ? 'default' : 'secondary'}>
                                        {selectedEvent.extendedProps.status === 'on_progress' ? 'Sedang Berlangsung' : 'Disetujui'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </BorrowerLayout>
    );
}
