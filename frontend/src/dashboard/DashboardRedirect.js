import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const DashboardRedirect = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Pass user data to dashboard
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      };
      
      // Store user data temporarily for dashboard to pick up
      localStorage.setItem('clerkUser', JSON.stringify(userData));
      
      // Redirect to dashboard
      window.location.href = 'http://localhost:3001';
    }
  }, [isLoaded, user]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      flexDirection: 'column'
    }}>
      <h2>🎉 Welcome to BharatVault!</h2>
      <p>Redirecting to your trading dashboard...</p>
    </div>
  );
};

export default DashboardRedirect;