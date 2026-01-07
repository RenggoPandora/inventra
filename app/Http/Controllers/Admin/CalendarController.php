<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BorrowRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $borrowRequests = BorrowRequest::with('item')
            ->whereIn('status', ['approved', 'on_progress', 'returned'])
            ->get()
            ->map(function ($request) {
                return [
                    'id' => (string) $request->id,
                    'title' => $request->item->nama_barang . ' - ' . $request->nama_peminjam,
                    'start' => $request->tanggal_mulai->format('Y-m-d\TH:i:s'),
                    'end' => $request->tanggal_selesai->format('Y-m-d\TH:i:s'),
                    'backgroundColor' => $request->status === 'on_progress' ? '#3b82f6' : ($request->status === 'returned' ? '#6b7280' : '#10b981'),
                    'borderColor' => $request->status === 'on_progress' ? '#2563eb' : ($request->status === 'returned' ? '#4b5563' : '#059669'),
                    'extendedProps' => [
                        'nama_peminjam' => $request->nama_peminjam,
                        'instansi' => $request->instansi,
                        'email' => $request->email,
                        'no_hp' => $request->no_hp,
                        'item_name' => $request->item->nama_barang,
                        'jumlah' => $request->jumlah,
                        'keperluan' => $request->keperluan,
                        'status' => $request->status,
                        'tanggal_mulai' => $request->tanggal_mulai->format('Y-m-d H:i'),
                        'tanggal_selesai' => $request->tanggal_selesai->format('Y-m-d H:i'),
                    ]
                ];
            });

        return Inertia::render('Admin/Calendar', [
            'events' => $borrowRequests
        ]);
    }
}
