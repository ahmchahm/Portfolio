'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { freezeOnceVisible: true });

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: '3D & Graphics',
      items: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP', 'Babylon.js'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'Docker', 'AWS', 'Firebase', 'Figma'],
    },
    {
      category: 'Design',
      items: ['UI/UX Design', 'Animation', 'Motion Design', 'Brand Design', 'Prototyping'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate creative developer with over 5 years of experience building
              immersive digital experiences. My journey started with a fascination for how
              websites work, and it evolved into a deep love for creating interactive,
              visually stunning applications.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Specializing in modern web technologies, 3D graphics, and motion design, I combine
              technical expertise with artistic vision to create web experiences that not only
              look incredible but also perform flawlessly.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding or designing, you'll find me exploring new technologies,
              contributing to open-source projects, or creating experimental web art.
            </p>

            <motion.button
              className="inline-block px-8 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '30+', label: 'Happy Clients' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-6 rounded-xl bg-dark-800/50 border border-primary-500/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'rgba(14, 165, 233, 0.5)' }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-primary-500 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8">Skills & Expertise</h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="p-6 rounded-xl bg-dark-800/50 border border-primary-500/20 backdrop-blur-sm hover:border-primary-500/50 transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-xl font-semibold text-primary-400 mb-4">
                  {skillGroup.category}
                </h4>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-300 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-3" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
