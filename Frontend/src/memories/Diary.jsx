import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Diary() {
  const [diaryData, setDiaryData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: '',
    tags: '',
    weather: '',
    location: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDiaryData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Diary entry:', diaryData)
    alert('Diary entry saved successfully!')
  }

  const moods = ['😊 Happy', '😢 Sad', '😍 Excited', '😌 Peaceful', '😤 Frustrated', '🤔 Thoughtful', '😴 Tired', '😎 Confident']
  const weatherOptions = ['☀️ Sunny', '☁️ Cloudy', '🌧️ Rainy', '⛈️ Stormy', '❄️ Snowy', '🌫️ Foggy', '🌈 Rainbow']

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📔
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Diary</h1>
                <p className="text-orange-100 mt-2">Capture your thoughts and memories</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Entry Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={diaryData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="What's on your mind today?"
              />
            </div>

            {/* Date and Mood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={diaryData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <select
                  id="mood"
                  name="mood"
                  value={diaryData.mood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select your mood</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weather and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-2">
                  Weather
                </label>
                <select
                  id="weather"
                  name="weather"
                  value={diaryData.weather}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select weather</option>
                  {weatherOptions.map(weather => (
                    <option key={weather} value={weather}>{weather}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={diaryData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Where are you writing from?"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Dear Diary... *
              </label>
              <textarea
                id="content"
                name="content"
                value={diaryData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                placeholder="Share your thoughts, experiences, and feelings..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {diaryData.content.length} characters
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={diaryData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="personal, reflection, work, family (comma separated)"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Diary Entry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Diary