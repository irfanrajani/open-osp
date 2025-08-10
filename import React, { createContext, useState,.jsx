import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // In a real app, you'd get this from your API response
    setUser({ username: userData.username });
    // You might also store a token in localStorage here
  };

  const logout = () => {
    setUser(null);
    // Also clear any stored tokens
    // And likely navigate to the login page
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
