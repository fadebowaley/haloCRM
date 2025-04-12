import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL_BASE; // Use the correct variable name

export const api = axios.create({
  baseURL:apiUrl,
  withCredentials: true,
});

