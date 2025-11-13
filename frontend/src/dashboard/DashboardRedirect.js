import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const DashboardRedirect = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      console.log('🔄 Frontend: Preparing to redirect to dashboard...');
      
      // Pass user data to dashboard
      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      };
      
      console.log('📦 Frontend: User data to send:', userData);
      
      // Store user data temporarily for dashboard to pick up
      localStorage.setItem('clerkUser', JSON.stringify(userData));
      console.log('✅ Frontend: User data stored in localStorage');
      
      // Add a small delay to ensure localStorage is set
      setTimeout(() => {
        console.log('🚀 Frontend: Redirecting to dashboard...');
        window.location.href = 'http://localhost:3001';
      }, 100);
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