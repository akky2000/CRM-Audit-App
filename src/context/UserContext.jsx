import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserData } from "../api";

// Helper to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getCookie("state"));

  const login = async () => {
    const tokenFromCookie = getCookie("state");
    setToken(tokenFromCookie);

    if (tokenFromCookie) {
      try {
        const userData = await fetchUserData(tokenFromCookie);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      }
    }
  };

  const logout = () => {
    document.cookie = "state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token)
        .then((userData) => setUser(userData))
        .catch((error) => {
          console.error("Failed to fetch user data on load:", error);
          setUser(null);
        });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
