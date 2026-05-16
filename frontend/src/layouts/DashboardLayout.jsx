import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react'; 

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* OVERLAY: Muncul saat sidebar dibuka di HP */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[40] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        
        {/* HEADER MOBILE */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-[30]">
          
          {/* LOGO & TEKS: Dibuat persis seperti Sidebar dan bisa diklik ke Beranda */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 font-bold text-2xl text-primary cursor-pointer hover:opacity-80 transition-opacity"
            title="Kembali ke Beranda"
          >
            <img 
              src="/img/Logo.png" 
              alt="CivicLens Logo" 
              className="w-8 h-8 object-contain" 
            />
            CivicLens
          </div>
          
          {/* TOMBOL MENU HAMBURGER */}
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}