"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// Reusing GlobeContent logic but simplified for the animation
const GlobeContent = ({ scale = 1, opacity = 0.3, wireframe = true, color = "#4299e1", isBackground = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (isBackground ? 0.05 : 0.2);
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={color} wireframe={wireframe} transparent opacity={opacity} />
      </mesh>
      {!isBackground && (
        <mesh scale={[0.98, 0.98, 0.98]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#0000ff" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
};

export function SphereLatticeAnimation() {
  const [unveilProgress, setUnveilProgress] = useState(0);
  const [isUnveiling, setIsUnveiling] = useState(false);
  const centerSphereRef = useRef<THREE.Group>(null);
  const latticeGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Start unveiling after a short delay
    const timer = setTimeout(() => {
      setIsUnveiling(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (isUnveiling && unveilProgress < 1) {
      setUnveilProgress(Math.min(1, unveilProgress + delta * 0.5)); // 2 second animation
    }

    if (centerSphereRef.current) {
      // Scale down sphere
      const sphereScale = 1 - unveilProgress;
      centerSphereRef.current.scale.set(sphereScale, sphereScale, sphereScale);

      // Also fade out
      centerSphereRef.current.traverse(child => {
          if (child instanceof THREE.Mesh) {
              const mat = child.material as THREE.MeshBasicMaterial;
              // determine base opacity based on if it's wireframe or inner glow
              const baseOpacity = mat.wireframe ? 0.3 : 0.1;
              mat.opacity = baseOpacity * (1 - unveilProgress);
          }
      });
    }

    if (latticeGroupRef.current) {
      // Unveil lattice from center out
      const latticeScale = unveilProgress;
      latticeGroupRef.current.scale.set(latticeScale, latticeScale, latticeScale);

      // Slowly rotate lattice slightly for a 3D feel
      latticeGroupRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 6, unveilProgress);
      latticeGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 12, unveilProgress);
    }
  });

  // Create a 5x5 lattice
  const gridSize = 5;
  const spacing = 1.2;
  const squares = [];

  for (let i = -Math.floor(gridSize/2); i <= Math.floor(gridSize/2); i++) {
    for (let j = -Math.floor(gridSize/2); j <= Math.floor(gridSize/2); j++) {
      // Highlight center three
      const isCenterRow = j === 0;
      const isCenter = i === 0 && j === 0;
      const isLeft = i === -1 && j === 0;
      const isRight = i === 1 && j === 0;

      const isHighlighted = isCenter || isLeft || isRight;

      let text = "";
      if (isCenter) text = "QCX";
      else if (isLeft) text = "EVA";
      else if (isRight) text = "FIX";

      squares.push(
        <group key={`${i}-${j}`} position={[i * spacing, j * spacing, 0]}>
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={isHighlighted ? "#4299e1" : "#1a365d"}
              wireframe={!isHighlighted}
              transparent
              opacity={isHighlighted ? Math.max(0.2, unveilProgress) : Math.max(0.1, unveilProgress * 0.5)}
              side={THREE.DoubleSide}
            />
          </mesh>
          {isHighlighted && (
            <Text
              position={[0, 0, 0.01]} // Slightly in front of the plane
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-transparent
              material-opacity={unveilProgress}
            >
              {text}
            </Text>
          )}
        </group>
      );
    }
  }

  return (
    <>
      {/* Background Sphere */}
      <GlobeContent scale={3} opacity={0.05} color="#1a365d" isBackground={true} />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Center Animated Elements */}
      <group>
        {/* The center sphere that fades out */}
        <group ref={centerSphereRef}>
           <GlobeContent scale={1} opacity={0.3} color="#4299e1" />
        </group>

        {/* The lattice that scales in */}
        <group ref={latticeGroupRef} scale={[0,0,0]}>
          {squares}
        </group>
      </group>
    </>
  );
}
