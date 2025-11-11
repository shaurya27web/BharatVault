import React, { createContext, useState } from "react";
export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: "12345", // dummy user (replace with actual auth later)
    balance: 5000,
  });

  return (
    <GeneralContext.Provider value={{ user, setUser }}>
      {children}
    </GeneralContext.Provider>
  );
};
