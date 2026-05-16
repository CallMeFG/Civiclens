<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Category::create([
            'nama_kategori' => 'Infrastruktur (Jalan Rusak, dsb)', 
            'slug' => 'infrastruktur' //
        ]);
        
        Category::create([
            'nama_kategori' => 'Kebersihan (Tumpukan Sampah, dsb)', 
            'slug' => 'kebersihan' //
        ]);
        
        Category::create([
            'nama_kategori' => 'Fasilitas Publik Lainnya', 
            'slug' => 'fasilitas-publik-lainnya' //
        ]);
    }
}
