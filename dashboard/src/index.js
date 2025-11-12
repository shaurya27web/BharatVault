import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/Apps';
import { AuthProvider } from './context/AuthContext';
import { GeneralProvider } from './components/GeneralContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </AuthProvider>
  </React.StrictMode>
);