import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Filter, MapPin } from 'lucide-react';
import axiosInstance from '../api/axios'; // Menggunakan Axios yang sudah membawa Token

export default function PetaLaporan() {
  // State untuk menampung data asli dari database
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil data dari Backend Laravel saat halaman dibuka
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Karena rute ini dilindungi middleware sanctum, axiosInstance akan otomatis membawa Token
        const response = await axiosInstance.get('/reports');
        
        // Memasukkan array data dari API ke dalam state
        setReports(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data peta laporan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fungsi pembantu untuk memberi warna otomatis berdasarkan status laporan
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-orange-100 text-orange-600';
      case 'diproses':
        return 'bg-blue-100 text-blue-600';
      case 'selesai':
        return 'bg-green-100 text-green-600';
      case 'ditolak':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Peta Laporan</h1>
        <p className="text-gray-500 mt-1">Pantau laporan dari masyarakat di seluruh wilayah secara real-time.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-150">
        
        {/* KOLOM KIRI: PETA INTERAKTIF (70%) */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
          <MapContainer 
            center={[0.5071, 101.4478]} // Titik tengah default (Pekanbaru)
            zoom={13} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Mapping Data Asli ke Pin (Marker) Peta */}
            {reports.map((report) => (
              report.latitude && report.longitude && (
                <Marker 
                  key={report.id} 
                  position={[parseFloat(report.latitude), parseFloat(report.longitude)]}
                >
                  <Popup>
                    <div className="min-w-50">
                      <img 
                        src={report.foto ? `http://localhost:8000/storage/${report.foto}` : 'https://via.placeholder.com/300x150?text=Tidak+Ada+Foto'} 
                        alt="Foto Laporan" 
                        className="w-full h-24 object-cover rounded-lg mb-2"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x150?text=Gambar+Gagal+Dimuat' }}
                      />
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{report.judul}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{report.deskripsi}</p>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>

        {/* KOLOM KANAN: DAFTAR LAPORAN TERBARU (30%) */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-150">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Laporan Terbaru
            </h2>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Area List yang bisa di-scroll */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {isLoading ? (
              <div className="text-center text-gray-500 py-10 font-medium">Mencari titik laporan...</div>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <div key={report.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white group cursor-pointer">
                  {/* Foto Thumbnail */}
                  <img
                    src={report.foto ? `http://localhost:8000/storage/${report.foto}` : 'https://via.placeholder.com/150?text=No+Img'}
                    alt={report.judul}
                    className="w-20 h-20 object-cover rounded-lg shrink-0 border border-gray-100 group-hover:opacity-90"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error' }}
                  />
                  
                  {/* Info Laporan */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${getStatusStyle(report.status)}`}>
                        {report.status || 'Pending'}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm truncate mb-1" title={report.judul}>
                      {report.judul}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {report.deskripsi}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <img src="https://via.placeholder.com/100?text=Kosong" alt="Kosong" className="w-16 h-16 mx-auto mb-3 opacity-50 grayscale rounded-full" />
                <p className="font-medium text-sm">Belum ada laporan di peta.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}