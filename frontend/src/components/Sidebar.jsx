// import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Ikon ShieldCheck dihapus karena diganti dengan Logo.png
import { Map, FileText, PlusCircle, BarChart2, Bell, User, LogOut } from 'lucide-react';
import axiosInstance from '../api/axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Peta Laporan', icon: Map, path: '/dashboard' },
    { name: 'Laporan Saya', icon: FileText, path: '/laporan-saya' },
    { name: 'Buat Laporan', icon: PlusCircle, path: '/buat-laporan' },
    { name: 'Insight', icon: BarChart2, path: '/insight' },
    { name: 'Notifikasi', icon: Bell, path: '/notifikasi' },
    { name: 'Profil', icon: User, path: '/profil' },
  ];

  // Fungsi untuk menangani proses Logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Gagal logout dari server", error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <aside className="w-64 h-screen bg-linear-to-r from-primary to-[#10B981] text-white flex flex-col justify-between fixed top-0 left-0 shadow-xl">
      <div>
        
        {/* BAGIAN HEADER YANG BISA DIKLIK (Navigasi ke Homepage) */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 font-bold text-2xl p-6 border-b border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
          title="Kembali ke Beranda"
        >
          <img 
            src="/img/Logo.png" 
            alt="CivicLens Logo" 
            className="w-8 h-8 object-contain"
          />
          CivicLens
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-primary font-bold shadow-md'
                    : 'text-white hover:bg-white/10 font-medium'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BAGIAN BAWAH: Tombol Keluar / Logout */}
      <div className="p-4 mb-4 border-t border-white/20">
        <button 
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 hover:bg-red-500 hover:text-white font-medium text-white/90"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;