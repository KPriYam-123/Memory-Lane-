import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Image() {
  const [imageData, setImageData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    album: '',
    tags: '',
    images: [],
    featured: null,
    mood: '',
    story: ''
  })

  const [dragActive, setDragActive] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setImageData(prev => ({
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
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'))
    
    setImageData(prev => ({
      ...prev,
      images: [...prev.images, ...imageFiles]
    }))

    // Create preview URLs
    imageFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImages(prev => [...prev, {
          file: file,
          url: e.target.result,
          id: Date.now() + Math.random()
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (indexToRemove) => {
    setImageData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }))
    setPreviewImages(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const setFeaturedImage = (index) => {
    setImageData(prev => ({
      ...prev,
      featured: index
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Image Memory:', imageData)
    alert('Image memory saved successfully!')
  }

  const albums = ['Family', 'Travel', 'Events', 'Nature', 'Food', 'Friends', 'Pets', 'Art', 'Special Occasions', 'Other']
  const moods = ['😊 Happy', '💕 Loving', '🎉 Celebratory', '😌 Peaceful', '🤩 Exciting', '💭 Nostalgic', '😂 Fun', '🥰 Heartwarming']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📸
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Image Memory</h1>
                <p className="text-green-100 mt-2">Capture and preserve your visual moments</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2 2l1.586-1.586a2 2 0 012.828 0L20 18m-6 6l-2-2m0 0l-2-2m2 2l2-2m7 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xl font-medium">Drop images here or click to upload</p>
                    <p className="text-sm mt-2">Supports: JPG, PNG, GIF, WebP</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Uploaded Images ({previewImages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previewImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`relative group rounded-lg overflow-hidden border-2 ${
                        imageData.featured === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setFeaturedImage(index)}
                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                            title="Set as featured"
                          >
                            ⭐
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      {imageData.featured === index && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Memory Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={imageData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Give this moment a title"
              />
            </div>

            {/* Date and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date Taken
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={imageData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                  value={imageData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Where was this taken?"
                />
              </div>
            </div>

            {/* Album and Mood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="album" className="block text-sm font-medium text-gray-700 mb-2">
                  Album Category
                </label>
                <select
                  id="album"
                  name="album"
                  value={imageData.album}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select an album</option>
                  {albums.map(album => (
                    <option key={album} value={album}>{album}</option>
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
                  value={imageData.mood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  <option value="">How did this moment feel?</option>
                  {moods.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={imageData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                placeholder="Describe what's happening in these images..."
              />
            </div>

            {/* Story */}
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                The Story Behind
              </label>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">💫</span>
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Capture the full memory:</p>
                    <p className="text-xs mt-1">Share the story, emotions, and context that make this moment special.</p>
                  </div>
                </div>
              </div>
              <textarea
                id="story"
                name="story"
                value={imageData.story}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell the full story of this moment. What led up to it? How did it feel? What made it special? Who was there? What happened next?"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {imageData.story.length} characters
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
                value={imageData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="vacation, birthday, sunset, friends, wedding (comma separated)"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Image Memory
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Image
