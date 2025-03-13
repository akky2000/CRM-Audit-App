import { createContext, useContext, useState } from "react";

// ✅ Create Context
const UserContext = createContext();

// ✅ Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("currentUser") || null);

  // Save user to localStorage on login
  const login = (email) => {
    localStorage.setItem("currentUser", email);
    setUser(email);
  };

  // Remove user from localStorage on logout
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

// ✅ Custom Hook to Access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
