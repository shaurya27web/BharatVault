import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3002" });

export const getHoldings = () => API.get("/holdings");
