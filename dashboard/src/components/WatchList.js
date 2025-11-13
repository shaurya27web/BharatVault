import React from 'react';

const WatchList = () => {
  const watchlist = [
    { symbol: 'RELIANCE', price: 2580, change: '+1.5%' },
    { symbol: 'TCS', price: 3350, change: '+0.8%' },
    { symbol: 'INFY', price: 1620, change: '+2.1%' },
    { symbol: 'HDFCBANK', price: 1520, change: '-0.3%' },
    { symbol: 'BAJFINANCE', price: 6450, change: '+1.2%' }
  ];

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Watchlist</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {watchlist.map((stock, index) => (
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
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#f8fafc' }}>₹{stock.price}</div>
              <div style={{ 
                color: stock.change.includes('+') ? '#10b981' : '#ef4444',
                fontSize: '0.8em'
              }}>
                {stock.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;