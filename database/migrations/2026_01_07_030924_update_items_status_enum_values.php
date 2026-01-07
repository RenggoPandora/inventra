<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update existing data first
        DB::statement("UPDATE items SET status = 'available' WHERE status = 'aktif'");
        DB::statement("UPDATE items SET status = 'unavailable' WHERE status = 'nonaktif'");
        
        // Modify the enum column
        DB::statement("ALTER TABLE items MODIFY COLUMN status ENUM('available', 'unavailable') NOT NULL DEFAULT 'available'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert data back
        DB::statement("UPDATE items SET status = 'aktif' WHERE status = 'available'");
        DB::statement("UPDATE items SET status = 'nonaktif' WHERE status = 'unavailable'");
        
        // Revert the enum column
        DB::statement("ALTER TABLE items MODIFY COLUMN status ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif'");
    }
};
