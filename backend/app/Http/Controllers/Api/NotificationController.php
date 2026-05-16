<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Mengambil notifikasi milik user yang sedang login + notifikasi Sistem
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $notifications = Notification::where('user_id', $userId)
            ->orWhereNull('user_id') // Mengambil notif Sistem (global)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    // Menandai semua notifikasi milik user menjadi "Sudah Dibaca"
    public function markAsRead(Request $request)
    {
        $userId = $request->user()->id;

        Notification::where('user_id', $userId)->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Semua notifikasi telah ditandai dibaca.'
        ]);
    }
}
