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
        $items = Item::where('status', 'available')
            ->where('jumlah_tersedia', '>', 0)
            ->get();

        return Inertia::render('Borrower/Catalog', [
            'items' => $items
        ]);
    }

    public function calendar()
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
                        'item_name' => $request->item->nama_barang,
                        'jumlah' => $request->jumlah,
                        'keperluan' => $request->keperluan,
                        'status' => $request->status,
                        'tanggal_mulai' => $request->tanggal_mulai->format('Y-m-d H:i'),
                        'tanggal_selesai' => $request->tanggal_selesai->format('Y-m-d H:i'),
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

    public function requestForm(Request $request)
    {
        $items = Item::where('status', 'available')
            ->where('jumlah_tersedia', '>', 0)
            ->get();

        return Inertia::render('Borrower/RequestForm', [
            'items' => $items,
            'selectedItemId' => $request->query('item_id'),
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
            'tanggal_mulai' => 'required|date|after_or_equal:now',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'jumlah' => 'required|integer|min:1',
            'keperluan' => 'required|string',
        ], [
            'tanggal_mulai.after_or_equal' => 'Tanggal & waktu mulai harus dari sekarang atau setelahnya.',
            'tanggal_selesai.after' => 'Tanggal & waktu selesai harus setelah tanggal mulai.',
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
