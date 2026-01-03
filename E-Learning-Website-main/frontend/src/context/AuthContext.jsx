import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth from LocalStorage on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setAuth(user);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setAuth(userData);
  };

  const signup = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    logoutService();
    setAuth(null);
  };

  const updateProfile = (name, bio, profilePhoto) => {
    if (auth) {
      const updated = { ...auth, name, bio, profilePhoto };
      setAuth(updated);
      localStorage.setItem('userInfo', JSON.stringify(updated));
    }
  };

  const isAuthenticated = !!auth;
  const userRole = auth?.role;

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
