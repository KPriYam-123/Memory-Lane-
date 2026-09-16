import React from 'react';
import { motion } from 'framer-motion';

function Team() {
  const members = [
    { name: 'Priyam', role: 'Lead Developer & Architect', avatar: '💻' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Team
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-lg mx-auto">
            Meet the team working on creating a safer, faster, and more intuitive memory capsule platform.
          </p>

          <div className="flex justify-center">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow max-w-sm w-full"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-500 font-medium text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Team;