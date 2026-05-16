<?php

use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Models\Category;

// 1. Rute Autentikasi Publik (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ---> PINDAHKAN RUTE CATEGORIES KE SINI (Area Publik) <---
Route::get('/categories', function () {
    return response()->json([
        'success' => true,
        'data' => Category::all()
    ]);
});

// 2. Rute yang Dilindungi (WAJIB melampirkan Token)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Illuminate\Http\Request $request) {
        return $request->user();
    });

    Route::post('/user/update', [AuthController::class, 'updateProfile']);

    // Rute Logout & Reports
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('reports', ReportController::class);
    Route::post('/reports/{id}/vote', [\App\Http\Controllers\Api\ReportController::class, 'toggleVote']);
Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::post('/notifications/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);

});
Route::get('/insights', [\App\Http\Controllers\Api\ReportController::class, 'insights']);
