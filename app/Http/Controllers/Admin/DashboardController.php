<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\BorrowRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_items' => Item::count(),
            'active_items' => Item::where('status', 'aktif')->count(),
            'total_borrow_requests' => BorrowRequest::count(),
            'pending_requests' => BorrowRequest::where('status', 'pending')->count(),
            'approved_requests' => BorrowRequest::where('status', 'approved')->count(),
            'on_progress_requests' => BorrowRequest::where('status', 'on_progress')->count(),
            'returned_requests' => BorrowRequest::where('status', 'returned')->count(),
            'rejected_requests' => BorrowRequest::where('status', 'rejected')->count(),
        ];

        $recentRequests = BorrowRequest::with('item')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests
        ]);
    }
}
