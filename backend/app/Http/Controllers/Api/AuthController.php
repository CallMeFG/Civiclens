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
        // 1. Validasi Inputan (Sesuai dengan form React JS)
        $validated = $request->validate([
            'namaLengkap' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // 2. Simpan Data User ke Database
        $user = User::create([
            'name' => $validated['namaLengkap'], // Di database kolomnya bernama 'name'
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']), // Password wajib di-hash (enkripsi)
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
