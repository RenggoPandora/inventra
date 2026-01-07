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
        Schema::table('borrow_requests', function (Blueprint $table) {
            // Change date columns to datetime
            $table->dateTime('tanggal_mulai')->change();
            $table->dateTime('tanggal_selesai')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('borrow_requests', function (Blueprint $table) {
            // Revert back to date
            $table->date('tanggal_mulai')->change();
            $table->date('tanggal_selesai')->change();
        });
    }
};
