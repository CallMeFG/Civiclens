import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
// import {Navigate} from 'react-router-dom';

// Import semua halaman publik
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Import semua halaman dashboard
import Insight from './pages/Insight';
import LaporanSaya from './pages/LaporanSaya';
import PetaLaporan from './pages/PetaLaporan';
import BuatLaporan from './pages/BuatLaporan';
import Profil from './pages/Profil';
import Notifikasi from './pages/Notifikasi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- RUTE PUBLIK (Tanpa Sidebar) --- */}
        {/* Saat pengguna membuka web pertama kali, mereka masuk ke Homepage */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- RUTE DASHBOARD (Menggunakan Sidebar) --- */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<PetaLaporan />} />
          <Route path="laporan-saya" element={<LaporanSaya />} />
          <Route path="buat-laporan" element={<BuatLaporan />} />
          <Route path="insight" element={<Insight />} />
          <Route path="notifikasi" element={<Notifikasi />} />
          <Route path="profil" element={<Profil />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;