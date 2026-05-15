// import React,
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Megaphone, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Notifikasi() {
  // State untuk melacak Tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState('Semua');

  // Data Dummy Notifikasi Sesuai Desain Figma
  const notifications = [
    { 
      id: 1, type: 'Laporan Saya', status: 'ditolak', 
      title: 'Laporan Anda telah ditolak', desc: 'Laporan "Trotoar Rusak" tidak dapat ditindak lanjuti. Klik untuk melihat alasan.', 
      time: '1 Jam lalu', unread: true, icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' 
    },
    { 
      id: 2, type: 'Laporan Saya', status: 'berhasil', 
      title: 'Terima kasih atas laporan Anda', desc: 'Pusat informasi dan pembaruan aktivitas laporan Anda.', 
      time: '3 Jam lalu', unread: true, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' 
    },
    { 
      id: 3, type: 'Laporan Saya', status: 'diproses', 
      title: 'Laporan Anda sedang diproses', desc: 'Laporan "Jalan Rusak di Depan sekolah" sedang dalam proses penanganan.', 
      time: '5 Jam lalu', unread: false, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' 
    },
    { 
      id: 4, type: 'Sistem', status: 'info', 
      title: 'Sistem Pemeliharaan', desc: 'Pembaruan sistem akan dilakukan pada 05 Juni 2026 pukul 02.00 - 04.25 WIB', 
      time: 'Kemarin, 10.00', unread: false, icon: Megaphone, color: 'text-emerald-500', bg: 'bg-emerald-100' 
    },
  ];

  // Logika untuk memfilter notifikasi berdasarkan tab yang diklik
  const filteredNotifs = notifications.filter(notif => 
    activeTab === 'Semua' ? true : notif.type === activeTab
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
        <p className="text-gray-500 mt-1">Pusat informasi dan pembaruan aktivitas laporan Anda.</p>
      </div>

      {/* Navigasi Tab & Tombol Tandai Dibaca */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Sistem Tab */}
        <div className="flex bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
          {['Semua', 'Laporan Saya', 'Sistem'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tombol Aksi */}
        <button className="flex items-center gap-2 text-primary font-medium text-sm hover:underline px-2">
          <CheckCircle2 className="w-5 h-5" /> Tandai semua sebagai dibaca
        </button>
      </div>

      {/* Daftar Notifikasi */}
      <div className="flex-1 space-y-4 mt-4">
        {filteredNotifs.map(notif => (
          <div 
            key={notif.id} 
            className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors cursor-pointer ${
              notif.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100 hover:bg-gray-50'
            }`}
          >
            {/* Ikon Status */}
            <div className={`p-3 rounded-full shrink-0 ${notif.bg}`}>
              <notif.icon className={`w-6 h-6 ${notif.color}`} />
            </div>
            
            {/* Konten Teks */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notif.title}
                </h3>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                  {notif.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notif.desc}</p>
            </div>

            {/* Titik Biru penanda belum dibaca */}
            {notif.unread && (
              <div className="w-3 h-3 bg-primary rounded-full shrink-0 mt-1.5 shadow-sm"></div>
            )}
          </div>
        ))}

        {/* Pesan Kosong jika tab tidak memiliki data */}
        {filteredNotifs.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Tidak ada notifikasi di kategori ini.
          </div>
        )}
      </div>

      {/* Paginasi Bawah */}
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