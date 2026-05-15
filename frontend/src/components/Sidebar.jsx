// import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Map, FileText, PlusCircle, BarChart2, Bell, User, LogOut, ShieldCheck } from 'lucide-react';
import axiosInstance from '../api/axios'; // Import konfigurasi axios kita

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
      // Memanggil API logout (Token sudah otomatis disisipkan oleh axiosInstance)
      await axiosInstance.post('/logout');
    } catch (error) {
      console.error("Gagal logout dari server", error);
    } finally {
      // Hapus token dari browser
      localStorage.removeItem('token');
      // Arahkan kembali ke halaman Login
      navigate('/login');
    }
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white flex flex-col justify-between fixed top-0 left-0">
      <div>
        <div className="flex items-center gap-2 font-bold text-2xl p-6 border-b border-white/20">
          <ShieldCheck className="w-8 h-8" /> CivicLens
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
                    ? 'bg-white text-[#2563EB] font-bold shadow-md' 
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

      <div className="p-4 border-t border-white/20">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white hover:bg-red-500/80 transition-all duration-300 font-medium cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;