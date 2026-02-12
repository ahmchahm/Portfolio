'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import gsap from 'gsap';

interface FloatingObjectProps {
  position: [number, number, number];
  scale: number;
  color: string;
  delay?: number;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({
  position,
  scale,
  color,
  delay = 0,
}) => {
  const meshRef = useRef<Mesh>(null);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    if (meshRef.current) {
      rotationRef.current.x += 0.001;
      rotationRef.current.y += 0.002;
      rotationRef.current.z += 0.001;

      meshRef.current.rotation.x = rotationRef.current.x;
      meshRef.current.rotation.y = rotationRef.current.y;
      meshRef.current.rotation.z = rotationRef.current.z;

      meshRef.current.position.y +=
        Math.sin(rotationRef.current.x * 0.5) * 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

export default FloatingObject;
