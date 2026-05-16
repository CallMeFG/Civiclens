<?php

use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Models\Category;

// 1. Rute Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/categories', function () {
    return response()->json([
        'success' => true,
        'data' => Category::all()
    ]);
});

Route::get('/reports', [ReportController::class, 'index']);
Route::get('/insights', [ReportController::class, 'insights']);

// 2. Rute protected
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Illuminate\Http\Request $request) {
        return $request->user();
    });

    Route::get('/reports/me', [ReportController::class, 'myReports']);
    Route::post('/user/update', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::apiResource('reports', ReportController::class);
    
    Route::post('/reports/{id}/vote', [ReportController::class, 'vote']);
    
    Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::post('/notifications/mark-read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
});