<?php

use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Rute Autentikasi Publik (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute yang Dilindungi (Harus melampirkan Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // PINDAHKAN RUTE REPORTS KE SINI
    Route::apiResource('reports', ReportController::class);
});
