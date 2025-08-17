import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="%23f5f3f0"/><g opacity="0.1"><circle cx="200" cy="200" r="100" fill="%23d4a574"/><circle cx="800" cy="300" r="150" fill="%23d4a574"/><circle cx="500" cy="700" r="120" fill="%23d4a574"/></g></svg>')`,
        backgroundColor: '#f5f3f0'
      }}
    >
      {/* Background overlay with vintage photo effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-100/60"></div>
      
      {/* Scattered photo elements for background effect */}
      <div className="absolute top-10 left-10 w-32 h-24 bg-white shadow-lg transform rotate-12 opacity-40 rounded-sm border-4 border-white"></div>
      <div className="absolute top-32 right-20 w-28 h-36 bg-white shadow-lg transform -rotate-6 opacity-30 rounded-sm border-4 border-white"></div>
      <div className="absolute bottom-20 left-32 w-36 h-28 bg-white shadow-lg transform rotate-3 opacity-35 rounded-sm border-4 border-white"></div>
      <div className="absolute bottom-40 right-10 w-24 h-32 bg-white shadow-lg transform -rotate-12 opacity-25 rounded-sm border-4 border-white"></div>
      
      {/* Main sign-in card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 border border-white/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl mr-2">📸</span>
            <h1 className="text-3xl font-bold text-blue-400 tracking-wide">
              Mem-Lane
            </h1>
          </div>
          <p className="text-gray-700 font-medium text-lg italic">
            Create an account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 text-left">
              UserName
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors bg-white/80"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 text-left">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-400 focus:outline-none transition-colors bg-white/80"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 text-left">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors bg-white/80"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
          >
            Submit
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-500 hover:text-blue-600 font-medium underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;