import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();
export function UserProvider({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
