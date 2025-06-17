import axios from 'axios';

const API = axios.create({
  baseURL: 'https://taskverse-cy53.onrender.com',
});

// Add token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
