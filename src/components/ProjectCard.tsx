'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotationX = ((y - centerY) / centerY) * 10;
    const rotationY = ((x - centerX) / centerX) * 10;

    setRotateX(rotationX);
    setRotateY(rotationY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 cursor-pointer perspective group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Front of Card */}
      <motion.div
        className={`absolute inset-0 rounded-xl border border-primary-500/30 p-6 flex flex-col justify-between bg-dark-800/80 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
          isFlipped ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)`,
        }}
      >
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}30, transparent 80%)`,
          }}
        />

        <div className="relative z-10">
          <div
            className="text-6xl mb-4 drop-shadow-lg"
            style={{ filter: `drop-shadow(0 0 15px ${project.color})` }}
          >
            {project.image}
          </div>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="relative z-10 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </motion.div>

      {/* Back of Card */}
      <motion.div
        className={`absolute inset-0 rounded-xl border border-accent-500/30 p-6 flex flex-col justify-between bg-dark-800/80 backdrop-blur-sm transition-all duration-500 ${
          isFlipped ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.color}20 0%, transparent 100%)`,
        }}
      >
        <div className="relative z-10 text-center" dir="ltr">
          <h3 className="text-xl font-bold mb-4">Quick Details</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="text-primary-400">Type:</span> Web Application
            </p>
            <p>
              <span className="text-primary-400">Status:</span> Complete
            </p>
            <p>
              <span className="text-primary-400">Year:</span> 2024
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
            setIsFlipped(false);
          }}
          className="relative z-10 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-neon-lg transition-all"
        >
          View Details
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
