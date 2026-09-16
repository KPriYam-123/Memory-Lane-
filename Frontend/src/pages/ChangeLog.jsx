import React from 'react';
import { motion } from 'framer-motion';

function ChangeLog() {
  const logs = [
    {
      version: 'v2.0.0',
      date: 'August 13, 2026',
      changes: [
        'Consolidated individual creation modules into a robust unified Memory Creator with search parameter configuration.',
        'Implemented automatic user session logins immediately following successful registration.',
        'Fixed critical frontend routing bugs including path case matching in navigators.',
        'Added dynamic profile activity statistics that reflect actual database entries.',
        'Resolved user schema profile picture integration issues during OAuth logins.',
        'Added secure token refresh endpoints to keep sessions active seamlessly.'
      ]
    },
    {
      version: 'v1.0.0',
      date: 'July 2026',
      changes: [
        'Initial deployment of Memory Lane digital time capsule platform.',
        'Supports secure cookie session storage, standard email register/login, and third-party Auth0 OAuth integrations.',
        'Integrated Cloudinary media services for uploading videos, images, and audio tracks.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 text-center">
            Changelog & Updates
          </h1>

          <div className="space-y-12">
            {logs.map((log, index) => (
              <div key={log.version} className="relative pl-6 border-l-2 border-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1.5 border-4 border-white"></div>
                <div className="flex flex-wrap items-baseline gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{log.version}</h2>
                  <span className="text-gray-400 text-sm">{log.date}</span>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {log.changes.map((change, cIndex) => (
                    <li key={cIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChangeLog;