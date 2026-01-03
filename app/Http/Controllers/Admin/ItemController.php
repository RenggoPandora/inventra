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
            'jumlah_total' => 'required|integer|min:0',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $validated['jumlah_tersedia'] = $validated['jumlah_total'];

        Item::create($validated);

        return redirect()->route('admin.items.index')
            ->with('success', 'Item berhasil ditambahkan!');
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
            'jumlah_total' => 'required|integer|min:0',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        // Adjust jumlah_tersedia based on the difference in jumlah_total
        $difference = $validated['jumlah_total'] - $item->jumlah_total;
        $validated['jumlah_tersedia'] = $item->jumlah_tersedia + $difference;

        $item->update($validated);

        return redirect()->route('admin.items.index')
            ->with('success', 'Item berhasil diupdate!');
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('admin.items.index')
            ->with('success', 'Item berhasil dihapus!');
    }
}
