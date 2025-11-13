import React from 'react';
import DoughnutChart from './DoughnutChart';

const Summary = ({ user }) => {
  const portfolioData = {
    stocks: 45,
    mutualFunds: 30,
    cash: 15,
    bonds: 10
  };

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Portfolio Summary</h3>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <DoughnutChart data={portfolioData} />
        </div>
        
        <div style={{ flex: 2, minWidth: '200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Total Value:</span>
              <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>₹{user.balance?.toLocaleString() || '0'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Today's P&L:</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>+₹2,450 (+1.2%)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Total Return:</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>+₹12,840 (+6.8%)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Available Cash:</span>
              <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>₹{user.balance?.toLocaleString() || '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;