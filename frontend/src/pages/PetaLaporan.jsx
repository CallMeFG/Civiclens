// import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Wajib di-import agar peta tidak rusak
import { Search, Heart, Filter } from 'lucide-react';

export default function PetaLaporan() {
  // Data Dummy untuk Laporan Terbaru di Sidebar Kanan
  const recentReports = [
    { id: 1, title: 'Jalan Rusak', address: 'Jl. Mawar Putih No.12', time: '2 Jam yang lalu', status: 'Urgent', statusColor: 'bg-red-100 text-red-600', likes: 180, image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=150' },
    { id: 2, title: 'Sampah Menumpuk', address: 'Jl. Mawar Merah No.14', time: '5 Jam yang lalu', status: 'Pending', statusColor: 'bg-orange-100 text-orange-600', likes: 56, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=150' },
    { id: 3, title: 'Lampu Jalan Mati', address: 'Jl. Purut No.1', time: '6 Jam yang lalu', status: 'Progress', statusColor: 'bg-blue-100 text-blue-600', likes: 77, image: 'https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?w=150' },
  ];

  // Data Dummy untuk Titik Pin Peta (Contoh koordinat)
  const mapLocations = [
    { id: 1, pos: [0.5070, 101.4477], desc: 'Jalan Rusak - Jl. Mawar Putih' },
    { id: 2, pos: [0.5150, 101.4500], desc: 'Sampah Menumpuk - Jl. Mawar Merah' },
    { id: 3, pos: [0.4950, 101.4300], desc: 'Lampu Jalan Mati - Jl. Purut' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Peta Laporan</h1>
        <p className="text-gray-500 mt-1">Pantau laporan dari masyarakat di seluruh wilayah.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Kolom Kiri: Peta dan Search Bar */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Search Bar & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari Lokasi atau Laporan..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
              />
            </div>
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium flex items-center gap-2 shadow-sm hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter Kategori
            </button>
          </div>

          {/* Area Peta */}
          {/* z-0 digunakan agar peta tidak menutupi pop-up atau sidebar lain */}
          <div className="flex-1 min-h-[500px] bg-white rounded-2xl border border-gray-200 overflow-hidden relative z-0 shadow-sm p-2">
            <MapContainer 
              center={[0.5070, 101.4477]} // Koordinat tengah peta
              zoom={13} 
              style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
            >
              {/* TileLayer adalah "kulit" gambar petanya dari OpenStreetMap */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              
              {/* Merender Pin Lokasi */}
              {mapLocations.map(loc => (
                <Marker key={loc.id} position={loc.pos}>
                  <Popup className="font-semibold text-gray-800">
                    {loc.desc}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Laporan Terbaru */}
        <div className="w-full lg:w-[380px] bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Laporan Terbaru</h3>
            <button className="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {recentReports.map(report => (
              <div key={report.id} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <img src={report.image} alt={report.title} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{report.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${report.statusColor}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{report.address}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-400 font-medium">{report.time}</p>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Heart className="w-3.5 h-3.5" /> <span className="text-xs font-medium">{report.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}