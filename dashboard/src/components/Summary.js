import React from 'react';

const Summary = ({ user }) => {
  const portfolioData = {
    stocks: 45,
    mutualFunds: 30,
    cash: 15,
    bonds: 10
  };

  const totalValue = 189000; // Example total portfolio value

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#f8fafc' }}>Portfolio Summary</h3>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Portfolio Allocation */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h4 style={{ color: '#94a3b8', margin: '0 0 15px 0', fontSize: '14px' }}>Portfolio Allocation</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Stocks', value: portfolioData.stocks, color: '#3b82f6' },
              { label: 'Mutual Funds', value: portfolioData.mutualFunds, color: '#8b5cf6' },
              { label: 'Cash', value: portfolioData.cash, color: '#06b6d4' },
              { label: 'Bonds', value: portfolioData.bonds, color: '#f59e0b' }
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: item.color, 
                  borderRadius: '2px' 
                }}></div>
                <span style={{ color: '#94a3b8', fontSize: '14px', flex: 1 }}>{item.label}</span>
                <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Financial Metrics */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h4 style={{ color: '#94a3b8', margin: '0 0 15px 0', fontSize: '14px' }}>Financial Metrics</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Total Value:</span>
              <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>₹{totalValue.toLocaleString()}</span>
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