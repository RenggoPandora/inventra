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
            ->whereIn('status', ['approved', 'on_progress'])
            ->get()
            ->map(function ($request) {
                return [
                    'id' => (string) $request->id,
                    'title' => $request->item->nama_barang . ' - ' . $request->nama_peminjam,
                    'start' => $request->tanggal_mulai->format('Y-m-d'),
                    'end' => $request->tanggal_selesai->addDay()->format('Y-m-d'),
                    'backgroundColor' => $request->status === 'on_progress' ? '#3b82f6' : '#10b981',
                    'extendedProps' => [
                        'nama_peminjam' => $request->nama_peminjam,
                        'instansi' => $request->instansi,
                        'email' => $request->email,
                        'no_hp' => $request->no_hp,
                        'item_name' => $request->item->nama_barang,
                        'jumlah' => $request->jumlah,
                        'keperluan' => $request->keperluan,
                        'status' => $request->status,
                    ]
                ];
            });

        return Inertia::render('Admin/Calendar', [
            'events' => $borrowRequests
        ]);
    }
}
