import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Heart, ChevronRight, ArrowLeft, Clock, MapPin } from 'lucide-react';
import axiosInstance from '../api/axios';

export default function PetaLaporan() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('map'); 
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const response = await axiosInstance.get('/reports', config);
      if (response.data.success) {
        setReports(response.data.data || []);
      }
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  const handleVote = async (reportId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu untuk memberikan dukungan atau vote!');
      return;
    }

    setReports(prevReports => prevReports.map(report => {
      if (report.id === reportId) {
        const isCurrentlyVoted = report.is_voted;
        return {
          ...report,
          is_voted: !isCurrentlyVoted,
          votes_count: isCurrentlyVoted 
            ? Math.max(0, (report.votes_count || 0) - 1)
            : (report.votes_count || 0) + 1
        };
      }
      return report;
    }));

    try {
      await axiosInstance.post(`/reports/${reportId}/vote`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Gagal melakukan vote ke server:", error);
      fetchAllReports();
    }
  };

  const getImageUrl = (fotoPath) => {
    if (fotoPath) return `http://127.0.0.1:8000/storage/${fotoPath}`;
    return 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=300';
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'diproses': return 'bg-blue-100 text-blue-600';
      case 'selesai': return 'bg-green-100 text-green-600';
      case 'ditolak': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredReports = reports.filter(report =>
    report.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* ======================================================== */}
      {/* MODE 1: TAMPILAN PETA & LAPORAN TERBARU                  */}
      {/* ======================================================== */}
      {viewMode === 'map' ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Peta Sebaran Laporan</h1>
            <p className="text-gray-500 mt-1">Pantau lokasi permasalahan fasilitas publik di seluruh wilayah kota.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[650px]">
              {isLoading ? (
                 <div className="flex items-center justify-center h-full text-gray-500">Memuat peta...</div>
              ) : (
                <MapContainer center={[0.5071, 101.4478]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {reports.map((report) => (
                    <Marker key={report.id} position={[report.latitude, report.longitude]}>
                      <Popup>
                        <div className="p-1 max-w-[200px]">
                          <img src={getImageUrl(report.foto)} alt="" className="w-full h-20 object-cover rounded mb-2" />
                          <h5 className="font-bold text-sm text-gray-800 mb-0.5">{report.judul}</h5>
                          <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{report.deskripsi}</p>
                          <div className="flex justify-between items-center pt-1 border-t">
                            <span className="text-[10px] font-bold uppercase text-orange-600">{report.status}</span>
                            
                            {/* TOMBOL VOTE DI POPUP PETA */}
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleVote(report.id); }}
                              className={`flex items-center gap-1 font-bold text-xs transition-colors ${
                                report.is_voted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${report.is_voted ? 'fill-current' : ''}`} /> 
                              {report.votes_count || 0}
                            </button>
                            
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>

            {/* KOLOM KANAN: SIDEBAR LAPORAN TERBARU */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[650px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2563EB]" /> Laporan Terbaru
                </h3>
                <button 
                  onClick={() => setViewMode('list')}
                  className="text-xs font-bold text-[#2563EB] hover:underline bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {isLoading ? (
                   <div className="text-center text-sm text-gray-500 py-4">Memuat data...</div>
                ) : reports.length === 0 ? (
                   <div className="text-center text-sm text-gray-500 py-4">Belum ada laporan.</div>
                ) : (
                  reports.map((report) => (
                    <div key={report.id} className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                      <img 
                        src={getImageUrl(report.foto)} 
                        alt={report.judul} 
                        className="w-20 h-20 object-cover rounded-lg shrink-0 border border-gray-100"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${getStatusStyle(report.status)}`}>
                            {report.status || 'Pending'}
                          </span>
                          
                          {/* TOMBOL VOTE DI SIDEBAR */}
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleVote(report.id); }}
                            className={`flex items-center gap-1 transition-colors ${
                              report.is_voted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${report.is_voted ? 'fill-current' : ''}`} />
                            <span className="text-xs font-bold">{report.votes_count || 0}</span>
                          </button>
                          
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
                )}
              </div>
            </div>

          </div>
        </>
      ) : (
        
        /* ======================================================== */
        /* MODE 2: TAMPILAN FULL DAFTAR LAPORAN ORANG LAIN          */
        /* ======================================================== */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode('map')}
                className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 shadow-sm transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Daftar Semua Laporan</h1>
                <p className="text-gray-500 text-sm mt-0.5">Dukung laporan dari masyarakat dengan memberikan vote.</p>
              </div>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari laporan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white" 
              />
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-10 text-gray-500">Memuat laporan...</div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center py-10 text-gray-500 bg-white rounded-xl border">Tidak ada laporan yang ditemukan.</div>
            ) : (
              filteredReports.map((report) => (
                <div key={report.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <img src={getImageUrl(report.foto)} alt={report.judul} className="w-full md:w-48 h-32 object-cover rounded-xl" />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-[#2563EB]">{report.judul}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Koordinat: {report.latitude}, {report.longitude}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{report.deskripsi}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      Dilaporkan: {new Date(report.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between min-w-[120px]">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusStyle(report.status)}`}>
                      {report.status}
                    </span>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleVote(report.id); }}
                        className={`flex items-center gap-1.5 font-bold transition-colors ${
                          report.is_voted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${report.is_voted ? 'fill-current' : ''}`} />
                        <span className="text-sm">{report.votes_count || 0}</span>
                      </button>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}