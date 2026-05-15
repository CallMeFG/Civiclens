<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Laporan Masyarakat',
            'data' => $reports
        ], 200);
    }

    public function store(Request $request)
    {
        // 1. Validasi Inputan, termasuk foto (opsional, maks 5MB)
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // 2. Simpan Foto jika diunggah
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            // Gambar akan disimpan di folder storage/app/public/reports
            $fotoPath = $request->file('foto')->store('reports', 'public');
        }

        // 3. Simpan ke Database
        $report = Report::create([
            'user_id' => $request->user()->id,
            'category_id' => 1,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => 'Pending',
            'foto' => $fotoPath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dikirim!',
            'data' => $report
        ], 201);
    }
}
