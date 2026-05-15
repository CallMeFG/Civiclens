// import React from 'react';
import { useState } from 'react';
import { Search, Heart, ChevronRight, ChevronLeft, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function LaporanSaya() {
  // State untuk menyimpan teks pencarian [2]
  const [searchTerm, setSearchTerm] = useState('');

  // Data Dummy sesuai dengan desain Anda
  const reports = [
    {
      id: 1,
      title: 'Jalan Rusak',
      address: 'Jl. Mawar Putih No.12',
      desc: 'Kondisi jalan berlubang cukup dalam dan lebar, sangat membahayakan, terutama saat hujan',
      date: 'Dilaporkan 2 April 2026, 10.30',
      status: 'Urgent',
      statusColor: 'bg-red-100 text-red-600',
      likes: 180,
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=300' // Gambar ilustrasi jalan
    },
    {
      id: 2,
      title: 'Sampah Menumpuk',
      address: 'Jl. Mawar Merah No.14',
      desc: 'Sampah di saluran got sudah menumpuk hingga keluar area, menimbulkan bau tidak sedap',
      date: 'Dilaporkan 6 April 2026, 17.30',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-600',
      likes: 56,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300' // Gambar ilustrasi sampah
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Laporan Saya</h1>
        <p className="text-gray-500 mt-1">Kelola dan pantau semua laporan yang Anda buat.</p>
      </div>

      {/* 4 Kartu Ringkasan Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full"><FileText className="w-6 h-6 text-blue-600" /></div>
          <div><h3 className="text-3xl font-bold text-gray-800">12</h3><p className="text-gray-500 text-sm">Total laporan</p></div>
        </div>
        
        {/* Kartu Aktif Berwarna Oranye Sesuai Desain */}
        <div className="bg-orange-500 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full"><Clock className="w-6 h-6 text-white" /></div>
          <div><h3 className="text-3xl font-bold text-white">4</h3><p className="text-white/80 text-sm">Sedang diproses</p></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full"><CheckCircle className="w-6 h-6 text-green-500" /></div>
          <div><h3 className="text-3xl font-bold text-gray-800">6</h3><p className="text-gray-500 text-sm">Selesai</p></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-full"><XCircle className="w-6 h-6 text-red-500" /></div>
          <div><h3 className="text-3xl font-bold text-gray-800">2</h3><p className="text-gray-500 text-sm">Ditolak</p></div>
        </div>
      </div>

      {/* Kolom Pencarian & Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-8">
        <h3 className="text-lg font-bold text-gray-800 w-full md:w-auto">Daftar Laporan Anda</h3>
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari laporan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
            />
          </div>
          <select className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary text-gray-600 font-medium min-w-[160px] cursor-pointer">
            <option>Semua Status</option>
            <option>Sedang diproses</option>
            <option>Selesai</option>
            <option>Ditolak</option>
          </select>
        </div>
      </div>

      {/* Daftar Laporan (List View) */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow cursor-pointer">
            <img src={report.image} alt={report.title} className="w-full md:w-48 h-32 object-cover rounded-xl" />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-primary">{report.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{report.address}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{report.desc}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">{report.date}</p>
            </div>

            <div className="flex flex-col items-end justify-between min-w-[120px]">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${report.statusColor}`}>
                {report.status}
              </span>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-1 text-gray-400">
                  <Heart className="w-4 h-4" /> <span className="text-sm font-medium">{report.likes}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginasi (Sesuai Desain) */}
      <div className="flex justify-center items-center gap-2 mt-8 pt-4">
        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
        <button className="w-9 h-9 bg-primary text-white rounded-lg font-medium text-sm shadow-sm">1</button>
        <button className="w-9 h-9 border border-gray-200 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">2</button>
        <button className="w-9 h-9 border border-gray-200 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">3</button>
        <span className="text-gray-400 px-1">...</span>
        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight className="w-4 h-4" /></button>
      </div>

    </div>
  );
}