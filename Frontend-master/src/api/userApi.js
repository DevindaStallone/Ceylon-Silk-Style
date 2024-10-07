// src/api/userApi.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const registerUser = async (formData) => {
  const { data } = await API.post('/api/users/register', formData);
  return data;
};
