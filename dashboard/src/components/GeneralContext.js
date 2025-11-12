import React, { createContext, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';

const GeneralContext = createContext();

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneral must be used within a GeneralProvider');
  }
  return context;
};

export const GeneralProvider = ({ children }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const [activeComponent, setActiveComponent] = useState('home');

  // Update user when auth user changes
  React.useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  const value = {
    user,
    setUser,
    activeComponent,
    setActiveComponent
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};