import React from 'react';
import { motion } from 'framer-motion';

function Tnc() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 mb-6">Last updated: August 13, 2026</p>

          <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By signing up for and using Memory Lane, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not access or use the application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. User Content Responsibility</h2>
              <p>
                You retain complete intellectual property ownership over any media, letters, diary entries, or content that you publish on Memory Lane. You are solely responsible for ensuring you have the legal right to upload and store this media.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Forbidden Activities</h2>
              <p>
                You may not upload media containing malicious software, spam, or content that is illegal, defamatory, or infringes upon others intellectual rights. We reserve the right to remove any content or suspend accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Limitation of Liability</h2>
              <p>
                Memory Lane provides hosting services for your files on a best-effort basis using premium cloud partners. However, we recommend maintaining secondary backups of highly important memories. We are not liable for accidental data loss or cloud outages.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Tnc;