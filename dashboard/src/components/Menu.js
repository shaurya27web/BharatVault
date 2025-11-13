import React from 'react';
import { useGeneral } from './GeneralContext';

const Menu = () => {
  const { activeComponent, setActiveComponent } = useGeneral();

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'funds', icon: '💰', label: 'Funds' },
    { id: 'holdings', icon: '📈', label: 'Holdings' },
    { id: 'orders', icon: '📋', label: 'Orders' },
    { id: 'positions', icon: '⚡', label: 'Positions' },
    { id: 'watchlist', icon: '👁️', label: 'Watchlist' }
  ];

  return (
    <div style={{
      width: '200px',
      background: '#1e293b',
      padding: '20px',
      borderRight: '1px solid #334155',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li 
            key={item.id}
            onClick={() => setActiveComponent(item.id)}
            style={{ 
              padding: '12px 15px', 
              cursor: 'pointer',
              borderRadius: '8px',
              marginBottom: '8px',
              color: activeComponent === item.id ? '#f8fafc' : '#94a3b8',
              background: activeComponent === item.id ? '#334155' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: activeComponent === item.id ? 'bold' : 'normal'
            }}
            onMouseEnter={(e) => {
              if (activeComponent !== item.id) {
                e.target.style.background = '#334155';
                e.target.style.color = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (activeComponent !== item.id) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#94a3b8';
              }
            }}
          >
            <span style={{ fontSize: '1.1em' }}>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;