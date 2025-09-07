import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignUp() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [focused, setFocused] = useState({
    username: false,
    email: false,
    password: false
  });

  const [validation, setValidation] = useState({
    username: null, // null, 'valid', 'invalid'
    email: null,
    password: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation while typing
    if (value.length > 0) {
      validateField(name, value);
    } else {
      setValidation(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocused(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    setFocused(prev => ({ ...prev, [fieldName]: false }));
    const value = formData[fieldName];
    if (value.length > 0) {
      validateField(fieldName, value);
    }
  };

  const validateField = (fieldName, value) => {
    let isValid = false;
    
    switch (fieldName) {
      case 'username':
        isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'password':
        isValid = value.length >= 6;
        break;
      default:
        isValid = false;
    }
    
    setValidation(prev => ({ 
      ...prev, 
      [fieldName]: isValid ? 'valid' : 'invalid' 
    }));
  };

  const getBorderColor = (fieldName) => {
    if (focused[fieldName]) {
      return 'border-yellow-400 border-2';
    }
    if (validation[fieldName] === 'valid') {
      return 'border-green-500 border-2';
    }
    if (validation[fieldName] === 'invalid') {
      return 'border-red-500 border-2';
    }
    return 'border-gray-300 border';
  };

  const getLabelColor = (fieldName) => {
    if (focused[fieldName]) {
      return 'text-yellow-500';
    }
    if (validation[fieldName] === 'valid') {
      return 'text-green-600';
    }
    if (validation[fieldName] === 'invalid') {
      return 'text-red-500';
    }
    return 'text-gray-500';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trigger validation for all fields
    validateField('username', formData.username);
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    // Check if all fields are valid and not empty
    const isFormValid = 
      formData.username.length >= 3 && 
      /^[a-zA-Z0-9_]+$/.test(formData.username) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 6;
    
    if (isFormValid) {
      console.log('Sign up form submitted:', formData);
      
      // Simulate successful registration
      // In a real app, you would make an API call here
      alert('Account created successfully! Welcome to Memory Lane!');
      
      // Redirect to Home page
      navigate('/Home');
    } else {
      alert('Please fill in all fields correctly before submitting.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center relative"
      style={{
        backgroundImage: `url('/signUpBackgroung.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Main sign-up card - positioned to the left */}
      <motion.div 
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-[340px] ml-8 md:ml-16 lg:ml-24 border border-white/50"
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-xl mr-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              📸
            </motion.span>
            <motion.h1 
              className="text-2xl font-bold text-blue-500 tracking-wide"
              whileHover={{ color: "#3b82f6" }}
            >
              Mem-Lane
            </motion.h1>
          </motion.div>
          <motion.p 
            className="text-gray-800 font-medium text-base italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create an account
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Username Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              className={`w-full px-3 pt-5 pb-2.5 rounded-lg focus:outline-none transition-all duration-300 bg-white/90 text-gray-800 text-sm peer ${getBorderColor('username')}`}
              placeholder=" "
              required
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.label
              className={`absolute left-3 transition-all duration-300 pointer-events-none ${getLabelColor('username')} ${
                formData.username || focused.username
                  ? '-top-2 text-xs font-medium bg-white/95 px-2 py-0.5 rounded'
                  : 'top-5 text-sm font-normal'
              }`}
              animate={{
                y: formData.username || focused.username ? -8 : 0,
                scale: formData.username || focused.username ? 0.95 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              UserName
            </motion.label>
            {validation.username === 'invalid' && (
              <motion.p
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Username must be at least 3 characters and contain only letters, numbers, and underscores
              </motion.p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={`w-full px-3 pt-5 pb-2.5 rounded-lg focus:outline-none transition-all duration-300 bg-white/90 text-gray-800 text-sm peer ${getBorderColor('email')}`}
              placeholder=" "
              required
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.label
              className={`absolute left-3 transition-all duration-300 pointer-events-none ${getLabelColor('email')} ${
                formData.email || focused.email
                  ? '-top-2 text-xs font-medium bg-white/95 px-2 py-0.5 rounded'
                  : 'top-5 text-sm font-normal'
              }`}
              animate={{
                y: formData.email || focused.email ? -8 : 0,
                scale: formData.email || focused.email ? 0.95 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Email
            </motion.label>
            {validation.email === 'invalid' && (
              <motion.p
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Please enter a valid email address
              </motion.p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className={`w-full px-3 pt-5 pb-2.5 rounded-lg focus:outline-none transition-all duration-300 bg-white/90 text-gray-800 text-sm peer ${getBorderColor('password')}`}
              placeholder=" "
              required
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.label
              className={`absolute left-3 transition-all duration-300 pointer-events-none ${getLabelColor('password')} ${
                formData.password || focused.password
                  ? '-top-2 text-xs font-medium bg-white/95 px-2 py-0.5 rounded'
                  : 'top-5 text-sm font-normal'
              }`}
              animate={{
                y: formData.password || focused.password ? -8 : 0,
                scale: formData.password || focused.password ? 0.95 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Password
            </motion.label>
            {validation.password === 'invalid' && (
              <motion.p
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Password must be at least 6 characters long
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg mt-5 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#374151",
              boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.form>

        {/* Sign In Link */}
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link 
                to="/signin" 
                className="text-blue-500 hover:text-blue-600 font-medium underline"
              >
                Sign in here
              </Link>
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignUp;