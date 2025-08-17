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
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/team',
        element: <Team/>,
      }
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
