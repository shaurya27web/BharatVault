import React from 'react';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import './Apps.css';

function Apps() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Dashboard...</h2>
        <p>Please wait while we load your trading account.</p>
      </div>
    );
  }

  return (
    <div className="apps">
      <Dashboard />
    </div>
  );
}

export default Apps;