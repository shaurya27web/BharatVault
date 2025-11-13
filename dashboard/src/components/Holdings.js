import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHoldings } from '../api/dashboardAPI';

const Holdings = () => {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true);
        const response = await getHoldings(user._id);
        if (response.data.success) {
          setHoldings(response.data.holdings);
        }
      } catch (err) {
        setError('Failed to fetch holdings');
        console.error('Holdings error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [user]);

  if (loading) {
    return (
      <div style={{ 
        background: '#1e293b',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Your Holdings</h3>
        <div style={{ color: '#94a3b8', textAlign: 'center' }}>Loading holdings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: '#1e293b',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Your Holdings</h3>
        <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Your Holdings</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Stock</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Avg Price</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>LTP</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length > 0 ? (
              holdings.map((holding, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#f8fafc' }}>{holding.stockId?.symbol}</div>
                      <div style={{ fontSize: '0.8em', color: '#94a3b8' }}>{holding.stockId?.name}</div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>{holding.quantity}</td>
                  <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{holding.averagePrice}</td>
                  <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{holding.stockId?.currentPrice}</td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '12px 8px', 
                    color: holding.pnl >= 0 ? '#10b981' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {holding.pnl >= 0 ? '+' : ''}₹{Math.abs(holding.pnl).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                  No holdings found. Start investing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;