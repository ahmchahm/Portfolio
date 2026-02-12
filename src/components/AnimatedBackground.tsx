'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  variant?: 'default' | 'hero' | 'dark';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'default',
}) => {
  const backgroundVariants = {
    default: 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900',
    hero: 'bg-gradient-to-br from-dark-900 via-[#1a3a4a] to-dark-900',
    dark: 'bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800',
  };

  return (
    <motion.div
      className={`relative w-full min-h-screen ${backgroundVariants[variant]} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 25, -25, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedBackground;
