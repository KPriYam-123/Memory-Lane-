import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Layout from './layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ChangeLog from './pages/ChangeLog.jsx'
import Tnc from './pages/Tnc.jsx'
import SignIn from './pages/SignIn.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Profile from './pages/Profile.jsx'
import Privacy from './pages/Privacy.jsx'
import Cookies from './pages/Cookies.jsx'
import Contact from './pages/Contact.jsx'
import Memories from './pages/Memories.jsx'
import AddMemory from './pages/AddMemory.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProtectedRoute, PublicRoute } from './components/RouteProtection.jsx'
import Auth0Callback from './components/Auth0Callback.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
        ),
      },
      {
        path: '/Home',
        element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        ),
      },
      {
        path: '/signup',
        element: (
            <PublicRoute>
              <SignUp />
            </PublicRoute>
        ),
      },
      {
        path: '/signin',
        element: (
            <PublicRoute>
              <SignIn />
            </PublicRoute>
        ),
      },
      {
        path: '/auth0-callback',
        element: <Auth0Callback />,
      },

      {
        path: '/memories',
        element: (
            <ProtectedRoute>
              <Memories />
            </ProtectedRoute>
        ),
      },
      {
        path: '/add-memory',
        element: (
            <ProtectedRoute>
              <AddMemory />
            </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        ),
      },
      {
        path: '/calendar',
        element: (
            <ProtectedRoute>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                <p className="text-gray-600 mt-4">Calendar feature coming soon...</p>
              </div>
            </ProtectedRoute>
        ),
      },
      // Public routes that don't need authentication
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/team',
        element: <Team />,
      },
      {
        path: '/changelog',
        element: <ChangeLog />,
      },
      {
        path: '/terms',
        element: <Tnc />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/cookies',
        element: <Cookies />,
      },
      {
        path: '/contact',
        element: <Contact />,
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Auth0Provider
          domain="dev-kv7uwnr71g71kjvp.us.auth0.com"
          clientId="XngjR6t0dFvn0IVbKtMtymAjVr4kY87G"
          authorizationParams={{
            redirect_uri: window.location.origin + "/auth0-callback"
          }}
      >
        <AuthProvider>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
        </AuthProvider>
      </Auth0Provider>
    </StrictMode>,
)