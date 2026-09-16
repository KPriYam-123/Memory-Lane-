import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Film, 
  BookOpen, 
  Camera, 
  PenTool, 
  Mail, 
  Mic, 
  BookText, 
  Calendar, 
  Eye, 
  Sparkles 
} from 'lucide-react'

function Home() {
  const memoryTypes = [
    {
      id: 'diary',
      title: 'Upload Your Diary',
      image: '/HomePictures/HomeDiary.jpg',
      icon: BookOpen,
      description: 'Share your written thoughts and memories',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      badgeColor: 'bg-orange-100 text-orange-700',
      hoverColor: 'hover:bg-orange-100',
      linkTo: '/add-memory?type=Diary'
    },
    {
      id: 'image',
      title: 'Upload Your Image',
      image: '/HomePictures/HomePhoto.jpg',
      icon: Camera,
      description: 'Capture precious moments in pictures',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      badgeColor: 'bg-green-100 text-green-700',
      hoverColor: 'hover:bg-green-100',
      linkTo: '/add-memory?type=Photo'
    },
    {
      id: 'blog',
      title: 'Write Your Blog',
      image: '/HomePictures/HomeBlog.jpg',
      icon: PenTool,
      description: 'Document your experiences and stories',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800',
      badgeColor: 'bg-amber-100 text-amber-700',
      hoverColor: 'hover:bg-amber-100',
      linkTo: '/add-memory?type=Blog'
    },
    {
      id: 'letters',
      title: 'Upload Your Letters',
      image: '/HomePictures/HomeLetters.jpg',
      icon: Mail,
      description: 'Preserve your heartfelt correspondence',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      badgeColor: 'bg-blue-100 text-blue-700',
      hoverColor: 'hover:bg-blue-100',
      linkTo: '/add-memory?type=Letter'
    },
    {
      id: 'voice',
      title: 'Upload Your Voice',
      image: '/HomePictures/HomeVoice.jpg',
      icon: Mic,
      description: 'Record and save audio memories',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      badgeColor: 'bg-purple-100 text-purple-700',
      hoverColor: 'hover:bg-purple-100',
      linkTo: '/add-memory?type=Audio'
    },
    {
      id: 'journal',
      title: 'Upload Your Journal',
      image: '/HomePictures/Journal.jpg',
      icon: BookText,
      description: 'Share your personal reflections and insights',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800',
      badgeColor: 'bg-teal-100 text-teal-700',
      hoverColor: 'hover:bg-teal-100',
      linkTo: '/add-memory?type=Journal'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <motion.div 
        className="max-w-6xl mx-auto mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Memory Dashboard</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
          Add Your Memory
        </h1>
        <p className="text-slate-600 max-w-md mx-auto text-sm">
          Select a time capsule medium below to immortalize your treasured experiences
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Video Memory Upload - Large Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/add-memory?type=Video">
            <motion.div
              className="relative overflow-hidden rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-slate-700/30"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.78)), url('/HomePictures/HomeVideo.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex flex-col items-center justify-center h-48 text-center relative z-10">
                <motion.div
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Film className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
                  Upload Your Video Memory
                </h2>
                <p className="text-white/85 text-sm sm:text-base max-w-lg">
                  Share moving pictures, live clips, and relive dynamic moments with sound and motion
                </p>
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
          {memoryTypes.map((type, index) => {
            const IconComponent = type.icon
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Link to={type.linkTo}>
                  <motion.div
                    className={`${type.bgColor} ${type.hoverColor} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-black/5 flex flex-col h-full`}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-4 shadow-md relative">
                      <img 
                        src={type.image} 
                        alt={type.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow">
                        <IconComponent className="w-4 h-4 text-slate-700" />
                      </div>
                    </div>
                    <div className="text-center mt-auto">
                      <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        <h3 className={`font-bold text-lg ${type.textColor}`}>
                          {type.title}
                        </h3>
                      </div>
                      <p className={`text-sm ${type.textColor} opacity-80 leading-relaxed`}>
                        {type.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/memories">
              <motion.button
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Eye className="w-4 h-4" />
                <span>View All Memories</span>
              </motion.button>
            </Link>
            <Link to="/calendar">
              <motion.button
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Calendar className="w-4 h-4" />
                <span>Memory Calendar</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home