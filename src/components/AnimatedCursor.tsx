'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Detect hover on interactive elements
    document.addEventListener('mouseenter', (e) => {
      if (
        (e.target as HTMLElement).tagName === 'A' ||
        (e.target as HTMLElement).tagName === 'BUTTON' ||
        (e.target as HTMLElement).className.includes('interactive')
      ) {
        setIsActive(true);
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      if (
        (e.target as HTMLElement).tagName === 'A' ||
        (e.target as HTMLElement).tagName === 'BUTTON' ||
        (e.target as HTMLElement).className.includes('interactive')
      ) {
        setIsActive(false);
      }
    }, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          damping: 100,
          mass: 0.1,
          stiffness: 500,
        }}
      />
      <motion.div
        className={`cursor-outline ${isActive ? 'active' : ''}`}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          mass: 0.2,
          stiffness: 300,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
