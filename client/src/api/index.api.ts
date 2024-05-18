import axios, { AxiosHeaders } from 'axios';
import { useCurrentUserStore } from '../store/currentUserSlice';

export const api = axios.create({
  baseURL: 'http://localhost:5300/api/v1',
});

// get signature for authenticated upload
export const getSignature = async (folder: string) => {
  const res = await axios.post('/get_signature', {
    folder,
  });

  return res.data;
};

// upload img to cloudinary
export const uploadImg = async (data: FormData) => {
  const res = await api.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_MONGO_CLOUD_NAME
    }/image/upload`,
    data
  );
  return res.data;
};

api.interceptors.request.use((config) => {
  const token = useCurrentUserStore.getState().token;
  if (token) {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
    console.log(config.headers);
  }
  return config;
});
