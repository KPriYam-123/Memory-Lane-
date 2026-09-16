import React from 'react';
import { motion } from 'framer-motion';

function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-6">Last updated: August 13, 2026</p>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
              <p className="mb-2">
                We collect information you provide directly to us when creating an account, posting memories, or contacting support.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Account credentials (username, email, password)</li>
                <li>Content you upload (text journal entries, images, audio, video files)</li>
                <li>Metadata related to your memories (upload date, geolocation tags, mood tags)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <p>
                We use the collected data to render, personalize, and improve your experience on Memory Lane. This includes hosting your media on secure cloud networks, generating database entries, and securing your sessions via encrypted tokens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Storage & Security</h2>
              <p>
                Your memories and files are hosted securely. Media items are processed and hosted via Cloudinary. All user credentials and passwords are encrypted using strong bcrypt hashing prior to storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Your Rights</h2>
              <p>
                You maintain full ownership of all uploaded content. You can download, export, edit, or delete any memory from the application at any time. Deleting a memory completely removes its reference from our server database and deletes the physical files from cloud hosting.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Privacy;
