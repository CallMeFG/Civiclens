<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Mengizinkan kolom-kolom ini diisi secara massal
    protected $fillable = [
        'user_id',
        'category_id',
        'judul',
        'deskripsi',
        'alamat',
        'foto',
        'latitude',
        'longitude',
        'status',
    ];

    // Relasi: Sebuah laporan dimiliki oleh satu User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
