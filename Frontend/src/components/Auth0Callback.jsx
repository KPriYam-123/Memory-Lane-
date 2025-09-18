import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { apiCall } from '../utils/api.js';
import LoadingSpinner from './LoadingSpinner.jsx';

const Auth0Callback = () => {
  const { isLoading, isAuthenticated, user: auth0User } = useAuth0();
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated && auth0User) {
      handleAuth0User();
    }
  }, [isLoading, isAuthenticated, auth0User]);

  const handleAuth0User = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Extract user data from Auth0
      const userData = {
        email: auth0User.email,
        name: auth0User.name || auth0User.nickname || auth0User.email.split('@')[0],
        picture: auth0User.picture,
        provider: 'google'
      };

      console.log('Auth0 user data:', auth0User);
      console.log('Sending to backend:', userData);

      // Send to our backend to verify user and generate our own tokens
      const response = await apiCall('/oauth/login', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      console.log('Backend response:', response);

      if (response && response.success) {
        // Our backend has set the cookies and logged in the user
        // Refresh the auth context to update the user state
        await checkAuthStatus();
        
        // Redirect to home with appropriate message
        const welcomeMessage = response.data.isNewUser 
          ? `Welcome to MemoryLane, ${userData.name}!`
          : `Welcome back, ${userData.name}!`;
          
        navigate('/Home', { 
          replace: true, 
          state: { 
            message: welcomeMessage,
            type: 'success'
          }
        });
      } else {
        throw new Error('Failed to authenticate with backend');
      }
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      setError('Authentication failed. Please try again.');
      
      // Redirect to signin after error
      setTimeout(() => {
        navigate('/signin', { 
          replace: true, 
          state: { 
            message: 'Authentication failed. Please try again.',
            type: 'error'
          }
        });
      }, 3000);
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading || processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            {processing ? 'Processing your account...' : 'Authenticating...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Authentication Error</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <p className="mt-2 text-sm text-gray-500">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Auth0Callback;
