import React from 'react';

const Holdings = () => {
  const holdings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 10, avgPrice: 2450, ltp: 2580, pnl: '+13,000' },
    { symbol: 'TCS', name: 'Tata Consultancy', quantity: 5, avgPrice: 3200, ltp: 3350, pnl: '+750' },
    { symbol: 'INFY', name: 'Infosys', quantity: 8, avgPrice: 1500, ltp: 1620, pnl: '+960' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', quantity: 12, avgPrice: 1400, ltp: 1520, pnl: '+1,440' }
  ];

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
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>LTP</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px 8px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#f8fafc' }}>{holding.symbol}</div>
                    <div style={{ fontSize: '0.8em', color: '#94a3b8' }}>{holding.name}</div>
                  </div>
                </td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>{holding.quantity}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{holding.ltp}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#10b981' }}>{holding.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;