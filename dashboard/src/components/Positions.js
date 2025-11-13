import React from 'react';

const Positions = () => {
  const positions = [
    { symbol: 'RELIANCE', quantity: 10, buyPrice: 2450, currentPrice: 2580, pnl: '+13,000' },
    { symbol: 'TCS', quantity: 5, buyPrice: 3200, currentPrice: 3350, pnl: '+750' },
    { symbol: 'INFY', quantity: 8, buyPrice: 1500, currentPrice: 1620, pnl: '+960' }
  ];

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Open Positions</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Stock</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Buy Avg</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>LTP</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px 8px', color: '#f8fafc', fontWeight: 'bold' }}>{position.symbol}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>{position.quantity}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{position.buyPrice}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{position.currentPrice}</td>
                <td style={{ 
                  textAlign: 'right', 
                  padding: '12px 8px', 
                  color: position.pnl.includes('+') ? '#10b981' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {position.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;