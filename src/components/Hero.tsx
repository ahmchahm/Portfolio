'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingObjectsScene from '@/components/FloatingObjectsScene';
import gsap from 'gsap';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const letters = textRef.current.querySelectorAll('.letter');
    
    gsap.from(letters, {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.05,
      ease: 'back.out(1.5)',
      delay: 0.3,
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20"
      ref={containerRef}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 -z-20">
        <FloatingObjectsScene />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/30 to-dark-900 -z-10" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Title */}
        <motion.div ref={textRef} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="block">
              {'Creative Developer'.split('').map((char, idx) => (
                <span key={idx} className="letter inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-cyan-500 bg-clip-text text-transparent animate-pulse-slow">
              & 3D Designer
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          I craft immersive digital experiences using cutting-edge web technologies.
          Specializing in 3D interactive interfaces, animations, and creative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-neon-lg hover:shadow-neon-lg interactive"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              projectsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-500/10 transition-all interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100, -200],
              x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
