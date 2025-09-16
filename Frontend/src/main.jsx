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
import Diary from './memories/Diary.jsx'
import Blog from './memories/Blog.jsx'
import Voice from './memories/Voice.jsx'
import Letters from './memories/Letters.jsx'
import Image from './memories/Image.jsx'
import Video from './memories/Video.jsx'
import Journal from './memories/Journal.jsx'
import Memories from './pages/Memories.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProtectedRoute, PublicRoute } from './components/RouteProtection.jsx'

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
        path: '/google/callback',
        element: (
          <ProtectedRoute>
            <GoogleAuth />
          </ProtectedRoute>
        ),
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
      {
        path: '/Home/diary',
        element: (
          <ProtectedRoute>
            <Diary />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/blog',
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/voice',
        element: (
          <ProtectedRoute>
            <Voice />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/letters',
        element: (
          <ProtectedRoute>
            <Letters />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/image',
        element: (
          <ProtectedRoute>
            <Image />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/video',
        element: (
          <ProtectedRoute>
            <Video />
          </ProtectedRoute>
        ),
      },
      {
        path: '/Home/journal',
        element: (
          <ProtectedRoute>
            <Journal />
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
      redirect_uri: window.location.origin
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
