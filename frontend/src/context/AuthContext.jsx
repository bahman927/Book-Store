import React, { createContext, useState, useEffect } from "react";
import { login, logout } from "../utils/api"; // from your api.js

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // store username or null
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
    setLoading(false);
  }, []);

  // Wrapper around apiLogin
  const login = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      setUser(username);
      localStorage.setItem("username", username);
    }
    return success;
  };

  // Wrapper around apiLogout
  const logout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext