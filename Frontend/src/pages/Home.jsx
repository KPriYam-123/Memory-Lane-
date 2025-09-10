import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


function Home() {
  const memoryTypes = [
    {
      id: 'diary',
      title: 'Upload Your Diary',
      image: '/HomePictures/HomeDiary.jpg',
      description: 'Share your written thoughts and memories',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      hoverColor: 'hover:bg-orange-100',
      linkTo: '/Home/diary'
    },
    {
      id: 'image',
      title: 'Upload Your Image',
      image: '/HomePictures/HomeLetters.jpg', // Using letters image for images
      description: 'Capture precious moments in pictures',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      hoverColor: 'hover:bg-green-100',
      linkTo: '/Home/image'
    },
    {
      id: 'blog',
      title: 'Write Your Blog',
      image: '/HomePictures/HomeDiary.jpg', // Using diary image for blog
      description: 'Document your experiences and stories',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800',
      hoverColor: 'hover:bg-amber-100',
      linkTo: '/Home/blog'
    },
    {
      id: 'letters',
      title: 'Upload Your Letters',
      image: '/HomePictures/HomeLetters.jpg',
      description: 'Preserve your heartfelt correspondence',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      hoverColor: 'hover:bg-blue-100',
      linkTo: '/Home/letters'
    },
    {
      id: 'voice',
      title: 'Upload Your Voice',
      image: '/HomePictures/HomeVoice.jpg',
      description: 'Record and save audio memories',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      hoverColor: 'hover:bg-purple-100',
      linkTo: '/Home/voice'
    },
    {
      id: 'journal',
      title: 'Upload Your Journal',
      image: '/HomePictures/Journal.webp',
      description: 'Share your personal reflections and insights',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800',
      hoverColor: 'hover:bg-teal-100',
      linkTo: '/Home/journal'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      
      
      {/* Header */}
      <motion.div 
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Add Your Memory
        </h1>
        <div className="flex items-center justify-center space-x-2 text-slate-600">
          <span className="text-sm">Dashboard:</span>
          <div className="h-1 w-16 bg-slate-300 rounded"></div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Video Memory Upload - Large Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/Home/video">
            <motion.div
              className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <motion.div
                  className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/40 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 4a2 2 0 002 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14z" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload Your Video Memory</h2>
                <p className="text-white/80">Share your video memories and relive precious moments</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Memory Types Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {memoryTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Link to={type.linkTo}>
                <motion.div
                  className={`${type.bgColor} ${type.hoverColor} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 shadow-md">
                    <img 
                      src={type.image} 
                      alt={type.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className={`font-bold text-lg ${type.textColor} mb-2`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm ${type.textColor} opacity-75`}>
                      {type.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Home">
              <motion.button
                className="px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Memories
              </motion.button>
            </Link>
            <Link to="/calendar">
              <motion.button
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Memory Calendar
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home