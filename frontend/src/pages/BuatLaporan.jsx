import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axiosInstance from '../api/axios';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// --- KOMPONEN LOCATION MARKER ---
function LocationMarker({ position, setPosition, setDataForm }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setDataForm(prev => ({ ...prev, latitude: lat, longitude: lng }));
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Titik lokasi: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</Popup>
    </Marker>
  );
}

// --- KOMPONEN UTAMA BUAT LAPORAN ---
export default function BuatLaporan() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isSubmittingRef = useRef(false);

  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  const [dataForm, setDataForm] = useState({
    category_id: '', 
    judul: '',
    deskripsi: '',
    latitude: '',
    longitude: ''
  });

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories');
        const dataKategori = response.data.data;
        setCategories(dataKategori);
        
        if (dataKategori && dataKategori.length > 0) {
          setDataForm(prev => ({ ...prev, category_id: dataKategori[0].id }));
        }
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const fileTunggal = selectedFiles[0];
      setFoto(fileTunggal);
    } else {
      setFoto(null);
    }
  };

  // 3. Fungsi Submit Laporan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    if (!dataForm.latitude || !dataForm.longitude) {
      setErrorMsg('Silakan pilih lokasi masalah pada peta terlebih dahulu.');
      return;
    }

    isSubmittingRef.current = true;
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('category_id', dataForm.category_id);
      formDataToSend.append('judul', dataForm.judul);
      formDataToSend.append('deskripsi', dataForm.deskripsi);
      formDataToSend.append('latitude', dataForm.latitude);
      formDataToSend.append('longitude', dataForm.longitude);
      
      if (foto) {
        formDataToSend.append('foto', foto);
      }

      const token = localStorage.getItem('token'); 

      const response = await axiosInstance.post('/reports', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.data.success) {
        setSuccessMsg('Laporan berhasil dikirim! Mengalihkan...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
      setErrorMsg('Gagal mengirim laporan. Pastikan Anda sudah login, serta semua data dan foto terisi.');
      
      isSubmittingRef.current = false;
      setIsLoading(false); 
    }
  };
  
  return (
    // Padding responsif: p-4 di HP, p-6 di Desktop
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Buat Laporan Baru</h1>
        <p className="text-sm sm:text-base text-gray-500">Laporkan masalah infrastruktur atau fasilitas publik di sekitar Anda.</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm sm:text-base font-medium border border-red-200">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm sm:text-base font-medium border border-green-200">
          {successMsg}
        </div>
      )}

      {/* Susunan responsif: di HP atas-bawah (flex-col), di Desktop kiri-kanan (lg:flex-row) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* BAGIAN FORM KIRI */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Masalah</label>
              <select 
                name="category_id"
                value={dataForm.category_id}
                onChange={handleChange}
                required
                className="w-full p-3 sm:p-3.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white"
              >
                {categories.length > 0 ? (
                  categories.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.nama_kategori}
                    </option>
                  ))
                ) : (
                  <option value="">Memuat Kategori...</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Judul Laporan</label>
              <input 
                type="text" 
                name="judul"
                value={dataForm.judul}
                onChange={handleChange}
                required
                placeholder="Contoh: Jalan berlubang di depan sekolah" 
                className="w-full p-3 sm:p-3.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Detail</label>
              <textarea 
                rows="4" 
                name="deskripsi"
                value={dataForm.deskripsi}
                onChange={handleChange}
                required
                placeholder="Ceritakan detail masalah yang Anda temukan..." 
                className="w-full p-3 sm:p-3.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Unggah Foto Bukti</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full p-6 sm:p-8 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {foto ? (
                  <div className="flex flex-col items-center">
                    {(foto instanceof File || foto instanceof Blob) ? (
                      <img src={URL.createObjectURL(foto)} alt="Preview" className="h-24 sm:h-32 w-auto object-cover rounded-lg shadow-sm mb-3" />
                    ) : (
                      <div className="h-24 sm:h-32 w-full bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-red-500 text-sm">Preview tidak tersedia</div>
                    )}
                    <p className="text-xs sm:text-sm font-medium text-gray-700 truncate w-full px-4">{foto.name}</p>
                    <p className="text-[10px] sm:text-xs text-blue-600 mt-1">Klik untuk mengganti foto</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Klik untuk mengunggah foto</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Maksimal 5MB (JPG, PNG)</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3.5 mt-2 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center text-sm sm:text-base ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Mengirim Laporan...' : 'Kirim Laporan'}
            </button>
          </form>
        </div>

        {/* BAGIAN PETA KANAN: h-[350px] di HP agar scroll aman, lg:h-[600px] di Desktop */}
        <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[600px] bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative order-first lg:order-last">
          <div className="absolute top-4 left-4 right-4 sm:right-auto z-[400] bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <p className="text-xs sm:text-sm font-semibold text-gray-700">📍 Klik pada peta untuk menandai lokasi</p>
            {dataForm.latitude && (
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-mono break-all">
                Koordinat: {dataForm.latitude.toFixed(4)}, {dataForm.longitude.toFixed(4)}
              </p>
            )}
          </div>
          
          <MapContainer 
            center={[0.5071, 101.4478]} 
            zoom={13} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} setDataForm={setDataForm} />
          </MapContainer>
        </div>

      </div>
    </div>
  );
}