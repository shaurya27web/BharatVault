import React, { createContext, useState, useEffect, useContext } from 'react';
import { syncUser } from '../api/upiAPI';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for clerk user data passed from frontend
    const initializeAuth = async () => {
      try {
        const clerkUserData = localStorage.getItem('clerkUser');
        
        if (clerkUserData) {
          const userData = JSON.parse(clerkUserData);
          
          // Sync with backend
          const response = await syncUser(userData);
          
          if (response.data.success) {
            setUser(response.data.user);
            console.log("User authenticated:", response.data.user.email);
          } else {
            console.error('Failed to sync user:', response.data.message);
            // Redirect to login if sync fails
            window.location.href = 'http://localhost:3000'; // Frontend URL
          }
          
          // Clear temporary storage
          localStorage.removeItem('clerkUser');
        } else {
          // No user data found, redirect to login
          console.log('No user data found, redirecting to login...');
          window.location.href = 'http://localhost:3000';
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        window.location.href = 'http://localhost:3000';
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setUser(null);
    // Redirect to frontend for proper logout
    window.location.href = 'http://localhost:3000';
  };

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};