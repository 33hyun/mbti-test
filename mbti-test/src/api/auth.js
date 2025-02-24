import axios from "axios";

const API_URL = "http://localhost:5001/auth";

export const signup = async (userData) => axios.post(`${API_URL}/signup`, userData);
export const login = async (userData) => axios.post(`${API_URL}/login`, userData);
export const getProfile = async (token) =>
  axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });