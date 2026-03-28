"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function DrippingBlob({
  initialPosition,
  scale,
  speed,
  color,
  delay = 0,
}: {
  initialPosition: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      // Drip cycle: move from y=4 down to y=-4
      const cycleDuration = 10 / speed;
      const progress = (time % cycleDuration) / cycleDuration;

      // Vertical movement with "acceleration"
      const y = 4 - progress * 8;
      meshRef.current.position.y = y;
      meshRef.current.position.x = initialPosition[0] + Math.sin(time * 0.5) * 0.2;

      // Stretching effect: more stretch as it "falls"
      // Using progress to influence scale.y and scale.x/z (volume conservation)
      const stretch = 1 + Math.sin(progress * Math.PI) * 0.5;
      meshRef.current.scale.set(scale / Math.sqrt(stretch), scale * stretch, scale / Math.sqrt(stretch));

      // Subtle rotation
      meshRef.current.rotation.z = Math.sin(time) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition} scale={scale}>
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
  const blobs = useMemo(() => [
    { pos: [-2, 4, -1] as [number, number, number], scale: 0.6, speed: 0.8, color: "#c6f6d5", delay: 0 },
    { pos: [0, 4, 0] as [number, number, number], scale: 0.8, speed: 0.5, color: "#9ae6b4", delay: 2 },
    { pos: [2, 4, -0.5] as [number, number, number], scale: 0.5, speed: 1.2, color: "#48bb78", delay: 5 },
    { pos: [-1, 4, 1] as [number, number, number], scale: 0.4, speed: 0.9, color: "#68d391", delay: 1 },
    { pos: [1.5, 4, 0.5] as [number, number, number], scale: 0.7, speed: 0.6, color: "#38a169", delay: 3.5 },
  ], []);

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {blobs.map((blob, i) => (
          <DrippingBlob
            key={i}
            initialPosition={blob.pos}
            scale={blob.scale}
            speed={blob.speed}
            color={blob.color}
            delay={blob.delay}
          />
        ))}

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
