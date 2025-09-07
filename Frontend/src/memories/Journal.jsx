import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Journal() {
  const [journalData, setJournalData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    mood: '',
    weather: '',
    location: '',
    goals: '',
    gratitude: '',
    reflection: '',
    tags: '',
    isPrivate: false,
    favorite: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setJournalData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Journal Entry:', journalData)
    alert('Journal entry saved successfully!')
  }

  const categories = ['Personal', 'Work', 'Travel', 'Health & Fitness', 'Relationships', 'Goals', 'Learning', 'Creativity', 'Spirituality', 'Other']
  const moods = ['😊 Happy', '😔 Sad', '😌 Peaceful', '😤 Frustrated', '😍 Excited', '😰 Anxious', '💭 Thoughtful', '😴 Tired', '🥰 Grateful', '😤 Angry']
  const weatherOptions = ['☀️ Sunny', '⛅ Partly Cloudy', '☁️ Cloudy', '🌧️ Rainy', '⛈️ Stormy', '❄️ Snowy', '🌫️ Foggy', '🌈 Rainbow']

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
              >
                📔
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Personal Journal</h1>
                <p className="text-teal-100 mt-2">Capture your thoughts, experiences, and personal growth</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title and Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Journal Entry Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={journalData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="What's on your mind today?"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={journalData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Category, Mood, and Weather */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={journalData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Mood
                </label>
                <select
                  id="mood"
                  name="mood"
                  value={journalData.mood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  <option value="">How are you feeling?</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-2">
                  Weather
                </label>
                <select
                  id="weather"
                  name="weather"
                  value={journalData.weather}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  <option value="">Today's weather</option>
                  {weatherOptions.map(weather => (
                    <option key={weather} value={weather}>{weather}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={journalData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Where are you writing from?"
              />
            </div>

            {/* Main Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Journal Entry *
              </label>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-3">
                <div className="flex items-start space-x-2">
                  <span className="text-teal-600">💫</span>
                  <div className="text-sm text-teal-800">
                    <p className="font-medium">Journal Writing Prompts:</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• What happened today that made you smile?</li>
                      <li>• What challenges did you face and how did you handle them?</li>
                      <li>• What are you grateful for right now?</li>
                      <li>• What did you learn about yourself today?</li>
                    </ul>
                  </div>
                </div>
              </div>
              <textarea
                id="content"
                name="content"
                value={journalData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                placeholder="Start writing your thoughts, experiences, and feelings here... Let your mind flow freely."
                style={{ lineHeight: '1.8' }}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {journalData.content.length} characters
              </div>
            </div>

            {/* Gratitude Section */}
            <div>
              <label htmlFor="gratitude" className="block text-sm font-medium text-gray-700 mb-2">
                Three Things I'm Grateful For
              </label>
              <textarea
                id="gratitude"
                name="gratitude"
                value={journalData.gratitude}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                placeholder="1. &#10;2. &#10;3. "
              />
            </div>

            {/* Goals and Reflection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                  Today's Goals/Intentions
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  value={journalData.goals}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                  placeholder="What do you want to accomplish or focus on?"
                />
              </div>
              <div>
                <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-2">
                  Evening Reflection
                </label>
                <textarea
                  id="reflection"
                  name="reflection"
                  value={journalData.reflection}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                  placeholder="How did today go? What would you do differently?"
                />
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
                value={journalData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="personal, growth, family, work, travel (comma separated)"
              />
            </div>

            {/* Settings */}
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={journalData.isPrivate}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">🔒 Keep this entry private</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="favorite"
                  checked={journalData.favorite}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">⭐ Mark as favorite</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Journal Entry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Journal