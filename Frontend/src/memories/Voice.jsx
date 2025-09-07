import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function Voice() {
  const [voiceData, setVoiceData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    duration: '',
    transcription: ''
  })

  const [isRecording, setIsRecording] = useState(false)
  const [audioFile, setAudioFile] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVoiceData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setAudioFile(file)
    if (file) {
      const audio = new Audio(URL.createObjectURL(file))
      audio.addEventListener('loadedmetadata', () => {
        setVoiceData(prev => ({
          ...prev,
          duration: Math.round(audio.duration)
        }))
      })
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      const chunks = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const audioFile = new File([blob], 'recording.wav', { type: 'audio/wav' })
        setAudioFile(audioFile)
        setVoiceData(prev => ({
          ...prev,
          duration: recordingTime
        }))
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Error accessing microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      clearInterval(timerRef.current)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Voice memory:', { ...voiceData, audioFile })
    alert('Voice memory saved successfully!')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const categories = ['Personal Note', 'Story', 'Song', 'Poem', 'Interview', 'Lecture', 'Meeting', 'Other']

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                🎤
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Voice Memory</h1>
                <p className="text-purple-100 mt-2">Record or upload your audio memories</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Voice Memory Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={voiceData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Give your voice memory a title"
              />
            </div>

            {/* Recording Section */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Audio</h3>
              <div className="flex flex-col items-center space-y-4">
                <motion.button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-200 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                  transition={isRecording ? { duration: 1, repeat: Infinity } : {}}
                >
                  {isRecording ? '⏹️' : '🎤'}
                </motion.button>
                
                {isRecording && (
                  <div className="text-center">
                    <div className="text-red-600 font-bold text-xl">Recording...</div>
                    <div className="text-gray-600">{formatTime(recordingTime)}</div>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 text-center">
                  {isRecording ? 'Click to stop recording' : 'Click to start recording'}
                </p>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-2">
                Or Upload Audio File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="audioFile"
                  onChange={handleFileChange}
                  accept="audio/*"
                  className="hidden"
                />
                <label htmlFor="audioFile" className="cursor-pointer">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l4-4h20l4 4v13M7 19h30l-2 2v14a2 2 0 01-2 2H11a2 2 0 01-2-2V21l-2-2z" />
                    </svg>
                    <p className="text-lg">Click to upload audio file</p>
                    <p className="text-sm">MP3, WAV, M4A up to 50MB</p>
                  </div>
                </label>
              </div>
              {audioFile && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Selected: {audioFile.name}</p>
                  {voiceData.duration && <p>Duration: {formatTime(voiceData.duration)} seconds</p>}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={voiceData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={voiceData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Describe your voice memory..."
              />
            </div>

            {/* Transcription */}
            <div>
              <label htmlFor="transcription" className="block text-sm font-medium text-gray-700 mb-2">
                Transcription (Optional)
              </label>
              <textarea
                id="transcription"
                name="transcription"
                value={voiceData.transcription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Add a transcript of your audio..."
              />
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
                value={voiceData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="voice, audio, recording, story (comma separated)"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!audioFile}
            >
              Save Voice Memory
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Voice
