import React from 'react';

const DoughnutChart = ({ data }) => {
  // Calculate total for percentages
  const total = data.stocks + data.mutualFunds + data.cash + data.bonds;
  
  // Calculate percentages for conic gradient
  const stocksPercent = (data.stocks / total) * 100;
  const mutualFundsPercent = stocksPercent + (data.mutualFunds / total) * 100;
  const cashPercent = mutualFundsPercent + (data.cash / total) * 100;

  return (
    <div style={{ 
      width: '120px', 
      height: '120px', 
      borderRadius: '50%',
      background: `conic-gradient(
        #3b82f6 0% ${stocksPercent}%,
        #8b5cf6 ${stocksPercent}% ${mutualFundsPercent}%,
        #06b6d4 ${mutualFundsPercent}% ${cashPercent}%,
        #f59e0b ${cashPercent}% 100%
      )`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold' }}>
          ₹{total}K
        </span>
      </div>
      
      {/* Legend */}
      <div style={{
        position: 'absolute',
        right: '-120px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Stocks ({data.stocks}%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '2px' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>MF ({data.mutualFunds}%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '2px' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Cash ({data.cash}%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '2px' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Bonds ({data.bonds}%)</span>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;