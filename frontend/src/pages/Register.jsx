// import React, 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, BarChart3, Lock, Eye, EyeOff, User, Mail, AlertCircle } from 'lucide-react';
import axios from 'axios'; // Import Axios

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: ''
  });
  
  // State untuk status loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fungsi untuk mencatat ketikan user ke dalam state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi saat tombol Daftar ditekan
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Mengirim data ke API Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      // Jika berhasil, Laravel akan mengembalikan 'success: true' dan 'token'
      if (response.data.success) {
        // Simpan token di local storage browser sebagai tanda sudah login
        localStorage.setItem('token', response.data.token);
        
        // Arahkan pengguna langsung ke Dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Menangkap dan menampilkan error dari Laravel (misal: email sudah digunakan)
      if (error.response && error.response.data.errors) {
        const firstError = Object.values(error.response.data.errors);
        setErrorMsg(firstError);
      } else {
        setErrorMsg('Terjadi kesalahan pada server. Pastikan backend menyala.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      
      {/* Kolom Kiri: Sama persis seperti sebelumnya */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary pt-8 pb-0 flex-col justify-between relative">
        <div className="relative z-10 mb-2 px-10">
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-6">
            <ShieldCheck className="w-7 h-7" /> CivicLens
          </div>
          <h1 className="text-3xl font-bold mb-3 leading-tight text-white">Selamat Datang<br/>di CivicLens</h1>
          <p className="text-blue-100 text-sm mb-6 max-w-md leading-relaxed">Platform laporan masyarakat untuk mewujudkan kota yang lebih baik melalui transparansi dan kolaborasi.</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0"><ShieldCheck className="w-5 h-5" /></div>
              <div><h3 className="font-bold text-base mb-0.5 text-white">Laporkan Masalah</h3><p className="text-blue-100 text-xs">Laporkan masalah di sekitar Anda dengan mudah.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0"><Users className="w-5 h-5" /></div>
              <div><h3 className="font-bold text-base mb-0.5 text-white">Pantau Transparan</h3><p className="text-blue-100 text-xs">Lihat perkembangan laporan secara real-time.</p></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0"><BarChart3 className="w-5 h-5" /></div>
              <div><h3 className="font-bold text-base mb-0.5 text-white">Data Perubahan</h3><p className="text-blue-100 text-xs">Laporan Anda menciptakan perubahan nyata.</p></div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-auto flex-1 min-h-0 w-full">
          <img src="/img/contoh1.png" alt="Ilustrasi CivicLens" className="w-full h-full object-cover object-top drop-shadow-md" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Kolom Kanan: Form Pendaftaran */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
          
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Daftarkan Akun Anda</h2>
            <p className="text-gray-500 text-sm mt-1">Daftar untuk melanjutkan ke dashboard CivicLens</p>
          </div>

          {/* Kotak Error jika pendaftaran gagal */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl flex items-start gap-2 text-sm border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 text-xs">Nama Lengkap</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda" 
                  required 
                  className="w-full pl-11 pr-3.5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-gray-50/50" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 text-xs">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda" 
                  required 
                  className="w-full pl-11 pr-3.5 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-gray-50/50" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-700 text-xs">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda (minimal 8 karakter)" 
                  required 
                  minLength="8"
                  className="w-full pl-11 pr-12 py-3.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-gray-50/50" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3.5 text-white rounded-xl font-bold text-base shadow-md transition-colors mt-2 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'}`}
            >
              {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 font-medium">atau daftar dengan</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button type="button" className="w-full py-3.5 mt-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Lanjutkan dengan Google
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Sudah punya akun? <Link to="/login" className="text-primary font-bold hover:underline ml-1">Masuk Sekarang</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}