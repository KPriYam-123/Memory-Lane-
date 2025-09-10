import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.header 
      className="backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-200"
      style={{ 
        background: 'linear-gradient(135deg, #e6f0ff 0%, #ffffff 100%)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              📸
            </motion.span>
            <Link to="/" className="text-2xl font-bold text-blue-500 tracking-wide hover:text-blue-600 transition-colors">
              Mem-Lane
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              // Authenticated user navigation
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/Home" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/memories" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Memories
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/calendar" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Calendar
                  </Link>
                </motion.div>
                <motion.div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Welcome, {user?.userName || 'User'}!
                  </span>
                  <motion.button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </motion.div>
              </>
            ) : (
              // Non-authenticated user navigation
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/signUp" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/signin" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/about" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/team" 
                    className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
                  >
                    Team
                  </Link>
                </motion.div>
              </>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                to="/changelog" 
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
              >
                Changelog
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                to="/terms" 
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
              >
                T&C
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-500 focus:outline-none focus:text-blue-500"
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200" style={{ 
            background: 'linear-gradient(135deg, #e6f0ff 0%, #ffffff 100%)'
          }}>
            <Link 
              to="/signin" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/memories" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Memories
            </Link>
            <Link 
              to="/team" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              to="/changelog" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Changelog
            </Link>
            <Link 
              to="/terms" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header