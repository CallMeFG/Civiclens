import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    // Latar belakang abu-abu sangat muda untuk area konten (seperti di desain)
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      {/* Area utama digeser ke kanan (ml-64) agar tidak tertutup Sidebar yang posisinya fixed */}
      <main className="flex-1 ml-64 p-8">
        {/* <Outlet /> adalah tempat di mana konten halaman yang berubah-ubah akan dirender */}
        <Outlet />
      </main>
    </div>
  );
}