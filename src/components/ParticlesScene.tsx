'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Suspense } from 'react';

const ParticlesGeometry = () => {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 20 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ParticlesScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      dpr={[1, 2]}
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <ParticlesGeometry />
      </Suspense>
    </Canvas>
  );
};

export default ParticlesScene;
