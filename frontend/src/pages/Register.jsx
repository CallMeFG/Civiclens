import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BarChart3, Lock, Eye, EyeOff, User, Mail, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react'; // Tambahkan ArrowLeft
import axiosInstance from '../api/axios';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.konfirmasiPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok. Silakan periksa kembali.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await axiosInstance.post('/register', {
        nama_lengkap: formData.namaLengkap, 
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.konfirmasiPassword
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Registrasi gagal:", error);
      setErrorMsg(error.response?.data?.message || "Pendaftaran gagal. Pastikan email belum terdaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex bg-gray-50 overflow-y-auto lg:overflow-hidden">
      
      <div className="hidden lg:flex lg:w-2/5 bg-primary pt-8 pb-0 flex-col justify-between relative">
        <div className="relative z-10 mb-2 px-10">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white font-bold text-xl mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            title="Kembali ke Beranda"
          >
            <img
              src="/img/Logo.png"
              alt="CivicLens Logo"
              className="w-7 h-7 object-contain"
            />
            CivicLens
          </div>

          <h1 className="text-3xl font-bold mb-3 leading-tight text-white">
            Selamat Datang
            <br />
            di CivicLens
          </h1>
          <p className="text-blue-100 text-sm mb-6 max-w-md leading-relaxed">
            Platform laporan masyarakat untuk mewujudkan kota yang lebih baik
            melalui transparansi dan kolaborasi.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">
                  Laporkan Masalah
                </h3>
                <p className="text-blue-100 text-xs">
                  Laporkan masalah di sekitar Anda dengan mudah.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">
                  Pantau Transparan
                </h3>
                <p className="text-blue-100 text-xs">
                  Lihat perkembangan laporan secara real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white text-primary p-2 rounded-xl shadow-sm shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5 text-white">
                  Data Perubahan
                </h3>
                <p className="text-blue-100 text-xs">
                  Laporan Anda menciptakan perubahan nyata.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto flex-1 min-h-0 w-full">
          <img
            src="/img/contoh1.png"
            alt="Ilustrasi CivicLens"
            className="w-full h-full object-cover object-top drop-shadow-md"
          />
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
      
      <div className="w-full lg:w-3/5 flex items-center justify-center p-4 sm:p-8 relative my-auto lg:my-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>
        
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8 relative z-10">
          
          {/* TOMBOL BACK KHUSUS MOBILE */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 text-primary hover:bg-blue-50 rounded-full transition-colors cursor-pointer lg:hidden"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="text-center mb-6 mt-4 sm:mt-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Daftarkan Akun Anda</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Lengkapi data di bawah ini untuk bergabung</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Kata Sandi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-11 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Min. 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Ulangi Sandi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="konfirmasiPassword"
                    value={formData.konfirmasiPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 sm:pl-11 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Ulangi sandi"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>

                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-3.5 mt-4 sm:mt-2 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex justify-center items-center ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-primary cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5' 
              }`}
            >
              {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline transition-all">
              Masuk Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}