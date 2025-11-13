import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:3002",
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request:', config.method?.toUpperCase(), config.url);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Holdings APIs
export const getHoldings = (userId) =>
  API.get(`/holdings/user/${userId}`);

export const addHolding = (holdingData) =>
  API.post("/holdings", holdingData);

// Orders APIs
export const getOrders = (userId) =>
  API.get(`/orders/user/${userId}`);

export const placeOrder = (orderData) =>
  API.post("/orders", orderData);

// Watchlist APIs
export const getWatchlist = (userId) =>
  API.get(`/watchlist/user/${userId}`);

export const addToWatchlist = (watchlistData) =>
  API.post("/watchlist", watchlistData);

export const removeFromWatchlist = (watchlistData) =>
  API.delete("/watchlist", { data: watchlistData });

// Positions APIs (same as holdings for now)
export const getPositions = (userId) =>
  API.get(`/holdings/user/${userId}`);

// Summary APIs
export const getPortfolioSummary = (userId) =>
  API.get(`/holdings/summary/${userId}`);

// User APIs
export const getUserDetails = (userId) =>
  API.get(`/user/${userId}`);

export const updateUserBalance = (userId, balanceData) =>
  API.patch(`/user/${userId}/balance`, balanceData);

// Transaction APIs (from upiAPI.js - you might want to merge these)
export const addFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "add" });

export const withdrawFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "withdraw" });

export const syncUser = (userData) =>
  API.post("/user/sync", userData);

export const getUserByClerkId = (clerkId) =>
  API.get(`/user/clerk/${clerkId}`);