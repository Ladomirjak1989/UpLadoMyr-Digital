import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true, // JWT у HttpOnly cookie
  // timeout: 15000,
});

export default instance;
