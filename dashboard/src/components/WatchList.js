import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWatchlist } from '../api/dashboardAPI';

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true);
        const response = await getWatchlist(user._id);
        if (response.data.success) {
          setWatchlist(response.data.watchlist);
        }
      } catch (err) {
        setError('Failed to fetch watchlist');
        console.error('Watchlist error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  if (loading) {
    return (
      <div style={{ 
        background: '#1e293b',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #334155'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Watchlist</h3>
        <div style={{ color: '#94a3b8', textAlign: 'center' }}>Loading watchlist...</div>
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
        <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Watchlist</h3>
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
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Watchlist</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {watchlist.length > 0 ? (
          watchlist.map((stock, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              background: '#334155',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#475569'}
            onMouseLeave={(e) => e.target.style.background = '#334155'}
            >
              <div>
                <div style={{ fontWeight: 'bold', color: '#f8fafc' }}>{stock.symbol}</div>
                <div style={{ fontSize: '0.8em', color: '#94a3b8' }}>{stock.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#f8fafc' }}>₹{stock.price}</div>
                <div style={{ 
                  color: stock.change >= 0 ? '#10b981' : '#ef4444',
                  fontSize: '0.8em'
                }}>
                  {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#94a3b8',
            background: '#334155',
            borderRadius: '8px'
          }}>
            Your watchlist is empty. Add stocks to track them!
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;