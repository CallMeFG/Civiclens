// import React, 
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axiosInstance from '../api/axios';

// --- KOMPONEN LOCATION MARKER ---
function LocationMarker({ position, setPosition, setDataForm }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setDataForm(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
      }));
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Titik lokasi masalah yang Anda pilih</Popup>
    </Marker>
  );
}

// --- KOMPONEN UTAMA BUAT LAPORAN ---
export default function BuatLaporan() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef(null);

  const [dataForm, setDataForm] = useState({
    judul: '',
    deskripsi: '',
    latitude: '',
    longitude: ''
  });

  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileTunggal = selectedFiles; 
      setFoto(fileTunggal);
    } else {
      setFoto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.latitude || !dataForm.longitude) {
      setErrorMsg('Silakan pilih lokasi masalah pada peta terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul', dataForm.judul);
      formDataToSend.append('deskripsi', dataForm.deskripsi);
      formDataToSend.append('latitude', dataForm.latitude);
      formDataToSend.append('longitude', dataForm.longitude);
      
      if (foto) {
        formDataToSend.append('foto', foto);
      }

      const response = await axiosInstance.post('/reports', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert('Laporan Anda beserta foto berhasil dikirim dan sedang diproses!');
        navigate('/laporan-saya'); 
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrorMsg('Gagal mengirim laporan. Pastikan semua data terisi dengan benar atau periksa koneksi server Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buat Laporan Baru</h1>
        <p className="text-gray-500">Laporkan masalah infrastruktur atau fasilitas publik di sekitar Anda.</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: FORMULIR */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Masalah</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none">
                <option value="Infrastruktur">Infrastruktur (Jalan Rusak, dsb)</option>
                <option value="Kebersihan">Kebersihan (Tumpukan Sampah, dsb)</option>
                <option value="Fasilitas Publik">Fasilitas Publik Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Judul Laporan</label>
              <input
                type="text"
                name="judul"
                value={dataForm.judul}
                onChange={handleChange}
                placeholder="Contoh: Jalan berlubang di Jalan Sudirman"
                required
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Detail</label>
              <textarea
                name="deskripsi"
                value={dataForm.deskripsi}
                onChange={handleChange}
                rows="4"
                placeholder="Jelaskan secara detail masalah yang terjadi..."
                required
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none transition-shadow"
              ></textarea>
            </div>

            {/* AREA UPLOAD FOTO DENGAN PREVIEW */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Unggah Foto</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer"
              >
                {foto ? (
                  <div className="flex flex-col items-center">
                    {/* PENDEKATAN BARU: Validasi mutlak bahwa foto adalah File/Blob sebelum di-render */}
                    {(foto instanceof File || foto instanceof Blob) ? (
                      <img src={URL.createObjectURL(foto)} alt="Preview" className="h-32 w-auto object-cover rounded-lg shadow-sm mb-3" />
                    ) : (
                      <div className="h-32 w-full bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-red-500 text-sm">Gagal memuat preview</div>
                    )}<span className="text-green-600 font-bold text-sm">✓ {foto.name}</span>
                    <span className="text-gray-400 text-xs mt-1">Klik untuk mengganti foto</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-500 font-medium">Klik atau seret foto ke sini</div>
                    <div className="text-sm text-gray-400 mt-1">Maksimal 5MB (JPG, PNG)</div>
                  </div>
                )}
              </div>
              
              <input 
                type="file" 
                accept="image/jpeg, image/png, image/jpg"
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
              }`}
            >
              {isLoading ? 'Mengirim Laporan...' : 'Kirim Laporan'}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: PETA INTERAKTIF */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Tentukan Lokasi</h3>
              <p className="text-sm text-gray-500">Klik pada peta untuk menandai titik lokasi masalah</p>
            </div>
            {position && (
              <div className="text-xs bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-lg font-medium border border-blue-100">
                Terpilih: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
              </div>
            )}
          </div>

          <div className="flex-1 w-full rounded-xl overflow-hidden border border-gray-200 min-h-[400px]">
            <MapContainer center={[0.5071, 101.4478]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} setDataForm={setDataForm} />
            </MapContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
}