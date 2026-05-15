// import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Clock, CheckCircle, Heart } from 'lucide-react';

// --- DATA DUMMY (Sesuai Desain Figma) ---
const barData = [
  { name: 'Mon', total: 40 }, { name: 'Tue', total: 60 },
  { name: 'Wed', total: 47 }, { name: 'Thu', total: 50 },
  { name: 'Fri', total: 27 }, { name: 'Sat', total: 37 },
  { name: 'Sun', total: 37 },
];

const pieData = [
  { name: 'Proses', value: 89, color: '#2563EB' },   // Biru
  { name: 'Selesai', value: 567, color: '#10B981' }, // Hijau
  { name: 'Pending', value: 120, color: '#F59E0B' }, // Oranye
];

const lineData = [
  { name: 'JAN', value: 20 }, { name: 'FEB', value: 15 },
  { name: 'MAR', value: 10 }, { name: 'APR', value: 25 },
  { name: 'MAY', value: 15 }, { name: 'JUN', value: 30 },
];

const topLocations = [
  { name: 'Kec. Tampan', total: 312 },
  { name: 'Kec. Jati Nungkur Baiyu', total: 225 },
  { name: 'Kec. Kotabaru Indah Suit', total: 115 },
];

export default function Insight() {
  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Insight & Analitik</h1>
        <p className="text-gray-500 mt-1">Lihat data dan analitik laporan masyarakat</p>
      </div>

      {/* 4 Kartu Statistik Atas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Laporan (Background Biru) */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">1.334</h3>
            <p className="text-white/80 text-sm">Total laporan</p>
          </div>
        </div>

        {/* Card 2: Sedang Diproses */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">89</h3>
            <p className="text-gray-500 text-sm">Sedang diproses</p>
          </div>
        </div>

        {/* Card 3: Selesai */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">567</h3>
            <p className="text-gray-500 text-sm">Selesai</p>
          </div>
        </div>

        {/* Card 4: Total Vote */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">4.450</h3>
            <p className="text-gray-500 text-sm">Total Vote</p>
          </div>
        </div>
      </div>

      {/* Area Grafik Baris Pertama (Bar Chart & Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart mengambil 2 kolom (Lebih Lebar) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Laporan Berdasarkan Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                {/* Warna ungu kebiruan mirip di desain */}
                <Bar dataKey="total" fill="#4F46E5" radius={[3]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart mengambil 1 kolom */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Status Laporan</h3>
          <div className="h-48 flex justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legenda Custom */}
          <div className="mt-4 flex flex-col gap-2 pl-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area Grafik Baris Kedua (Line Chart & Top Locations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Tren laporan (20 Hari Terakhir)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} dot={{r: 4, fill: '#4F46E5'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Lokasi terbanyak di laporkan</h3>
          <div className="space-y-4">
            {topLocations.map((loc, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-600 font-medium">{loc.name}</span>
                <span className="text-sm font-bold text-primary">{loc.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}