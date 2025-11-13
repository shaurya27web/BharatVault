import React, { useState } from "react";
import { addFunds, withdrawFunds } from "../api/upiAPI";
import { useGeneral } from "./GeneralContext";

function Funds() {
  const { user, setUser } = useGeneral();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("add"); // "add" or "withdraw"

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

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  if (!user) {
    return (
      <div style={{ 
        background: '#1e293b',
        padding: '30px',
        borderRadius: '16px',
        border: '1px solid #334155',
        textAlign: 'center'
      }}>
        <p style={{ color: '#94a3b8' }}>Loading your account information...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      border: '1px solid #334155',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '8px'
        }}>
          ₹{user?.balance?.toLocaleString() || '0'}
        </div>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Available Balance</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex',
        background: '#334155',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '25px'
      }}>
        <button
          onClick={() => setActiveTab("add")}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            background: activeTab === "add" 
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
              : 'transparent',
            color: activeTab === "add" ? '#ffffff' : '#94a3b8',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          💰 Add Funds
        </button>
        <button
          onClick={() => setActiveTab("withdraw")}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            background: activeTab === "withdraw" 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
              : 'transparent',
            color: activeTab === "withdraw" ? '#ffffff' : '#94a3b8',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          🏧 Withdraw
        </button>
      </div>

      {/* Amount Input Section */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ 
          display: 'block', 
          color: '#f8fafc', 
          marginBottom: '12px',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          Enter Amount (₹)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px 20px',
              background: '#0f172a',
              border: '2px solid #334155',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '18px',
              fontWeight: '600',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          <span style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            fontWeight: '600'
          }}>
            INR
          </span>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div style={{ marginBottom: '25px' }}>
        <p style={{ color: '#94a3b8', marginBottom: '12px', fontSize: '14px' }}>
          Quick Amounts
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              style={{
                padding: '10px 16px',
                background: '#334155',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: '1',
                minWidth: '60px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#475569'}
              onMouseLeave={(e) => e.target.style.background = '#334155'}
            >
              ₹{quickAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={activeTab === "add" ? handleAddFunds : handleWithdrawFunds}
        disabled={loading || !amount || amount <= 0}
        style={{
          width: '100%',
          padding: '16px',
          background: activeTab === "add" 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          cursor: loading || !amount || amount <= 0 ? 'not-allowed' : 'pointer',
          opacity: loading || !amount || amount <= 0 ? 0.6 : 1,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          if (!loading && amount && amount > 0) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && amount && amount > 0) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        {loading ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Processing...
          </>
        ) : (
          <>
            {activeTab === "add" ? '💳' : '🏧'}
            {activeTab === "add" ? 'Add Funds' : 'Withdraw Funds'}
          </>
        )}
      </button>

      {/* Message Display */}
      {message && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: message.includes('successfully') 
            ? 'linear-gradient(135deg, #10b98115 0%, #05966915 100%)'
            : 'linear-gradient(135deg, #ef444415 0%, #dc262615 100%)',
          border: `1px solid ${message.includes('successfully') ? '#10b981' : '#ef4444'}`,
          borderRadius: '12px',
          color: message.includes('successfully') ? '#10b981' : '#ef4444',
          fontWeight: '600',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      {/* Security Note */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: '#334155',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '12px', 
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          🔒 Secure & Encrypted Transactions
        </p>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Funds;