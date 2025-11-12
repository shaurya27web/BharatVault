import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useUser();

  const handleDashboardClick = () => {
    if (user) {
      // Store user data for dashboard to use
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      };
      localStorage.setItem('clerkUser', JSON.stringify(userData));
      
      // Redirect to the actual dashboard application
      window.location.href = 'http://localhost:3001';
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">BharatVault</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        <SignedIn>
          {/* Show Dashboard button that opens the actual dashboard app */}
          <button 
            onClick={handleDashboardClick}
            className="dashboard-link" 
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #0ca678 100%)', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            🚀 Go to Dashboard
          </button>
          <UserButton />
        </SignedIn>
        
        <SignedOut>
          {/* Show sign in/up buttons when signed out */}
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;