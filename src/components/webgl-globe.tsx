"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeContentProps {
  onClick?: () => void;
}

const GlobeContent: React.FC<GlobeContentProps> = ({ onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the wireframe globe slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group onClick={onClick}>
      {/* Main Wireframe Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4299e1" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Inner Blue Glow Sphere */}
      <mesh>
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
}

const WebGLGlobe: React.FC<WebGLGlobeProps> = ({ className, onClick }) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <GlobeContent onClick={onClick} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default WebGLGlobe;
