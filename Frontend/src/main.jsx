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
import AddMemory from './pages/AddMemory.jsx'
import Memories from './pages/Memories.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
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
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/team',
        element: <Team/>,
      },
      {
        path: '/add-memory',
        element: <AddMemory />,
      },
      {
        path: '/memories',
        element: <Memories />,
      },
      {
        path: '/calendar',
        element: <div className="p-8"><h1 className="text-3xl font-bold text-gray-900">Calendar</h1><p className="text-gray-600 mt-4">Calendar feature coming soon...</p></div>,
      }
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)
