<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            // user_id dibuat nullable (kosong) agar bisa mengirim notif 'Sistem' ke semua orang
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('type'); // Contoh: 'Laporan Saya' atau 'Sistem'
            $table->string('status'); // Contoh: 'ditolak', 'berhasil', 'diproses', 'info'
            $table->string('title');
            $table->text('desc');
            $table->boolean('is_read')->default(false); // Status dibaca/belum
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
