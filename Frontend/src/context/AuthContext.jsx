import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authAPI } from '../utils/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { logout: auth0Logout, isAuthenticated: auth0IsAuthenticated } = useAuth0();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // Method 1: First try to verify auth with backend (checks cookies automatically)
      try {
        const response = await authAPI.getCurrentUser();
        if (response && response.data) {
          setUser(response.data);
          setIsAuthenticated(true);
          // Update localStorage with fresh user data
          localStorage.setItem('user', JSON.stringify(response.data));
          return;
        }
      } catch (authError) {
        console.log('Cookie auth failed, checking localStorage fallback');
        
        // Method 2: Fallback to localStorage check
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            return;
          } catch (parseError) {
            console.error('Failed to parse stored user data:', parseError);
            localStorage.removeItem('user');
          }
        }
      }
      
      // If both methods fail, user is not authenticated
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Logout from your backend
      await authAPI.logout();
    } catch (error) {
      console.error('Backend logout error:', error);
    } finally {
      // Clear ALL browser storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies aggressively
      document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        // Clear for multiple domains and paths
        [
          "",
          ".auth0.com",
          ".google.com", 
          ".accounts.google.com",
          ".googleapis.com",
          window.location.hostname,
          `.${window.location.hostname}`
        ].forEach(domain => {
          ["/", "/oauth/", "/auth/"].forEach(path => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; secure; samesite=none`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}`;
          });
        });
      });
      
      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      
      // Also logout from Auth0 if user was authenticated via OAuth with federated logout
      if (auth0IsAuthenticated) {
        auth0Logout({
          logoutParams: {
            returnTo: window.location.origin + '/signin',
            federated: true // This forces logout from Google as well
          }
        });
      } else {
        // Force reload to clear any remaining session artifacts
        window.location.href = '/signin';
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
