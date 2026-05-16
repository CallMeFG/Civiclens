<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * API untuk Register Pengguna Baru
     */
    public function register(Request $request)
    {
        // 1. Laravel memvalidasi datangnya 'nama_lengkap' dari React
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // 2. Laravel memasukkan isi 'nama_lengkap' ke dalam kolom 'name' di database
        $user = User::create([
            'name' => $request->nama_lengkap, // <--- PASTIKAN BARIS INI BENAR
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 3. Terbitkan Token Sanctum
        $token = $user->createToken('api-token')->plainTextToken;

        // 4. Kembalikan Respons JSON Sukses
        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil!',
            'data' => $user,
            'token' => $token,
        ], 201);
    }
    /**
     * API untuk Login Pengguna
     */
    public function login(Request $request)
    {
        // 1. Validasi Inputan
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // 2. Cek ketersediaan user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // 3. Cek apakah user tidak ditemukan atau password salah
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password yang Anda masukkan salah.',
            ], 401); // 401 adalah status 'Unauthorized'
        }

        // 4. Jika cocok, terbitkan Token Sanctum baru
        $token = $user->createToken('api-token')->plainTextToken;

        // 5. Kembalikan respons JSON sukses
        return response()->json([
            'success' => true,
            'message' => 'Login berhasil!',
            'data' => $user,
            'token' => $token,
        ], 200);
    }
 public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'nomor_telepon' => 'nullable|string|max:20',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|string',
            'lokasi' => 'nullable|string',
        ]);

        // Update data ke database
        $user->update([
            'name' => $request->name,
            'nomor_telepon' => $request->nomor_telepon,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'lokasi' => $request->lokasi,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui!',
            'data' => $user
        ]);
    }
    /**
     * API untuk Logout Pengguna
     */
    public function logout(Request $request)
    {
        // Menghapus (mencabut) token yang sedang digunakan untuk request ini
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil!',
        ], 200);
    }
}
