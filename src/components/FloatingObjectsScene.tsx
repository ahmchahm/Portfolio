'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import FloatingObject from '@/components/FloatingObject';
import { Suspense } from 'react';

const FloatingObjectsScene = () => {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 15], fov: 75 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Stars radius={300} depth={50} count={5000} factor={4} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ec4899" />
        
        <FloatingObject position={[0, 0, 0]} scale={1.5} color="#0ea5e9" />
        <FloatingObject position={[-8, 5, -10]} scale={0.8} color="#ec4899" delay={1} />
        <FloatingObject position={[8, -5, -10]} scale={1} color="#06b6d4" delay={2} />
        <FloatingObject position={[0, 8, -20]} scale={0.6} color="#f59e0b" delay={1.5} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
};

export default FloatingObjectsScene;
