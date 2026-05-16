<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth('sanctum')->id();

        $reports = \App\Models\Report::withCount('votes')
            ->with('votes')
            ->latest()
            ->get();

        $reports->map(function ($report) use ($userId) {
            $report->is_voted = $userId ? $report->votes->contains('user_id', $userId) : false;

            unset($report->votes);
            return $report;
        });

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    public function myReports(Request $request)
    {
        $reports = Report::where('user_id', $request->user()->id)
            ->withCount('votes')
            ->latest()
            ->get();

        return response()->json(['success' => true, 'data' => $reports]);
    }

    public function store(Request $request)
    {
        // 1. Validasi data yang masuk
        $request->validate([
            'category_id' => 'required|integer',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // 2. Proses upload foto (Jika ada)
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('reports', 'public');
        }

        // 3. Simpan ke Database
        $report = \App\Models\Report::create([
            'user_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'foto' => $fotoPath,
            'status' => 'Pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dikirim!',
            'data' => $report
        ], 201);
    }
    public function insights()
    {
        // 1. Pie Chart: Menghitung jumlah laporan berdasarkan status
        $pieData = [
            ['name' => 'Diproses', 'value' => \App\Models\Report::where('status', 'diproses')->count(), 'color' => '#2563EB'],
            ['name' => 'Selesai', 'value' => \App\Models\Report::where('status', 'selesai')->count(), 'color' => '#10B981'],
            ['name' => 'Pending', 'value' => \App\Models\Report::where('status', 'pending')->count(), 'color' => '#F59E0B'],
            ['name' => 'Ditolak', 'value' => \App\Models\Report::where('status', 'ditolak')->count(), 'color' => '#EF4444'],
        ];

        // 2. Top Locations: Mengelompokkan alamat yang paling sering dilaporkan
        $topLocations = \App\Models\Report::select('alamat as name', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->whereNotNull('alamat')
            ->where('alamat', '!=', '')
            ->groupBy('alamat')
            ->orderByDesc('total')
            ->limit(3)
            ->get();

        // 3. Line Chart: Laporan per bulan
        $months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
        $lineData = [];
        foreach ($months as $index => $month) {
            $lineData[] = [
                'name' => $month,
                'value' => \App\Models\Report::whereMonth('created_at', $index + 1)->count()
            ];
        }

        // 4. Bar Chart: Laporan per Hari dalam Seminggu
        $days = ['Mon' => 0, 'Tue' => 0, 'Wed' => 0, 'Thu' => 0, 'Fri' => 0, 'Sat' => 0, 'Sun' => 0];
        $allReports = \App\Models\Report::select('created_at')->get();
        foreach ($allReports as $report) {
            $dayName = $report->created_at->format('D');
            if (isset($days[$dayName])) {
                $days[$dayName]++;
            }
        }

        $barData = [];
        foreach ($days as $name => $total) {
            $barData[] = ['name' => $name, 'total' => $total];
        }

        // 5. Kembalikan Response JSON yang rapi
        return response()->json([
            'success' => true,
            'data' => [
                'pieData' => $pieData,
                'topLocations' => $topLocations,
                'lineData' => $lineData,
                'barData' => $barData,
                'totalVote' => \App\Models\Vote::count()
            ]
        ]);
    }
    public function vote(Request $request, $id)
    {
        $userId = $request->user()->id;
        $existingVote = \App\Models\Vote::where('user_id', $userId)
            ->where('report_id', $id)
            ->first();

        if ($existingVote) {
            $existingVote->delete();
            return response()->json(['success' => true, 'message' => 'Vote dihapus']);
        } else {
            \App\Models\Vote::create([
                'user_id' => $userId,
                'report_id' => $id
            ]);
            return response()->json(['success' => true, 'message' => 'Berhasil memberikan vote']);
        }
    }
}
