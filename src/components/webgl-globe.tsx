"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface GlobeContentProps {
  onClick?: () => void;
  scrollY?: MotionValue<number>;
}

const GlobeContent: React.FC<GlobeContentProps> = ({ onClick, scrollY }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const scroll = scrollY ? scrollY.get() : 0;

    if (groupRef.current) {
      // Rotation: faster with scroll
      // Base rotation from autoRotate is separate, this adds object rotation
      const rotationSpeed = 0.1 + (scroll * 0.0005);
      groupRef.current.rotation.y += delta * rotationSpeed;

      // Scale (Zoom): bigger with scroll
      const scale = 1 + (scroll * 0.0005);
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (glowMeshRef.current) {
        const material = glowMeshRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
            const baseOpacity = 0.1;
            // Increase opacity with scroll, capped at 0.4
            const extraOpacity = Math.min(scroll * 0.0005, 0.3);
            material.opacity = baseOpacity + extraOpacity;
            material.needsUpdate = true;
        }
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Main Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4299e1" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Inner Blue Glow Sphere */}
      <mesh ref={glowMeshRef}>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#0000ff" transparent opacity={0.1} />
      </mesh>

      {/* Outer Halo / Atmosphere effect */}
       <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4299e1" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

interface WebGLGlobeProps {
  className?: string;
  onClick?: () => void;
  scrollY?: MotionValue<number>;
}

const WebGLGlobe: React.FC<WebGLGlobeProps> = ({ className, onClick, scrollY }) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <GlobeContent onClick={onClick} scrollY={scrollY} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default WebGLGlobe;
