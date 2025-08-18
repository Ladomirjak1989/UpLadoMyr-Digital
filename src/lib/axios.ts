import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_BACKEND_LOCALHOST_URL
      : process.env.NEXT_PUBLIC_RENDER_URL,
  withCredentials: true, // JWT у HttpOnly cookie
  // timeout: 15000,
});

export default instance;
