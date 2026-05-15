import axios from 'axios';

// Membuat instance axios dengan URL dasar backend Laravel Anda
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor untuk secara otomatis menyisipkan Token di setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);export default axiosInstance;
