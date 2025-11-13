import React from 'react';

const DoughnutChart = ({ data }) => {
  return (
    <div style={{ 
      width: '120px', 
      height: '120px', 
      borderRadius: '50%',
      background: 'conic-gradient(#3b82f6 0% 45%, #8b5cf6 45% 75%, #06b6d4 75% 90%, #f59e0b 90% 100%)',
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
        <span style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold' }}>₹{(data.stocks + data.mutualFunds + data.cash + data.bonds)}K</span>
      </div>
    </div>
  );
};

export default DoughnutChart;