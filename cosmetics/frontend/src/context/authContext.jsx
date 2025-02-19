import React, { createContext, useContext, useState } from 'react';

// Auth context oluşturma
const AuthContext = createContext();

// useAuth hook'u
export const useAuth = () => useContext(AuthContext);

// AuthProvider ile context değerini sağlayalım
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Başlangıçta kullanıcı giriş yapmamış

  // Kullanıcıyı giriş yapmış olarak işaretlemek için bir fonksiyon
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
