import React, { useState } from "react";
import { addFunds, withdrawFunds } from "../api/upiAPI";
import { useGeneral } from "./GeneralContext"; // Fixed import path

// Rest of your Funds.js code remains exactly the same...
function Funds() {
  const { user, setUser } = useGeneral();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTransaction = async (type) => {
    if (!user || !user._id) {
      setMessage("Authentication error. Please refresh the page.");
      return;
    }

    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    if (type === "withdraw" && user.balance < amount) {
      setMessage("Insufficient balance");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = type === "add" 
        ? await addFunds(user._id, Number(amount))
        : await withdrawFunds(user._id, Number(amount));

      if (res.data.success) {
        setUser({ ...user, balance: res.data.newBalance });
        setMessage(`Funds ${type === "add" ? "added" : "withdrawn"} successfully!`);
        setAmount("");
      } else {
        setMessage(res.data.message || "Transaction failed. Try again.");
      }
    } catch (error) {
      console.error(`${type} funds error:`, error);
      
      if (error.response?.data) {
        setMessage(error.response.data.message || `Transaction failed.`);
      } else if (error.request) {
        setMessage("No response from server. Check if backend is running.");
      } else {
        setMessage("Transaction failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = () => handleTransaction("add");
  const handleWithdrawFunds = () => handleTransaction("withdraw");

  if (!user) {
    return (
      <div className="funds-container">
        <p>Loading your account information...</p>
      </div>
    );
  }

  return (
    <div className="funds-container">
      <h2>Wallet Balance: ₹{user?.balance?.toLocaleString() || 0}</h2>
      
      <div className="input-section">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          disabled={loading}
        />
      </div>
      
      <div className="button-group">
        <button 
          onClick={handleAddFunds} 
          disabled={loading || !amount || amount <= 0}
          className="btn-primary"
        >
          {loading ? "Processing..." : "Add Funds"}
        </button>
        <button 
          onClick={handleWithdrawFunds} 
          disabled={loading || !amount || amount <= 0}
          className="btn-secondary"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
      
      {message && (
        <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Funds;