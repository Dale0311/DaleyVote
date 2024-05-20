import axios, { AxiosHeaders } from 'axios';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { Candidate } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:5300/api/v1',
});

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

export const uploadImg = async (candidates: Candidate[]) => {
  const res = await api.post('/room/upload-candidates-image', candidates);
  return res.data;
};
