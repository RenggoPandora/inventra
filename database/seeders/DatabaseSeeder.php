<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Item;
use App\Models\BorrowRequest;
use App\Models\ApprovalHistory;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin Users - Perangkat Desa
        $admin1 = User::firstOrCreate(
            ['email' => 'kepaladesa@balaidesa.id'],
            [
                'name' => 'Budi Santoso',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $admin2 = User::firstOrCreate(
            ['email' => 'sekretaris@balaidesa.id'],
            [
                'name' => 'Siti Rahma',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $admin3 = User::firstOrCreate(
            ['email' => 'kaur.umum@balaidesa.id'],
            [
                'name' => 'Ahmad Yusuf',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Create Items - Barang Inventaris Balai Desa
        $items = [
            [
                'nama_barang' => 'Sound System Portable',
                'deskripsi' => 'Sound system lengkap dengan speaker, mixer, dan 4 microphone wireless. Cocok untuk acara outdoor hingga 500 orang.',
                'kategori' => 'Elektronik',
                'jumlah_total' => 2,
                'jumlah_tersedia' => 2,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Tenda Pesta 5x5 meter',
                'deskripsi' => 'Tenda pesta warna putih ukuran 5x5 meter, kapasitas 30-40 orang. Kondisi baik dengan dinding samping.',
                'kategori' => 'Perlengkapan Acara',
                'jumlah_total' => 10,
                'jumlah_tersedia' => 8,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Kursi Lipat Plastik',
                'deskripsi' => 'Kursi lipat plastik warna putih, kuat dan nyaman untuk berbagai acara.',
                'kategori' => 'Furniture',
                'jumlah_total' => 200,
                'jumlah_tersedia' => 150,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Meja Panjang Lipat',
                'deskripsi' => 'Meja panjang lipat ukuran 180x60 cm, cocok untuk acara makan bersama atau rapat.',
                'kategori' => 'Furniture',
                'jumlah_total' => 30,
                'jumlah_tersedia' => 25,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Proyektor + Layar',
                'deskripsi' => 'Proyektor LCD 3000 lumens dengan layar tripod 100 inch. Cocok untuk presentasi dan pemutaran video.',
                'kategori' => 'Elektronik',
                'jumlah_total' => 1,
                'jumlah_tersedia' => 1,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Panggung Portable',
                'deskripsi' => 'Panggung portable modular ukuran 4x6 meter dengan tinggi 80cm. Include tangga dan railing pengaman.',
                'kategori' => 'Perlengkapan Acara',
                'jumlah_total' => 1,
                'jumlah_tersedia' => 1,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Generator Listrik 5000 Watt',
                'deskripsi' => 'Generator listrik portable 5000 watt untuk backup power acara outdoor.',
                'kategori' => 'Elektronik',
                'jumlah_total' => 2,
                'jumlah_tersedia' => 2,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Karpet Merah',
                'deskripsi' => 'Karpet merah untuk acara formal, panjang 10 meter lebar 1.5 meter.',
                'kategori' => 'Dekorasi',
                'jumlah_total' => 2,
                'jumlah_tersedia' => 2,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Peralatan Masak Kenduri',
                'deskripsi' => 'Set lengkap peralatan masak untuk kenduri: wajan besar, panci kukus, kompor gas portable, tabung gas.',
                'kategori' => 'Perlengkapan Acara',
                'jumlah_total' => 3,
                'jumlah_tersedia' => 3,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Standing Banner',
                'deskripsi' => 'Standing banner ukuran 60x160 cm untuk informasi acara atau penyuluhan.',
                'kategori' => 'Dekorasi',
                'jumlah_total' => 5,
                'jumlah_tersedia' => 5,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Tenda Posko Kesehatan',
                'deskripsi' => 'Tenda khusus untuk posko kesehatan atau pelayanan publik ukuran 3x3 meter dengan meja dan kursi.',
                'kategori' => 'Perlengkapan Acara',
                'jumlah_total' => 2,
                'jumlah_tersedia' => 2,
                'status' => 'available',
            ],
            [
                'nama_barang' => 'Lampu Sorot LED',
                'deskripsi' => 'Lampu sorot LED 100 watt untuk penerangan outdoor, tahan air.',
                'kategori' => 'Elektronik',
                'jumlah_total' => 10,
                'jumlah_tersedia' => 10,
                'status' => 'available',
            ],
        ];

        foreach ($items as $item) {
            Item::firstOrCreate(
                ['nama_barang' => $item['nama_barang']],
                $item
            );
        }

        // Get created items for borrow requests
        $soundSystem = Item::where('nama_barang', 'Sound System Portable')->first();
        $tenda = Item::where('nama_barang', 'Tenda Pesta 5x5 meter')->first();
        $kursi = Item::where('nama_barang', 'Kursi Lipat Plastik')->first();
        $meja = Item::where('nama_barang', 'Meja Panjang Lipat')->first();
        $proyektor = Item::where('nama_barang', 'Proyektor + Layar')->first();
        $generator = Item::where('nama_barang', 'Generator Listrik 5000 Watt')->first();

        // Create Borrow Requests - Berbagai Skenario Peminjaman Warga
        
        // 1. Request Approved & On Progress - Acara 17 Agustus RT 01
        $request1 = BorrowRequest::create([
            'item_id' => $soundSystem->id,
            'nama_peminjam' => 'Ketua RT 01 - Pak Hendra',
            'instansi' => 'RT 01 Desa Sukamaju',
            'email' => 'rt01.sukamaju@gmail.com',
            'no_hp' => '081234567890',
            'tanggal_mulai' => Carbon::now()->addDays(5)->setTime(7, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(5)->setTime(16, 0, 0),
            'jumlah' => 1,
            'keperluan' => 'Acara peringatan HUT RI ke-79 tingkat RT. Digunakan untuk upacara bendera pagi dan hiburan sore hari.',
            'status' => 'approved',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request1->id,
            'user_id' => $admin1->id,
            'action' => 'approved',
            'catatan' => 'Disetujui untuk keperluan acara kemerdekaan. Mohon dijaga dengan baik.',
        ]);

        // 2. Request Approved - Pernikahan Warga
        $request2 = BorrowRequest::create([
            'item_id' => $tenda->id,
            'nama_peminjam' => 'Bapak Sutrisno',
            'instansi' => 'Warga Desa Sukamaju',
            'email' => 'sutrisno.family@gmail.com',
            'no_hp' => '082345678901',
            'tanggal_mulai' => Carbon::now()->addDays(10)->setTime(6, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(11)->setTime(18, 0, 0),
            'jumlah' => 5,
            'keperluan' => 'Acara pernikahan anak. Untuk resepsi di rumah, dibutuhkan 5 tenda untuk tamu undangan.',
            'status' => 'approved',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request2->id,
            'user_id' => $admin2->id,
            'action' => 'approved',
            'catatan' => 'Disetujui. Selamat atas pernikahan putranya. Tenda mohon dikembalikan dalam kondisi bersih.',
        ]);

        // 3. Request On Progress - Sedang Dipinjam - Pengajian Rutin
        $request3 = BorrowRequest::create([
            'item_id' => $kursi->id,
            'nama_peminjam' => 'Ibu Majelis Taklim Al-Ikhlas',
            'instansi' => 'Majelis Taklim Al-Ikhlas',
            'email' => 'alikhlas.taklim@gmail.com',
            'no_hp' => '083456789012',
            'tanggal_mulai' => Carbon::now()->setTime(13, 0, 0),
            'tanggal_selesai' => Carbon::now()->setTime(16, 30, 0),
            'jumlah' => 50,
            'keperluan' => 'Pengajian rutin bulanan ibu-ibu dengan narasumber dari luar daerah.',
            'status' => 'on_progress',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request3->id,
            'user_id' => $admin3->id,
            'action' => 'approved',
            'catatan' => 'Disetujui. Kursi sudah diambil pagi tadi.',
        ]);

        // 4. Request Pending - Rapat Karang Taruna
        $request4 = BorrowRequest::create([
            'item_id' => $proyektor->id,
            'nama_peminjam' => 'Ketua Karang Taruna',
            'instansi' => 'Karang Taruna Desa Sukamaju',
            'email' => 'karangtaruna.sukamaju@gmail.com',
            'no_hp' => '084567890123',
            'tanggal_mulai' => Carbon::now()->addDays(7)->setTime(19, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(7)->setTime(22, 0, 0),
            'jumlah' => 1,
            'keperluan' => 'Rapat kerja dan presentasi program kerja Karang Taruna tahun ini. Perlu proyektor untuk presentasi.',
            'status' => 'pending',
        ]);

        // 5. Request Pending - Senam Sehat Lansia
        $request5 = BorrowRequest::create([
            'item_id' => $soundSystem->id,
            'nama_peminjam' => 'Koordinator Posyandu Lansia',
            'instansi' => 'Posyandu Lansia Desa Sukamaju',
            'email' => 'posyandu.lansia@gmail.com',
            'no_hp' => '085678901234',
            'tanggal_mulai' => Carbon::now()->addDays(3)->setTime(6, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(3)->setTime(10, 0, 0),
            'jumlah' => 1,
            'keperluan' => 'Senam sehat lansia rutin minggu pagi di lapangan desa. Butuh sound system untuk musik senam.',
            'status' => 'pending',
        ]);

        // 6. Request Rejected - Bentrok Jadwal
        $request6 = BorrowRequest::create([
            'item_id' => $soundSystem->id,
            'nama_peminjam' => 'Panitia Lomba Desa',
            'instansi' => 'RT 03 Desa Sukamaju',
            'email' => 'rt03.lomba@gmail.com',
            'no_hp' => '086789012345',
            'tanggal_mulai' => Carbon::now()->addDays(5)->setTime(8, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(5)->setTime(17, 0, 0),
            'jumlah' => 1,
            'keperluan' => 'Lomba 17 Agustus tingkat RT 03.',
            'status' => 'rejected',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request6->id,
            'user_id' => $admin1->id,
            'action' => 'rejected',
            'catatan' => 'Mohon maaf, sound system sudah dipinjam RT 01 untuk tanggal yang sama. Silakan ajukan peminjaman dengan tanggal berbeda atau koordinasi dengan RT 01.',
        ]);

        // 7. Request Completed - Penyuluhan Kesehatan Minggu Lalu
        $request7 = BorrowRequest::create([
            'item_id' => $meja->id,
            'nama_peminjam' => 'Puskesmas Sukamaju',
            'instansi' => 'Puskesmas Kecamatan',
            'email' => 'puskesmas.sukamaju@kemkes.go.id',
            'no_hp' => '087890123456',
            'tanggal_mulai' => Carbon::now()->subDays(7)->setTime(8, 0, 0),
            'tanggal_selesai' => Carbon::now()->subDays(7)->setTime(14, 0, 0),
            'jumlah' => 5,
            'keperluan' => 'Penyuluhan kesehatan dan pemeriksaan gratis untuk warga desa.',
            'status' => 'returned',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request7->id,
            'user_id' => $admin2->id,
            'action' => 'approved',
            'catatan' => 'Disetujui untuk program kesehatan warga.',
        ]);

        // 8. Request Completed - Gotong Royong Bersih Desa
        $request8 = BorrowRequest::create([
            'item_id' => $generator->id,
            'nama_peminjam' => 'Ketua RW 02',
            'instansi' => 'RW 02 Desa Sukamaju',
            'email' => 'rw02.sukamaju@gmail.com',
            'no_hp' => '088901234567',
            'tanggal_mulai' => Carbon::now()->subDays(14)->setTime(6, 0, 0),
            'tanggal_selesai' => Carbon::now()->subDays(14)->setTime(12, 0, 0),
            'jumlah' => 1,
            'keperluan' => 'Gotong royong bersih-bersih selokan dan jalan desa. Butuh genset untuk pompa air.',
            'status' => 'returned',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request8->id,
            'user_id' => $admin3->id,
            'action' => 'approved',
            'catatan' => 'Disetujui. Terima kasih atas partisipasi gotong royong.',
        ]);

        // 9. Request Pending - PKK Desa
        $request9 = BorrowRequest::create([
            'item_id' => $kursi->id,
            'nama_peminjam' => 'Ketua PKK Desa',
            'instansi' => 'PKK Desa Sukamaju',
            'email' => 'pkk.sukamaju@gmail.com',
            'no_hp' => '089012345678',
            'tanggal_mulai' => Carbon::now()->addDays(15)->setTime(13, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(15)->setTime(16, 0, 0),
            'jumlah' => 30,
            'keperluan' => 'Pelatihan membuat kerajinan tangan untuk ibu-ibu PKK. Pelatihan dari Dinas Perindag.',
            'status' => 'pending',
        ]);

        // 10. Request Approved - Buka Puasa Bersama (future)
        $request10 = BorrowRequest::create([
            'item_id' => $tenda->id,
            'nama_peminjam' => 'Takmir Masjid Al-Falah',
            'instansi' => 'Masjid Al-Falah Desa Sukamaju',
            'email' => 'masjid.alfalah@gmail.com',
            'no_hp' => '081122334455',
            'tanggal_mulai' => Carbon::now()->addDays(20)->setTime(16, 0, 0),
            'tanggal_selesai' => Carbon::now()->addDays(20)->setTime(20, 0, 0),
            'jumlah' => 3,
            'keperluan' => 'Buka puasa bersama jamaah dan anak yatim di halaman masjid.',
            'status' => 'approved',
        ]);
        ApprovalHistory::create([
            'borrow_request_id' => $request10->id,
            'user_id' => $admin1->id,
            'action' => 'approved',
            'catatan' => 'Disetujui. Semoga acara buka puasa bersama lancar dan berkah.',
        ]);

        echo "✓ Database seeded successfully!\n";
        echo "  - 3 Admin users (Perangkat Desa)\n";
        echo "  - 12 Items (Inventaris Balai Desa)\n";
        echo "  - 10 Borrow Requests (berbagai status)\n";
        echo "\nAdmin Login:\n";
        echo "  Email: kepaladesa@balaidesa.id | Password: password\n";
        echo "  Email: sekretaris@balaidesa.id | Password: password\n";
        echo "  Email: kaur.umum@balaidesa.id | Password: password\n";
    }
}
