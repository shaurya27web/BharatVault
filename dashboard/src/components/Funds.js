import React, { useState, useContext } from "react";
import { addFunds, withdrawFunds } from "../api/upiAPI";
import { GeneralContext } from "./GeneralContext";

function Funds() {
  const { user, setUser } = useContext(GeneralContext);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddFunds = async () => {
    setLoading(true);
    try {
      const res = await addFunds(user._id, Number(amount));
      if (res.status === 200) {
        setUser({ ...user, balance: user.balance + Number(amount) });
        setMessage("Funds added successfully!");
      } else {
        setMessage("Transaction failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Transaction failed. Try again.");
    }
    setLoading(false);
  };

  const handleWithdrawFunds = async () => {
    if (user.balance < amount) {
      setMessage("Insufficient balance");
      return;
    }

    setLoading(true);
    try {
      const res = await withdrawFunds(user._id, Number(amount));
      if (res.status === 200) {
        setUser({ ...user, balance: user.balance - Number(amount) });
        setMessage("Funds withdrawn successfully!");
      } else {
        setMessage("Transaction failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Transaction failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="funds-container">
      <h2>Wallet Balance: ₹{user?.balance || 0}</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={handleAddFunds} disabled={loading}>
          {loading ? "Processing..." : "Add Funds"}
        </button>
        <button onClick={handleWithdrawFunds} disabled={loading}>
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Funds;
