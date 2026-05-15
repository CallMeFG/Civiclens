import { Link } from 'react-router-dom';

// --- 1. KOMPONEN NAVBAR ---
const Navbar = () => {
  return (
    // Memastikan header tidak memiliki background (menyatu dengan Hero)
    <nav className="absolute top-0 left-0 w-full z-50 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
          <img src="/img/Logo.png" alt="CivicLens Logo" className="w-auto h-10" />
        </div>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li><a href="#beranda" className="hover:text-gray-200 transition">Beranda</a></li>
          <li><a href="#keunggulan" className="hover:text-gray-200 transition">Keunggulan</a></li>
          <li><a href="#fitur" className="hover:text-gray-200 transition">Fitur</a></li>
          <li><a href="#statistik" className="hover:text-gray-200 transition">Statistik</a></li>
        </ul>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {/* Tombol tanpa border radius (rounded-none) */}
          <Link to="/login" className="px-5 py-2 border-2 border-white/30 rounded-none hover:bg-white hover:text-[#2563EB] transition-colors">
            Masuk
          </Link>
          <Link to="/register" className="bg-white text-[#2563EB] px-5 py-2 rounded-none hover:bg-gray-100 transition-colors">
            Daftar
          </Link>
        </div>
        <button className="md:hidden block text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

// --- 2. KOMPONEN HERO ---
const Hero = () => {
  return (
    <section id="beranda" className="relative w-full min-h-[90vh] flex items-center pt-32 pb-40 overflow-hidden bg-gradient-to-t from-white to-transparent">
      {/* Menggunakan gambar background yang sudah ada lengkungan linear dari Figma */}
      <div className="absolute inset-0 z-0">
        <img src="/img/Background Hero.png" alt="Latar Belakang Kota" className="w-full h-full object-cover object-center" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Platform Pelaporan Masyarakat
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Bersama Membangun <br className="hidden lg:block"/> Kota yang Lebih Baik
          </h1>
          <p className="text-lg text-blue-100 max-w-lg leading-relaxed">
            Laporkan masalah di sekitar Anda, pantau perkembangannya, dan lihat perubahan nyata dari data transparan.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Hover tombol laporkan sekarang berubah menjadi biru dan text putih */}
            <Link to="/register" className="px-6 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-[#2563EB] hover:text-white transition-colors duration-300">
              Laporkan Sekarang
            </Link>
            <Link to="/dashboard" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lihat Peta Laporan
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end relative">
          <img src="/img/Mockup.png" alt="Aplikasi CivicLens" className="w-full max-w-[250px] md:max-w-[320px] lg:max-w-[280px] object-contain relative z-10" />
        </div>
      </div>
    </section>
  );
};

// --- 3. KOMPONEN KEUNGGULAN ---
const Keunggulan = () => {
  // Menggunakan nama file icon yang sudah Anda export
  const dataKeunggulan = [
    { id: 1, title: "Mudah Digunakan", icon: "/img/Icon mudah.png" },
    { id: 2, title: "Transparan & Terbuka", icon: "/img/Icon transparan.png" },
    { id: 3, title: "Data & Insight Akurat", icon: "/img/Icon data.png" },
    { id: 4, title: "Bersama untuk Perubahan", icon: "/img/Icon bersama.png" }
  ];

  return (
    <section id="keunggulan" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-5 tracking-tight">
            Kenapa Orang-Orang Suka CivicLens?
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            CivicLens menarik perhatian banyak orang karena kemampuannya dalam menyajikan informasi yang akurat dan relevan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataKeunggulan.map((item) => (
            // Tanpa shadow/efek naik. Menggunakan hover gradient dan font jadi putih.
            <div key={item.id} className="group bg-white border border-gray-200 rounded-2xl py-10 px-6 text-center hover:bg-gradient-to-b hover:from-[#2563EB] hover:to-[#10B981] transition-colors duration-300 flex flex-col items-center gap-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={item.icon} alt={`Ikon ${item.title}`} className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A8A] group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. KOMPONEN FITUR ---
const Fitur = () => {
  const dataFitur = [
    {
      id: 1, title: "Laporkan Masalah", desc: "Laporkan masalah di sekitar Anda dengan mudah.", iconColor: "text-blue-600",
      icon: <img src="/img/Icon Fitur (1).png" alt="Fitur 1" className="w-10 h-10 object-contain" />
    },
    {
      id: 2, title: "Peta Interaktif", desc: "Lihat laporan di peta secara real-time dan detail.", iconColor: "text-emerald-500",
      icon: <img src="/img/Icon Fitur (2).png" alt="Fitur 2" className="w-10 h-10 object-contain" />
    },
    {
      id: 3, title: "Data & Insight", desc: "Dapatkan insight dari data laporan untuk keputusan lebih baik", iconColor: "text-amber-500",
      icon: <img src="/img/Icon Fitur (3).png" alt="Fitur 3" className="w-10 h-10 object-contain" />
    },
    {
      id: 4, title: "Pantau Perkembangan", desc: "Pantau status laporan dari awal hingga selesai", iconColor: "text-purple-500",
      icon: <img src="/img/Icon Fitur (4).png" alt="Fitur 4" className="w-10 h-10 object-contain" />
    }
  ];

  return (
    <section id="fitur" className="relative py-24 bg-[#ffffff] overflow-hidden">
      
      {/* PERBAIKAN: Background Shape (Vector 3.png) dikembalikan menjadi inset-0 
          agar posisinya menyebar dari kiri (di belakang teks) sesuai kode rekan Anda [1] */}
      <div className="absolute inset-0 z-0">
        <img src="/img/Vector 3.png" alt="Latar Belakang Vektor" className="w-full h-full object-cover object-center" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Kolom Kiri: Teks & List Fitur */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1E3A8A] leading-snug mb-12">
            Pakai Perangkat Android atau IOS Anda untuk Mengakses Semua Fitur
          </h2>
          <div className="flex flex-col gap-8">
            {dataFitur.map((fitur) => (
              <div key={fitur.id} className="flex items-start gap-6 group">
                
                {/* Efek kotak ikon menggunakan styling orisinal dari rekan Anda */}
                <div className="w-[72px] h-[72px] shrink-0 bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <div className={fitur.iconColor}>{fitur.icon}</div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-2 tracking-tight">{fitur.title}</h3>
                  <p className="text-gray-500/90 leading-relaxed text-[17px]">{fitur.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Mockup HP Realme 10 */}
        <div className="flex justify-center relative">
          <img src="/img/Realme 10.png" alt="Mockup Aplikasi Android dan iOS" className="w-full h-auto max-w-[600px] lg:max-w-[700px] object-contain drop-shadow-2xl relative z-10" />
        </div>

      </div>
    </section>
  );
};

// --- 5. KOMPONEN STATISTIK ---
const Statistik = () => {
  // Setup konfigurasi base color dan dynamic hover color untuk teks.
  const dataStatistik = [
    {
      id: 1, angka: "1.235", label: "Total Laporan", baseColor: "bg-[#2563EB]", hoverBorder: "hover:border-[#2563EB]", hoverText: "group-hover:text-[#2563EB]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" /><path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" /></svg>
    },
    {
      id: 2, angka: "567", label: "Laporan Selesai", baseColor: "bg-[#10B981]", hoverBorder: "hover:border-[#10B981]", hoverText: "group-hover:text-[#10B981]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>
    },
    {
      id: 3, angka: "89", label: "Sedang Diproses", baseColor: "bg-[#F59E0B]", hoverBorder: "hover:border-[#F59E0B]", hoverText: "group-hover:text-[#F59E0B]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
    },
    {
      id: 4, angka: "4.321", label: "Total Vote", baseColor: "bg-[#EF4444]", hoverBorder: "hover:border-[#EF4444]", hoverText: "group-hover:text-[#EF4444]",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M11.99 21.008c-.026-.008-.052-.017-.078-.026-.201-.067-1.428-.485-3.08-1.503-1.637-1.01-3.522-2.585-4.945-4.639C2.463 12.766 1.5 10.428 1.5 7.95c0-3.327 2.673-6 6-6 1.944 0 3.784.957 4.99 2.502C13.696 2.907 15.536 1.95 17.5 1.95c3.327 0 6 2.673 6 6 0 2.478-.963 4.816-2.387 6.889-1.423 2.054-3.308 3.63-4.945 4.64-1.652 1.017-2.88 1.435-3.08 1.502a.75.75 0 0 1-.077.026.155.155 0 0 1-.02.006Z" clipRule="evenodd" /></svg>
    }
  ];

  return (
    <section id="statistik" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-5 tracking-tight">
            Insight & Perkembangan Laporan Publik
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Pantau perkembangan isu di lingkungan Anda melalui data terstruktur yang membantu memahami prioritas dan dampak laporan masyarakat.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataStatistik.map((item) => (
            // Tanpa shadow/naik. Teks menjadi berwarna saat hover.
            <div key={item.id} className={`group ${item.baseColor} text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center border-2 border-transparent hover:bg-white ${item.hoverBorder} transition-colors duration-300`}>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors duration-300">
                <div className={`text-white ${item.hoverText} transition-colors duration-300`}>
                  {item.icon}
                </div>
              </div>
              <h3 className={`text-4xl font-bold mb-2 tracking-tight ${item.hoverText} transition-colors duration-300`}>
                {item.angka}
              </h3>
              <p className={`font-medium ${item.hoverText} transition-colors duration-300`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. KOMPONEN FOOTER ---
const Footer = () => {
  return (
    // Memakai gradasi linier 
    <footer className="bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
              <img src="/img/Logo.png" alt="CivicLens Logo" className="w-auto h-10" />
            </div>
            <p className="text-blue-100 leading-relaxed text-sm">
              Platform laporan masyarakat untuk mewujudkan kota yang lebih baik melalui transparansi dan kolaborasi.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li><a href="#beranda" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#keunggulan" className="hover:text-white transition-colors">Keunggulan</a></li>
              <li><a href="#fitur" className="hover:text-white transition-colors">Fitur</a></li>
              <li><a href="#statistik" className="hover:text-white transition-colors">Statistik</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Bantuan</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat dan Ketentuan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6">Kontak</h4>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.496-4.096-7.092-6.904l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                <span>+62 812 3433 2121</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                <span>CivicLens@mail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <span className="leading-relaxed">Jl. Marpoyan Damai<br />No. 125 Pekanbaru,<br />Riau, Indonesia.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-blue-100">
          <p>&copy; {new Date().getFullYear()} CivicLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- 7. KOMPONEN UTAMA (HOME) ---
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Keunggulan />
        <Fitur />
        <Statistik />
      </main>
      <Footer />
    </div>
  );
}