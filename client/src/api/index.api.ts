import axios, { AxiosHeaders } from 'axios';
import { useCurrentUserStore } from '../store/currentUserSlice';

export const api = axios.create({
  baseURL: 'http://localhost:5300/api/v1',
});

api.interceptors.request.use((config) => {
  const token = useCurrentUserStore.getState().token;
  console.log(token);
  if (token) {
    const headers = new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
    console.log(config.headers);
  }
  return config;
});
