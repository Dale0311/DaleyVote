import axios from 'axios';
import { CurrentUser } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:5300/api/v1',
});

