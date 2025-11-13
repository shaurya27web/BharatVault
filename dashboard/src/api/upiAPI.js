import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:3002",
  headers: {
    'Content-Type': 'application/json',
  }
});

// Funds and Transaction APIs
export const addFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "add" });

export const withdrawFunds = (userId, amount) =>
  API.post("/transactions/pay", { userId, amount, type: "withdraw" });

export const syncUser = (userData) =>
  API.post("/user/sync", userData);

export const getUserByClerkId = (clerkId) =>
  API.get(`/user/clerk/${clerkId}`);