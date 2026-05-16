import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Clock, CheckCircle, Heart, MapPin } from 'lucide-react';
import axiosInstance from '../api/axios';

export default function Insight() {
  const [data, setData] = useState({
    barData: [],
    pieData: [],
    lineData: [],
    topLocations: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // MENGAMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axiosInstance.get('/insights');
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data insight:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  // 💡 KALKULASI DINAMIS UNTUK 4 KARTU STATISTIK ATAS
  const totalLaporan = data.pieData.reduce((sum, item) => sum + item.value, 0);
  const sedangDiproses = data.pieData.find(item => item.name.toLowerCase() === 'diproses')?.value || 0;
  const selesai = data.pieData.find(item => item.name.toLowerCase() === 'selesai')?.value || 0;
  const totalVote = data.totalVote || 0;

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-10">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Insight & Analitik</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Lihat data dan analitik laporan masyarakat</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48 sm:h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm sm:text-base text-gray-500 font-medium">Memuat data analitik...</p>
        </div>
      ) : (
        <>
          {/* 4 KARTU STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-primary text-white rounded-2xl p-5 sm:p-6 shadow-md flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{totalLaporan}</h3>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">Total laporan</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{sedangDiproses}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Sedang diproses</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{selesai}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Selesai</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{totalVote}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Vote</p>
              </div>
            </div>
          </div>

          {/* AREA GRAFIK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            
            {/* BAR CHART */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Laporan Berdasarkan Kategori</h3>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.barData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                    <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="total" fill="#4F46E5" radius={[1]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Status Laporan</h3>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                      {data.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4">
                {data.pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{backgroundColor: item.color}}></span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LINE CHART */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Tren laporan (20 Hari Terakhir)</h3>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.lineData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                    <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{r: 3, fill: '#2563EB', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 5}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TOP LOCATIONS */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                Lokasi terbanyak di laporkan
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {data.topLocations.map((loc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm sm:text-base">
                        #{index + 1}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1">{loc.name}</span>
                    </div>
                    <div className="font-bold text-blue-600 bg-white px-2.5 sm:px-3 py-1 rounded-lg border border-blue-100 shadow-sm shrink-0 text-xs sm:text-sm">
                      {loc.total} Laporan
                    </div>
                  </div>
                ))}
                {data.topLocations.length === 0 && (
                  <div className="text-center text-xs sm:text-sm text-gray-500 py-8 sm:py-10 font-medium">Belum ada data lokasi.</div>
                )}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}