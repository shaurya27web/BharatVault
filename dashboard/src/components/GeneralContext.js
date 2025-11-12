import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "12345",
    balance: 5000,
  });

  const openBuyWindow = (uid) => {
    console.log(`Buy window opened for ${uid}`);
  };

  return (
    <GeneralContext.Provider value={{ user, setUser, openBuyWindow }}>
      {children}
    </GeneralContext.Provider>
  );
};
