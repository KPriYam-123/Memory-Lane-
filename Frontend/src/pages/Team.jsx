import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

function Team() {
  const members = [
    { name: 'Priyam', role: 'Lead Developer & Architect', icon: Code2 }
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
            {members.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <motion.div
                  key={member.name}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all max-w-sm w-full"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Team;