<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Izinkan kolom-kolom ini untuk diisi data dari Frontend
    protected $fillable = [
        'user_id',
        'category_id',
        'judul',
        'deskripsi',
        'alamat',
        'latitude',
        'longitude',
        'status',
        'foto'
    ];
}
