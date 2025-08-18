import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Preserve Your Memories: Anytime, Anywhere
          </motion.h1>

          {/* Hero Image */}
          <motion.div 
            className="mb-8 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="/LandingPageImage.jpg" 
              alt="Beautiful landscape reflecting memories" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Create and share your personal
            <br />
            time capsules—filled with photos,
            <br />
            videos, music, and more.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/signup">
              <motion.button
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-colors duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage