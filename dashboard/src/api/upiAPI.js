import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3002" });

// Add funds
export const addFunds = async (userId, amount) => {
  try {
    const res = await API.post("/transaction/pay", { userId, amount, type: "add" });
    return res;
  } catch (err) {
    console.error("Add Funds API error:", err.response?.data || err.message);
    throw err;
  }
};

// Withdraw funds
export const withdrawFunds = async (userId, amount) => {
  try {
    const res = await API.post("/transaction/pay", { userId, amount, type: "withdraw" });
    return res;
  } catch (err) {
    console.error("Withdraw Funds API error:", err.response?.data || err.message);
    throw err;
  }
};
