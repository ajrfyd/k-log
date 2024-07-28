import axios from 'axios';

const { VITE_ENV, VITE_API_URL } = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: VITE_ENV === 'development' ? 'http://localhost:8800' : VITE_API_URL,
  withCredentials: true
});

axios.interceptors.request.use(
  (r) => r,
  (err) => console.log(err, '>>>>>>>>>>>>')
);

axios.interceptors.response.use(
  (r) => r,
  (err) =>
    VITE_ENV === 'development' ? (console.log(err, '<<<<<,'), err) : err
);

axiosInstance.interceptors.request.use((r) => r);

axiosInstance.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err.response.data)
);
