import React from "react";
import Menu from "./Menu";

const TopBar = ({ user }) => {
  return (
    <div className="topbar-container" style={{
      background: '#1e293b',
      padding: '15px 20px',
      borderBottom: '1px solid #334155',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0, color: '#f8fafc' }}>BharatVault</h2>
        
        <div className="indices-container" style={{ display: 'flex', gap: '20px' }}>
          <div className="nifty" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p className="index" style={{ margin: 0, color: '#94a3b8' }}>NIFTY 50</p>
            <p className="index-points" style={{ margin: 0, color: '#f8fafc', fontWeight: 'bold' }}>21,855</p>
            <p className="percent" style={{ margin: 0, color: '#10b981' }}>+0.8%</p>
          </div>
          <div className="sensex" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p className="index" style={{ margin: 0, color: '#94a3b8' }}>SENSEX</p>
            <p className="index-points" style={{ margin: 0, color: '#f8fafc', fontWeight: 'bold' }}>72,500</p>
            <p className="percent" style={{ margin: 0, color: '#10b981' }}>+0.7%</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#f8fafc' }}>
        <span>Welcome, {user?.firstName}!</span>
        <span>Cash: ₹{user?.balance?.toLocaleString() || '0'}</span>
      </div>
    </div>
  );
};

export default TopBar;