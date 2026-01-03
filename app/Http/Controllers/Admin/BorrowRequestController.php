<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BorrowRequest;
use App\Models\ApprovalHistory;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BorrowRequestController extends Controller
{
    public function index()
    {
        $requests = BorrowRequest::with('item')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Requests/Index', [
            'requests' => $requests
        ]);
    }

    public function show(BorrowRequest $request)
    {
        $request->load('item');

        return Inertia::render('Admin/Requests/Show', [
            'request' => $request
        ]);
    }

    public function approve(Request $req, BorrowRequest $request)
    {
        $validated = $req->validate([
            'catatan' => 'nullable|string',
        ]);

        // Check if item has enough availability
        $item = $request->item;
        if ($item->jumlah_tersedia < $request->jumlah) {
            return back()->withErrors(['error' => 'Jumlah barang tidak mencukupi.']);
        }

        // Update item availability
        $item->jumlah_tersedia -= $request->jumlah;
        $item->save();

        // Update request status
        $request->update(['status' => 'approved']);

        // Create approval history
        ApprovalHistory::create([
            'borrow_request_id' => $request->id,
            'user_id' => Auth::id(),
            'action' => 'approved',
            'catatan' => $validated['catatan'] ?? null,
        ]);

        return redirect()->route('admin.requests.index')
            ->with('success', 'Pengajuan berhasil disetujui!');
    }

    public function reject(Request $req, BorrowRequest $request)
    {
        $validated = $req->validate([
            'catatan' => 'required|string',
        ]);

        // Update request status
        $request->update(['status' => 'rejected']);

        // Create approval history
        ApprovalHistory::create([
            'borrow_request_id' => $request->id,
            'user_id' => Auth::id(),
            'action' => 'rejected',
            'catatan' => $validated['catatan'],
        ]);

        return redirect()->route('admin.requests.index')
            ->with('success', 'Pengajuan berhasil ditolak!');
    }

    public function updateStatus(Request $req, BorrowRequest $request)
    {
        $validated = $req->validate([
            'status' => 'required|in:on_progress,returned',
        ]);

        $oldStatus = $request->status;
        $request->update(['status' => $validated['status']]);

        // If returning, add back to item availability
        if ($validated['status'] === 'returned' && $oldStatus !== 'returned') {
            $item = $request->item;
            $item->jumlah_tersedia += $request->jumlah;
            $item->save();
        }

        return back()->with('success', 'Status berhasil diupdate!');
    }

    public function history()
    {
        $requests = BorrowRequest::with(['item', 'approvalHistories.user'])
            ->whereIn('status', ['approved', 'rejected', 'on_progress', 'returned'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Admin/Requests/History', [
            'requests' => $requests
        ]);
    }
}
