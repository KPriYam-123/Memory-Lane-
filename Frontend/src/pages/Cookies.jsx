import React from 'react';
import { motion } from 'framer-motion';

function Cookies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Cookie Policy
          </h1>
          <p className="text-gray-500 mb-6">Last updated: August 13, 2026</p>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your browser when you visit a website. We use cookies and similar session storage components to recognize you, remember your preferences, and maintain secure user authentication sessions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Cookies</h2>
              <p className="mb-2">
                We use cookies for the following critical purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Essential Authentication:</strong> Cookies named <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-500">accessToken</code> and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-500">refreshToken</code> keep you securely logged into your dashboard. They are set as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-500">httpOnly</code> to protect against cross-site scripting (XSS) attacks.</li>
                <li><strong>Preferences:</strong> Keeping track of UI preferences such as sidebar toggle status.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Managing Your Cookies</h2>
              <p>
                You can configure your browser to reject cookies or warn you before accepting them. However, please note that blocking or deleting our cookies will prevent you from signing in or accessing your memories dashboard as our authentication scheme relies on them for security.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cookies;
