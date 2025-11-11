import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3002/api" });

export const addFunds = async (userId, amount) => {
  return API.post("/upi/pay", { userId, amount, type: "add" });
};

export const withdrawFunds = async (userId, amount) => {
  return API.post("/upi/pay", { userId, amount, type: "withdraw" });
};
