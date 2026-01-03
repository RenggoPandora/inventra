<?php

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\BorrowRequestController;
use App\Http\Controllers\Admin\CalendarController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Welcome Page
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Borrower Routes (No Authentication Required)
Route::prefix('borrower')->name('borrower.')->group(function () {
    Route::get('/catalog', [BorrowerController::class, 'catalog'])->name('catalog');
    Route::get('/calendar', [BorrowerController::class, 'calendar'])->name('calendar');
    Route::get('/borrow-list', [BorrowerController::class, 'borrowList'])->name('borrow-list');
    Route::get('/request-form', [BorrowerController::class, 'requestForm'])->name('request-form');
    Route::post('/submit-request', [BorrowerController::class, 'submitRequest'])->name('submit-request');
});

// Admin Routes (Authentication Required)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Calendar
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    
    // Borrow Requests
    Route::prefix('requests')->name('requests.')->group(function () {
        Route::get('/', [BorrowRequestController::class, 'index'])->name('index');
        Route::get('/history', [BorrowRequestController::class, 'history'])->name('history');
        Route::get('/{request}', [BorrowRequestController::class, 'show'])->name('show');
        Route::post('/{request}/approve', [BorrowRequestController::class, 'approve'])->name('approve');
        Route::post('/{request}/reject', [BorrowRequestController::class, 'reject'])->name('reject');
        Route::post('/{request}/update-status', [BorrowRequestController::class, 'updateStatus'])->name('update-status');
    });
    
    // Items Management
    Route::resource('items', ItemController::class);
    
    // User Management
    Route::resource('users', UserManagementController::class);
});

require __DIR__.'/settings.php';

