// import React from 'react';
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3 } from 'lucide-react';

export default function Profil() {
  // State untuk menyimpan data profil pengguna
  const [profileData, setProfileData] = useState({
    namaLengkap: 'Budi Santoso',
    tanggalLahir: '1995-08-17',
    email: 'budi.santoso@email.com',
    jenisKelamin: 'Laki-laki',
    nomorTelepon: '081234567890',
    lokasi: 'Pekanbaru, Riau'
  });

  // Fungsi untuk menangani perubahan pada input form
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
        <p className="text-gray-500 mt-1">Laporan masyarakat untuk semua daerah.</p>
      </div>

      {/* Kartu Atas: Ringkasan Profil */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          
          <div className="text-center md:text-left space-y-1.5 mt-2">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">{profileData.namaLengkap}</h2>
              {/* Badge Warga Aktif */}
              <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                Warga Aktif
              </span>
            </div>
            {/* Info Kontak Cepat */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
              <Mail className="w-4 h-4" /> {profileData.email}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
              <Phone className="w-4 h-4" /> {profileData.nomorTelepon}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" /> {profileData.lokasi}
            </div>
          </div>
        </div>
        
        {/* Tombol Edit */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Edit3 className="w-4 h-4" /> Edit Profil
        </button>
      </div>

      {/* Kartu Tengah: Formulir Informasi Pribadi */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Informasi Pribadi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Nama Lengkap</label>
            <input type="text" name="namaLengkap" value={profileData.namaLengkap} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" />
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Tanggal Lahir</label>
            <input type="date" name="tanggalLahir" value={profileData.tanggalLahir} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow text-gray-700" />
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Email</label>
            <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" />
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Jenis Kelamin</label>
            <select name="jenisKelamin" value={profileData.jenisKelamin} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow bg-white text-gray-700">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Nomor Telepon</label>
            <input type="text" name="nomorTelepon" value={profileData.nomorTelepon} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" />
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-700 text-sm">Lokasi</label>
            <input type="text" name="lokasi" value={profileData.lokasi} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" />
          </div>

        </div>
      </div>

      {/* Kartu Bawah: Tentang CivicLens */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800">Tentang CivicLens</h3>
          <span className="text-gray-400 text-sm font-medium">Versi 1.0</span>
        </div>
        <p className="text-primary font-medium text-sm">
          CivicLens adalah platform partisipasi masyarakat untuk melaporkan dan memantau isu lingkungan sekitar demi menciptakan perubahan yang lebih baik.
        </p>
      </div>

    </div>
  );
}