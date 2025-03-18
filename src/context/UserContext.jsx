import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("currentUser") || null);

  const login = (email) => {
    localStorage.setItem("currentUser", email);
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
