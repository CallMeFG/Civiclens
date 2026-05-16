import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Megaphone, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../api/axios'; // Pastikan path ini benar

export default function Notifikasi() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. MENGAMBIL DATA DARI API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        setNotifications(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil notifikasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 2. FUNGSI TANDAI SEMUA DIBACA
  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.post('/notifications/mark-read');
      setNotifications(notifications.map(notif => ({ ...notif, is_read: 1 })));
    } catch (error) {
      console.error("Gagal menandai dibaca:", error);
    }
  };

  // 3. LOGIKA DESAIN IKON & WARNA BERDASARKAN STATUS
  const getNotifStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'ditolak': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' };
      case 'berhasil':
      case 'selesai': return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' };
      case 'diproses': return { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' };
      case 'info':
      default: return { icon: Megaphone, color: 'text-emerald-500', bg: 'bg-emerald-100' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  };

  // 4. FILTER TAB
  const filteredNotifs = notifications.filter(notif => 
    activeTab === 'Semua' ? true : notif.type === activeTab
  );

  return (
    <div className="space-y-6 h-full flex flex-col pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
          <p className="text-gray-500 mt-1">Pusat informasi dan pembaruan aktivitas laporan Anda.</p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          Tandai semua dibaca
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['Semua', 'Laporan Saya', 'Sistem'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
            Memeriksa notifikasi terbaru...
          </div>
        ) : filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const Style = getNotifStyle(notif.status);
            const Icon = Style.icon;

            return (
              <div 
                key={notif.id} 
                className={`bg-white rounded-2xl p-5 border shadow-sm flex items-start gap-4 transition-all duration-300 ${
                  !notif.is_read ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${Style.bg} ${Style.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                    <h3 className="font-bold text-gray-800 text-base">{notif.title}</h3>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {formatDate(notif.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {notif.desc}
                  </p>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                    {notif.type}
                  </span>
                </div>

                {!notif.is_read && (
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-3 shadow-md"></div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-gray-300 mb-3" />
            <p className="font-medium">Tidak ada notifikasi untuk saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}