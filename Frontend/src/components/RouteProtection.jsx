import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

// Component for protecting routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // If not authenticated, redirect to sign in with the current location
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

// Component for public routes that should redirect authenticated users
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingSpinner message="Loading Memory Lane..." />;
  }

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  // If not authenticated, render the public component
  return children;
};

export { ProtectedRoute, PublicRoute };