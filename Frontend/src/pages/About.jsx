import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Memory Lane
          </h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Memory Lane is a secure, interactive digital time capsule application built to preserve your personal experiences. We believe that life is made of transient moments that deserve to be kept forever.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you want to document your daily thoughts in a journal, upload letters to your future self, or preserve photos, voice records, and videos, Memory Lane provides a beautiful and safe space to store all your milestones.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;