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
    const initializeAuth = async () => {
      try {
        console.log('🔍 Checking localStorage for clerkUser...');
        const clerkUserData = localStorage.getItem('clerkUser');
        console.log('🔍 clerkUserData from localStorage:', clerkUserData);
        
        if (clerkUserData) {
          const userData = JSON.parse(clerkUserData);
          console.log('✅ Found user data:', userData);
          
          // Sync with backend
          console.log('🔄 Syncing user with backend...');
          const response = await syncUser(userData);
          console.log('🔍 Backend sync response:', response);
          
          if (response.data.success) {
            setUser(response.data.user);
            console.log("✅ User authenticated:", response.data.user.email);
          } else {
            console.error('❌ Failed to sync user:', response.data.message);
          }
        } else {
          console.log('❌ No user data found in localStorage');
          console.log('🔍 All localStorage items:', { ...localStorage });
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};