// import React,
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, BarChart3, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    // h-screen dan overflow-hidden mengunci layar dari scroll
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      
      {/* Kolom Kiri: Area Info (40% di layar besar) */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary pt-8 pb-0 flex-col justify-between relative">
        
        {/* Konten Atas */}
        <div className="relative z-10 mb-2 px-10">
          
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-6">
            <ShieldCheck className="w-7 h-7" /> CivicLens
          </div>

          <h1 className="text-3xl font-bold mb-3 leading-tight text-white">
            Selamat Datang<br/>di CivicLens
          </h1>
          <p className="text-blue-100 text-sm mb-6 max-w-md leading-relaxed">
            Platform laporan masyarakat untuk mewujudkan kota yang lebih baik melalui transparansi dan kolaborasi.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">Laporkan Masalah</h3>
                <p className="text-blue-100 text-xs">Laporkan masalah di sekitar Anda dengan mudah.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">Pantau Transparan</h3>
                <p className="text-blue-100 text-xs">Lihat perkembangan laporan secara real-time.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">Data Perubahan</h3>
                <p className="text-blue-100 text-xs">Laporan Anda menciptakan perubahan nyata.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Konten Bawah: Gambar Ilustrasi */}
        {/* PERUBAHAN: menggunakan object-cover agar gambar melebar penuh menyentuh sisi kiri dan kanan */}
        <div className="relative z-10 mt-auto flex-1 min-h-0 w-full">
          <img 
            src="/img/contoh1.png" 
            alt="Ilustrasi CivicLens" 
            // PERUBAHAN: w-full h-full object-cover object-top membuat gambar mengisi penuh container, 
            // menahan bagian atas tetap terlihat, dan memotong bagian bawah jika ruangnya sempit.
            className="w-full h-full object-cover object-top drop-shadow-md"
          />
        </div>
        
        {/* Aksen Lingkaran Latar Belakang */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Kolom Kanan: Form Login (60% di layar besar) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 relative">
        
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

        {/* PERUBAHAN: max-w-xl (tetap lebar), p-8 (padding dalam dikurangi agar lebih pendek), rounded-2xl */}
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
          
          {/* Margin bawah header dikurangi jadi mb-6, ikon diperkecil sedikit */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Masuk ke Akun Anda</h2>
            <p className="text-gray-500 text-sm mt-1">Masuk untuk melanjutkan ke dashboard CivicLens</p>
          </div>

          {/* Jarak antar form dikurangi jadi space-y-4 */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 text-sm">Email</label>
              {/* Padding input diturunkan jadi p-3.5 */}
              <input 
                type="email" 
                placeholder="Masukkan email Anda" 
                required 
                className="w-full p-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-gray-50/50" 
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-700 text-sm">Password</label>
                <button type="button" className="text-sm text-primary font-bold hover:underline">Lupa Password?</button>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Masukkan password Anda" 
                  required 
                  className="w-full p-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-gray-50/50 pr-12" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Padding tombol diturunkan jadi py-3.5 */}
            <button type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-base shadow-md hover:bg-blue-700 transition-colors mt-2">
              Masuk
            </button>
          </form>

          {/* Margin elemen bawah dipadatkan jadi mt-6 */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 font-medium">atau masuk dengan</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button type="button" className="w-full py-3.5 mt-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Lanjutkan dengan Google
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Belum punya akun? <Link to="/register" className="text-primary font-bold hover:underline ml-1">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}