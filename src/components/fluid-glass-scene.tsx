"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function FluidBlob({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed;
      meshRef.current.position.x = position[0] + Math.sin(t) * 0.5;
      meshRef.current.position.y = position[1] + Math.cos(t * 0.8) * 0.5;
      meshRef.current.position.z = position[2] + Math.sin(t * 1.2) * 0.5;

      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={1.5}
        chromaticAberration={0.05}
        anisotropy={0.1}
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.1}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        color={color}
        roughness={0.1}
        transmission={1}
      />
    </mesh>
  );
}

export default function FluidGlassScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <FluidBlob position={[-1.5, 0, 0]} scale={0.8} speed={0.5} color="#c6f6d5" />
          <FluidBlob position={[1.5, 0.5, -1]} scale={1.2} speed={0.4} color="#9ae6b4" />
          <FluidBlob position={[0, -1, 0.5]} scale={0.6} speed={0.6} color="#48bb78" />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
