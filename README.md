# INVENTRA - Inventory Management System

Inventra adalah aplikasi berbasis website untuk manajemen aset dan peminjaman barang yang dirancang untuk memudahkan organisasi dalam mengelola inventaris dan proses peminjaman peralatan.

## Tech Stack

- **Backend**: Laravel 12 dengan Inertia.js
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: MySQL
- **Calendar**: FullCalendar React

## Fitur Utama

### Untuk Admin
- Dashboard dengan statistik data
- CRUD management barang/item
- Approval/reject peminjaman
- View kalender peminjaman
- History approval
- Management user admin

### Untuk Borrower (Tanpa Login)
- Lihat katalog barang tersedia
- View kalender peminjaman yang sudah approve
- Lihat daftar peminjaman
- Form request peminjaman

## Setup Instructions

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & npm
- MySQL Database

### Installation

1. **Clone atau setup project**

2. **Install dependencies**
```bash
composer install
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure database** di `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventra
DB_USERNAME=root
DB_PASSWORD=your_password
```

5. **Create database**
```sql
CREATE DATABASE inventra;
```

6. **Run migrations dan seeder**
```bash
php artisan migrate:fresh --seed
```

7. **Build frontend assets**
```bash
npm run build
# atau untuk development
npm run dev
```

8. **Start server**
```bash
php artisan serve
```

## Default Admin Credentials

- **Email**: admin@inventra.com
- **Password**: password

⚠️ **IMPORTANT**: Ganti password default setelah login pertama kali!

## Database Structure

### 1. users
- id (PK)
- name
- email (unique)
- password
- role (enum: 'admin')
- created_at
- updated_at

### 2. items
- id (PK)
- nama_barang
- deskripsi
- kategori
- jumlah_total
- jumlah_tersedia
- status (enum: 'aktif', 'nonaktif')
- created_at
- updated_at

### 3. borrow_requests
- id (PK)
- item_id (FK → items)
- nama_peminjam
- instansi
- email
- no_hp
- tanggal_mulai
- tanggal_selesai
- jumlah
- keperluan
- status (enum: 'pending', 'approved', 'rejected', 'on_progress', 'returned')
- created_at
- updated_at

### 4. approval_histories
- id (PK)
- borrow_request_id (FK → borrow_requests)
- user_id (FK → users)
- action (enum: 'approved', 'rejected')
- catatan
- created_at

## User Flow

### Borrower Flow
1. Welcome Page
2. Katalog Barang
3. View Calendar
4. List Peminjaman
5. Form Request

### Admin Flow
1. Welcome Page
2. Login Page
3. Main Dashboard (Statistik)
4. View Calendar
5. Request Approval
6. History Approval
7. Product Management (CRUD)
8. Admin Management

## Routes

### Public Routes (Borrower)
- `/` - Welcome page
- `/borrower/catalog` - Katalog barang
- `/borrower/calendar` - Kalender peminjaman
- `/borrower/borrow-list` - Daftar peminjaman
- `/borrower/request-form` - Form pengajuan
- `/borrower/submit-request` - Submit peminjaman (POST)

### Admin Routes (Authenticated)
- `/admin/dashboard` - Dashboard
- `/admin/calendar` - Kalender peminjaman
- `/admin/requests` - Daftar request pending
- `/admin/requests/history` - History approval
- `/admin/requests/{id}` - Detail request
- `/admin/requests/{id}/approve` - Approve request (POST)
- `/admin/requests/{id}/reject` - Reject request (POST)
- `/admin/requests/{id}/update-status` - Update status (POST)
- `/admin/items` - Item management (CRUD)
- `/admin/users` - User management (CRUD)

## Development

### Run development server
```bash
# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite dev server
npm run dev
```

### Build for production
```bash
npm run build
php artisan optimize
```

## Additional Notes

- Borrower tidak perlu login untuk mengakses fitur peminjaman
- Hanya admin yang perlu login untuk mengelola sistem
- Sistem otomatis mengurangi `jumlah_tersedia` saat peminjaman di-approve
- Sistem otomatis menambah kembali `jumlah_tersedia` saat barang dikembalikan (status returned)
- Kalender menampilkan event dengan warna berbeda:
  - Hijau: Approved
  - Biru: On Progress

## License

This project is open-sourced software.
