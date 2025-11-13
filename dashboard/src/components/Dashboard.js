import React from 'react';
import { useAuth } from '../context/AuthContext';
import Funds from './Funds';
import Holdings from './Holdings';
import Orders from './Orders';
import Positions from './Positions';
import Summary from './Summary';
import WatchList from './WatchList';
import TopBar from './TopBar';
import Menu from './Menu';
import DoughnutChart from './DoughnoutChart';

function Dashboard() {
  const { user, loading, backendError } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Loading Dashboard...</h2>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Authentication Required</h1>
        <p>Please log in through the main website to access the dashboard.</p>
        <button onClick={() => window.location.href = 'http://localhost:3000'}>
          Go to Main Website
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ 
      minHeight: '100vh', 
      background: '#0f172a',
      color: 'white'
    }}>
      <TopBar user={user} />
      
      <div style={{ display: 'flex' }}>
        {/* Left Sidebar - Menu */}
        <Menu />
        
        {/* Main Content Area */}
        <div style={{ 
          flex: 1, 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {backendError && (
            <div style={{ 
              background: '#fef3c7', 
              color: '#92400e',
              padding: '10px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              ⚠️ Backend connection issue. Using demo data. Some features may not work.
            </div>
          )}
          
          {/* Top Row - Summary and Funds */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 2, minWidth: '300px' }}>
              <Summary user={user} />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <Funds />
            </div>
          </div>
          
          {/* Middle Row - Watchlist and Holdings */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <WatchList />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <Holdings />
            </div>
          </div>
          
          {/* Bottom Row - Orders and Positions */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <Orders />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <Positions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;