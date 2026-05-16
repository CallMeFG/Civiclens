import { useState, useEffect } from 'react';
import { Search, Heart, ChevronRight, ChevronLeft, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import axiosInstance from '../api/axios';

export default function LaporanSaya() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. MENGAMBIL DATA DARI BACKEND LARAVEL
  useEffect(() => {
    const fetchLaporan = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get('/reports/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                setReports(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data laporan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchLaporan();
}, []);

  // 2. LOGIKA KARTU STATISTIK ATAS
  const totalLaporan = reports.length;
  const sedangDiproses = reports.filter(r => r.status?.toLowerCase() === 'pending' || r.status?.toLowerCase() === 'diproses').length;
  const selesai = reports.filter(r => r.status?.toLowerCase() === 'selesai').length;
  const ditolak = reports.filter(r => r.status?.toLowerCase() === 'ditolak').length;

  // 3. LOGIKA FILTER & PENCARIAN
  const filteredReports = reports.filter(report => {
    const titleMatch = report.judul?.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = report.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase());
    const isSearchMatch = titleMatch || descMatch;
    
    const isStatusMatch = statusFilter === 'Semua Status' || report.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return isSearchMatch && isStatusMatch;
  });

  // 4. KONSEP PAGINASI YANG SEBENARNYA
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 5. FUNGSI PEMBANTU UI
  const formatDate = (dateString) => {
    if (!dateString) return 'Waktu tidak diketahui';
    const date = new Date(dateString);
    return `Dilaporkan ${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'urgent': 
      case 'ditolak':
        return 'bg-red-100 text-red-600';
      case 'pending':
      case 'diproses':
        return 'bg-orange-100 text-orange-600';
      case 'selesai':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Fungsi baru untuk menangani filter status
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };
  const handleVote = async (reportId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Silakan login terlebih dahulu untuk memberikan dukungan.');
            return;
        }

        await axiosInstance.post(`/reports/${reportId}/vote`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Gagal memberikan vote", error);
    }
  };
  return (
    <div className="space-y-6 pb-10">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Laporan Saya</h1>
        <p className="text-gray-500 mt-1">Kelola dan pantau semua laporan yang Anda buat.</p>
      </div>

      {/* 4 KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{totalLaporan}</h3>
            <p className="text-sm text-gray-500 font-medium">Total laporan</p>
          </div>
        </div>

        <div className="bg-[#f97316] rounded-2xl p-6 shadow-md flex items-center gap-4 text-white">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{sedangDiproses}</h3>
            <p className="text-sm text-white/90 font-medium">Sedang diproses</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{selesai}</h3>
            <p className="text-sm text-gray-500 font-medium">Selesai</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <XCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{ditolak}</h3>
            <p className="text-sm text-gray-500 font-medium">Ditolak</p>
          </div>
        </div>
      </div>

      {/* FILTER & PENCARIAN */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
        <h2 className="text-lg font-bold text-gray-800 w-full md:w-auto">Daftar Laporan Anda</h2>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari laporan..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary cursor-pointer text-gray-600 font-medium"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* DAFTAR LAPORAN */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
            Mencari riwayat laporan Anda...
          </div>
        ) : currentItems.length > 0 ? (
          currentItems.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              
              {/* Gambar Landscape */}
              <div className="w-full md:w-75 h-48 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={report.foto ? `http://localhost:8000/storage/${report.foto}` : 'https://via.placeholder.com/300x200?text=Tidak+Ada+Foto'}
                  alt={report.judul}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Error' }}
                />
              </div>

              {/* Konten Teks Laporan */}
              <div className="flex-1 flex flex-col py-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-[#1E3A8A]">{report.judul}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(report.status || 'Pending')}`}>
                    {report.status || 'Pending'}
                  </span>
                </div>

                <p className="text-sm text-gray-500 font-medium mb-3">
                  {report.alamat || `${parseFloat(report.latitude).toFixed(4)}, ${parseFloat(report.longitude).toFixed(4)}`}
                </p>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {report.deskripsi}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-50">
                  <span className="font-medium">{formatDate(report.created_at)}</span>
                  
                  <div className="flex items-center gap-5">
                    <div 
                      onClick={() => handleVote(report.id)}
                      className="flex items-center gap-1.5 hover:text-red-500 cursor-pointer transition-colors group"
                    >
                      <Heart className="w-4 h-4 group-hover:fill-red-500" />
                      <span className="font-medium">{report.votes_count || 0}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 flex flex-col items-center justify-center">
            <FileText className="w-10 h-10 text-gray-300 mb-3" />
            <p className="font-medium">Belum ada laporan ditemukan.</p>
          </div>
        )}
      </div>

      {/* PAGINASI INTERAKTIF */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
              currentPage === 1 
                ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button 
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold shadow-sm transition-all ${
                  currentPage === pageNumber
                    ? 'bg-primary text-white' 
                    : 'border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
              currentPage === totalPages 
                ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary cursor-pointer'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}