'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamically import 3D components to optimize loading
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <AnimatedBackground variant="default">
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </AnimatedBackground>
  );
}
