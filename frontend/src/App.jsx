import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
// import {Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import file CSS AOS
import { useEffect } from 'react';

import Insight from './pages/Insight';
import LaporanSaya from './pages/LaporanSaya';
import PetaLaporan from './pages/PetaLaporan';
import BuatLaporan from './pages/BuatLaporan';
import Profil from './pages/Profil';
import Notifikasi from './pages/Notifikasi';

function App() {
  useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
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