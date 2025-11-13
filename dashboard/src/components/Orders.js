import React from 'react';

const Orders = () => {
  const orders = [
    { symbol: 'RELIANCE', type: 'BUY', quantity: 5, price: 2560, status: 'Completed' },
    { symbol: 'TCS', type: 'SELL', quantity: 2, price: 3340, status: 'Pending' },
    { symbol: 'INFY', type: 'BUY', quantity: 10, price: 1600, status: 'Completed' }
  ];

  return (
    <div style={{ 
      background: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #334155'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>Recent Orders</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Stock</th>
              <th style={{ textAlign: 'center', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Type</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Price</th>
              <th style={{ textAlign: 'center', padding: '8px', color: '#94a3b8', fontWeight: 'normal' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '12px 8px', color: '#f8fafc', fontWeight: 'bold' }}>{order.symbol}</td>
                <td style={{ 
                  textAlign: 'center', 
                  padding: '12px 8px', 
                  color: order.type === 'BUY' ? '#10b981' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {order.type}
                </td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>{order.quantity}</td>
                <td style={{ textAlign: 'right', padding: '12px 8px', color: '#f8fafc' }}>₹{order.price}</td>
                <td style={{ 
                  textAlign: 'center', 
                  padding: '12px 8px', 
                  color: order.status === 'Completed' ? '#10b981' : '#f59e0b'
                }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;