import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:3002/transactions", // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.data);
    return response;
  },
  (error) => {
    console.log('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const addFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "add" });

export const withdrawFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "withdraw" });

export const syncUser = (userData) =>
  API.post("/users/sync", userData);

export const getUserByClerkId = (clerkId) =>
  API.get(`/users/clerk/${clerkId}`);