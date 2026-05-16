import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function Profil() {
  const [profileData, setProfileData] = useState({
    namaLengkap: '',
    tanggalLahir: '',
    email: '',
    jenisKelamin: '',
    nomorTelepon: '',
    lokasi: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  // MENGAMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/user');
        
        setProfileData({
          namaLengkap: response.data.name || '',
          email: response.data.email || '',
          nomorTelepon: response.data.nomor_telepon || '',
          tanggalLahir: response.data.tanggal_lahir || '',
          jenisKelamin: response.data.jenis_kelamin || '',
          lokasi: response.data.lokasi || ''
        });
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axiosInstance.post('/user/update', {
        name: profileData.namaLengkap,
        nomor_telepon: profileData.nomorTelepon,
        tanggal_lahir: profileData.tanggalLahir,
        jenis_kelamin: profileData.jenisKelamin,
        lokasi: profileData.lokasi
      });

      if(response.data.success) {
        setMessage('Profil berhasil diperbarui!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error("Gagal update profil:", error);
      setMessage('Gagal memperbarui profil. Periksa data Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 h-full flex flex-col pb-6 sm:pb-10">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Profil</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Kelola data pribadi dan informasi akun Anda.</p>
      </div>

      {message && (
        <div className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-bold ${message.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Grid disesuaikan agar responsif lebih awal (lg:grid-cols-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 flex-1">
        
        {/* Kartu Profil Ringkas */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-linear-to-r from-primary to-[#10B981]"></div>
            
            <div className="relative mt-6 sm:mt-8 mb-3 sm:mb-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                  <span className="text-2xl sm:text-3xl font-bold uppercase">
                    {profileData.namaLengkap ? profileData.namaLengkap.charAt(0) : 'U'}
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{profileData.namaLengkap || 'Memuat...'}</h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">{profileData.email || 'Memuat...'}</p>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] sm:text-xs font-bold border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Warga Aktif
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Detail Profil */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            
            {/* Header Form: Di HP berubah jadi atas-bawah (flex-col), di Desktop kiri-kanan (sm:flex-row) */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 bg-gray-50/50">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Informasi Pribadi</h3>
              <button 
                onClick={handleUpdate}
                disabled={isLoading}
                className="w-full sm:w-auto text-sm font-semibold bg-primary text-white py-2.5 sm:py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 cursor-pointer"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
            
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" name="namaLengkap" value={profileData.namaLengkap} onChange={handleChange} className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Alamat Email <span className="text-gray-400 font-normal ml-1">(Read-only)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="email" name="email" value={profileData.email} readOnly className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-gray-100 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-500 outline-none cursor-not-allowed transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Nomor Telepon</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" name="nomorTelepon" value={profileData.nomorTelepon} onChange={handleChange} placeholder="Contoh: 08123456789" className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Tanggal Lahir</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="date" name="tanggalLahir" value={profileData.tanggalLahir} onChange={handleChange} className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Jenis Kelamin</label>
                <select name="jenisKelamin" value={profileData.jenisKelamin} onChange={handleChange} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-all">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Lokasi Utama</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" name="lokasi" value={profileData.lokasi} onChange={handleChange} placeholder="Pekanbaru, Riau" className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}