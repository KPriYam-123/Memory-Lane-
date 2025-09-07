import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function Video() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    category: '',
    tags: '',
    videos: [],
    thumbnail: null,
    mood: '',
    story: '',
    duration: ''
  })

  const [dragActive, setDragActive] = useState(false)
  const [previewVideos, setPreviewVideos] = useState([])
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e) => {
    handleFiles(e.target.files)
  }

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    const videoFiles = fileArray.filter(file => file.type.startsWith('video/'))
    
    setVideoData(prev => ({
      ...prev,
      videos: [...prev.videos, ...videoFiles]
    }))

    // Create preview URLs
    videoFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewVideos(prev => [...prev, {
          file: file,
          url: e.target.result,
          id: Date.now() + Math.random(),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) // Size in MB
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeVideo = (indexToRemove) => {
    setVideoData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, index) => index !== indexToRemove)
    }))
    setPreviewVideos(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Video Memory:', videoData)
    alert('Video memory saved successfully!')
  }

  const categories = ['Family', 'Travel', 'Events', 'Tutorial', 'Vlog', 'Entertainment', 'Education', 'Memories', 'Celebration', 'Other']
  const moods = ['😊 Happy', '🎉 Exciting', '💕 Loving', '😌 Peaceful', '🤩 Amazing', '💭 Nostalgic', '😂 Funny', '🥰 Heartwarming']

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🎬
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Video Memory</h1>
                <p className="text-red-100 mt-2">Upload and preserve your video memories</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Video Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Videos *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                    </svg>
                    <p className="text-xl font-medium">Drop videos here or click to upload</p>
                    <p className="text-sm mt-2">Supports: MP4, AVI, MOV, WMV, MKV</p>
                    <p className="text-xs text-gray-400 mt-1">Maximum file size: 500MB per video</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Video Previews */}
            {previewVideos.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Uploaded Videos ({previewVideos.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative group rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50"
                    >
                      <video
                        src={video.url}
                        className="w-full h-40 object-cover"
                        controls
                        preload="metadata"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-700 truncate">{video.name}</p>
                        <p className="text-xs text-gray-500">{video.size} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove video"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={videoData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Give your video a memorable title"
              />
            </div>

            {/* Date and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date Recorded
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={videoData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={videoData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="Where was this recorded?"
                />
              </div>
            </div>

            {/* Category and Mood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={videoData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-2">
                  Mood/Feeling
                </label>
                <select
                  id="mood"
                  name="mood"
                  value={videoData.mood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="">How did this moment feel?</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (optional)
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={videoData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="e.g., 5:30, 2 hours, 45 minutes"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={videoData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                placeholder="Describe what's happening in this video..."
              />
            </div>

            {/* Story */}
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                The Story Behind
              </label>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
                <div className="flex items-start space-x-2">
                  <span className="text-red-600">🎯</span>
                  <div className="text-sm text-red-800">
                    <p className="font-medium">Capture the complete memory:</p>
                    <p className="text-xs mt-1">Share the context, emotions, and significance that make this video special.</p>
                  </div>
                </div>
              </div>
              <textarea
                id="story"
                name="story"
                value={videoData.story}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell the story behind this video. What was the occasion? Who was involved? What emotions were captured? What makes this moment memorable?"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {videoData.story.length} characters
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
                value={videoData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="family, birthday, vacation, celebration, funny (comma separated)"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Video Memory
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Video
