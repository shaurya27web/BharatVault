
import axios from "axios";
const API = axios.create({ 
  baseURL: "http://localhost:3002",
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to log requests
API.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request:', config.method?.toUpperCase(), config.url);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
API.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.data);
    return response;
  },
  (error) => {
    console.log('❌ API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const addFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "add" });

export const withdrawFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "withdraw" });

export const syncUser = (userData) =>
  API.post("/user/sync", userData);

export const getUserByClerkId = (clerkId) =>
  API.get(`/user/clerk/${clerkId}`);