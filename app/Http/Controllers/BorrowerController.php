<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\BorrowRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowerController extends Controller
{
    public function catalog()
    {
        $items = Item::where('status', 'aktif')
            ->where('jumlah_tersedia', '>', 0)
            ->get();

        return Inertia::render('Borrower/Catalog', [
            'items' => $items
        ]);
    }

    public function calendar()
    {
        $borrowRequests = BorrowRequest::with('item')
            ->where('status', 'approved')
            ->orWhere('status', 'on_progress')
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
                        'item_name' => $request->item->nama_barang,
                        'jumlah' => $request->jumlah,
                        'keperluan' => $request->keperluan,
                        'status' => $request->status,
                    ]
                ];
            });

        return Inertia::render('Borrower/Calendar', [
            'events' => $borrowRequests
        ]);
    }

    public function borrowList()
    {
        $borrowRequests = BorrowRequest::with('item')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Borrower/BorrowList', [
            'borrowRequests' => $borrowRequests
        ]);
    }

    public function requestForm()
    {
        $items = Item::where('status', 'aktif')
            ->where('jumlah_tersedia', '>', 0)
            ->get();

        return Inertia::render('Borrower/RequestForm', [
            'items' => $items
        ]);
    }

    public function submitRequest(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'nama_peminjam' => 'required|string|max:255',
            'instansi' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'no_hp' => 'required|string|max:20',
            'tanggal_mulai' => 'required|date|after_or_equal:today',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'jumlah' => 'required|integer|min:1',
            'keperluan' => 'required|string',
        ]);

        // Check if item has enough availability
        $item = Item::find($validated['item_id']);
        if ($item->jumlah_tersedia < $validated['jumlah']) {
            return back()->withErrors(['jumlah' => 'Jumlah yang diminta melebihi jumlah tersedia.']);
        }

        BorrowRequest::create($validated);

        return redirect()->route('borrower.borrow-list')
            ->with('success', 'Pengajuan peminjaman berhasil disubmit!');
    }
}
