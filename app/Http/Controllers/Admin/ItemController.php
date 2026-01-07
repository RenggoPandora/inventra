<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Items/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Items/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kategori' => 'required|string|max:255',
            'jumlah_total' => 'required|integer|min:1',
            'status' => 'required|in:available,unavailable',
        ], [
            'nama_barang.required' => 'Nama barang harus diisi.',
            'deskripsi.required' => 'Deskripsi harus diisi.',
            'kategori.required' => 'Kategori harus dipilih.',
            'jumlah_total.required' => 'Jumlah total harus diisi.',
            'jumlah_total.min' => 'Jumlah total minimal 1.',
            'status.required' => 'Status harus dipilih.',
            'status.in' => 'Status yang dipilih tidak valid. Pilih "Tersedia" atau "Tidak Tersedia".',
        ]);

        $validated['jumlah_tersedia'] = $validated['jumlah_total'];

        Item::create($validated);

        return redirect()->route('admin.items.index')
            ->with('success', 'Barang berhasil ditambahkan!');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Admin/Items/Edit', [
            'item' => $item
        ]);
    }

    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kategori' => 'required|string|max:255',
            'jumlah_total' => 'required|integer|min:1',
            'status' => 'required|in:available,unavailable',
        ], [
            'nama_barang.required' => 'Nama barang harus diisi.',
            'deskripsi.required' => 'Deskripsi harus diisi.',
            'kategori.required' => 'Kategori harus dipilih.',
            'jumlah_total.required' => 'Jumlah total harus diisi.',
            'jumlah_total.min' => 'Jumlah total minimal 1.',
            'status.required' => 'Status harus dipilih.',
            'status.in' => 'Status yang dipilih tidak valid. Pilih "Tersedia" atau "Tidak Tersedia".',
        ]);

        // Adjust jumlah_tersedia based on the difference in jumlah_total
        $difference = $validated['jumlah_total'] - $item->jumlah_total;
        $validated['jumlah_tersedia'] = max(0, $item->jumlah_tersedia + $difference);

        // Ensure jumlah_tersedia doesn't exceed jumlah_total
        if ($validated['jumlah_tersedia'] > $validated['jumlah_total']) {
            $validated['jumlah_tersedia'] = $validated['jumlah_total'];
        }

        $item->update($validated);

        return redirect()->route('admin.items.index')
            ->with('success', 'Barang berhasil diupdate!');
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('admin.items.index')
            ->with('success', 'Item berhasil dihapus!');
    }
}
