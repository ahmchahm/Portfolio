'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive 3D Store',
    description: 'A full-featured e-commerce platform with 3D product visualization and AR preview capabilities.',
    tags: ['Next.js', 'Three.js', 'React Three Fiber', 'Stripe'],
    image: '🛒',
    color: '#0ea5e9',
    link: '#',
  },
  {
    id: 2,
    title: 'Data Visualization Dashboard',
    description: 'Real-time analytics dashboard with stunning 3D data visualizations and interactive charts.',
    tags: ['React', 'D3.js', 'Three.js', 'WebGL'],
    image: '📊',
    color: '#ec4899',
    link: '#',
  },
  {
    id: 3,
    title: 'Immersive Portfolio',
    description: 'Creative portfolio website with scroll-based animations and interactive 3D elements.',
    tags: ['Next.js', 'Framer Motion', 'GSAP', 'Three.js'],
    image: '🎨',
    color: '#f59e0b',
    link: '#',
  },
  {
    id: 4,
    title: 'Virtual World Explorer',
    description: 'Explore interactive 3D environments with real-time physics and particle systems.',
    tags: ['Three.js', 'Cannon.js', 'WebGL', 'React'],
    image: '🌍',
    color: '#06b6d4',
    link: '#',
  },
  {
    id: 5,
    title: 'AI Chat Interface',
    description: 'Modern chat application with AI integration and animated UI components.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind'],
    image: '🤖',
    color: '#8b5cf6',
    link: '#',
  },
  {
    id: 6,
    title: 'Real-time Collaboration Tool',
    description: 'WebSocket-based collaborative editing platform with live cursor positions.',
    tags: ['Next.js', 'WebSockets', 'Firebase', 'React'],
    image: '👥',
    color: '#10b981',
    link: '#',
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of my most impressive and creative work. Click on any project to see more details.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-dark-800 rounded-xl max-w-2xl w-full p-8 border border-primary-500/20"
            dir="ltr"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4" dir="ltr">
              <div>
                <div
                  className="text-6xl mb-4"
                  style={{ filter: 'drop-shadow(0 0 10px ' + selectedProject.color + ')' }}
                >
                  {selectedProject.image}
                </div>
                <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-primary-500/10 border border-primary-500/20 text-primary-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <motion.button
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
              </motion.button>
              <motion.button
                className="flex-1 px-6 py-3 rounded-lg border border-primary-500/50 text-primary-400 font-semibold hover:bg-primary-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Source Code
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
