import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Letters() {
  const [letterData, setLetterData] = useState({
    title: '',
    recipient: '',
    sender: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    letterType: '',
    mood: '',
    tags: '',
    attachments: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLetterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setLetterData(prev => ({
      ...prev,
      attachments: e.target.files[0]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Letter:', letterData)
    alert('Letter saved successfully!')
  }

  const letterTypes = ['Love Letter', 'Thank You Note', 'Apology Letter', 'Congratulations', 'Personal Letter', 'Invitation', 'Family Letter', 'Other']
  const moods = ['💕 Loving', '🙏 Grateful', '😊 Happy', '😢 Emotional', '🎉 Celebratory', '💭 Thoughtful', '📝 Formal', '🤗 Friendly']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                💌
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Write a Letter</h1>
                <p className="text-blue-100 mt-2">Preserve your heartfelt correspondence</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Letter Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={letterData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Give your letter a meaningful title"
              />
            </div>

            {/* Recipient and Sender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
                  To (Recipient) *
                </label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={letterData.recipient}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Who is this letter for?"
                />
              </div>
              <div>
                <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">
                  From (Sender)
                </label>
                <input
                  type="text"
                  id="sender"
                  name="sender"
                  value={letterData.sender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>
            </div>

            {/* Date and Letter Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={letterData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="letterType" className="block text-sm font-medium text-gray-700 mb-2">
                  Letter Type
                </label>
                <select
                  id="letterType"
                  name="letterType"
                  value={letterData.letterType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select letter type</option>
                  {letterTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mood */}
            <div>
              <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                Mood/Tone
              </label>
              <select
                id="mood"
                name="mood"
                value={letterData.mood}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select mood</option>
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>

            {/* Letter Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Dear {letterData.recipient || '[Recipient]'}... *
              </label>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
                <div className="flex items-start space-x-2">
                  <span className="text-amber-600">💡</span>
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Letter Writing Tips:</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• Start with a warm greeting</li>
                      <li>• Share your thoughts and feelings openly</li>
                      <li>• Include specific memories or details</li>
                      <li>• End with love, gratitude, or best wishes</li>
                    </ul>
                  </div>
                </div>
              </div>
              <textarea
                id="content"
                name="content"
                value={letterData.content}
                onChange={handleInputChange}
                required
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none font-serif"
                placeholder={`Dear ${letterData.recipient || '[Recipient]'},\n\nI hope this letter finds you well...\n\n\nWith love,\n${letterData.sender || '[Your name]'}`}
                style={{ lineHeight: '1.8' }}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {letterData.content.length} characters
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Photos, Documents)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />
                <label htmlFor="attachments" className="cursor-pointer">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 000 2.828l6.414 6.586a2 2 0 002.828 0l6.586-6.586a2 2 0 000-2.828L17.828 7a2 2 0 00-2.656 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m-8 4h6" />
                    </svg>
                    <p className="text-lg">Click to attach files</p>
                    <p className="text-sm">Photos, PDFs, Documents</p>
                  </div>
                </label>
              </div>
              {letterData.attachments && (
                <p className="mt-2 text-sm text-gray-600">
                  Attached: {letterData.attachments.name}
                </p>
              )}
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
                value={letterData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="love, family, friend, gratitude (comma separated)"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Letter
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Letters
