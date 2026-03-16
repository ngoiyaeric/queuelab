"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Text, Edges } from '@react-three/drei';
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

export interface SphereLatticeAnimationProps {
  gridSize?: number;
  spacing?: number;
  words?: { center: string; left: string; right: string; top: string; bottom: string; };
}

export function SphereLatticeAnimation({
  gridSize = 5,
  spacing = 1.2,
  words = { center: "QCX", left: "EVA", right: "FIX", top: "AI", bottom: "ML" }
}: SphereLatticeAnimationProps) {
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
      // Start big (3) and scale down to (1) as we zoom out
      const startScale = 3;
      const endScale = 1;
      const currentScale = THREE.MathUtils.lerp(startScale, endScale, unveilProgress);
      centerSphereRef.current.scale.set(currentScale, currentScale, currentScale);

      // Fade out
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
      // Unveil lattice: Start big (3) and scale down to (1) as we zoom out
      const startScale = 3;
      const endScale = 1;
      const latticeScale = THREE.MathUtils.lerp(startScale, endScale, unveilProgress);
      latticeGroupRef.current.scale.set(latticeScale, latticeScale, latticeScale);

      // Do NOT rotate so it acts like an OS (flat to the user)
      latticeGroupRef.current.rotation.x = 0;
      latticeGroupRef.current.rotation.y = 0;
    }
  });

  const squares = [];

  for (let i = -Math.floor(gridSize/2); i <= Math.floor(gridSize/2); i++) {
    for (let j = -Math.floor(gridSize/2); j <= Math.floor(gridSize/2); j++) {
      const isCenter = i === 0 && j === 0;
      const isLeft = i === -1 && j === 0;
      const isRight = i === 1 && j === 0;
      const isTop = i === 0 && j === 1;
      const isBottom = i === 0 && j === -1;

      const isHighlighted = isCenter || isLeft || isRight || isTop || isBottom;

      let text = "";
      if (isCenter) text = words.center;
      else if (isLeft) text = words.left;
      else if (isRight) text = words.right;
      else if (isTop) text = words.top;
      else if (isBottom) text = words.bottom;

      squares.push(
        <group key={`${i}-${j}`} position={[i * spacing, j * spacing, 0]}>
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={isHighlighted ? "#4299e1" : "#1a365d"}
              transparent
              opacity={isHighlighted ? Math.max(0.2, unveilProgress) : Math.max(0.05, unveilProgress * 0.2)}
              side={THREE.DoubleSide}
            />
            {/* Draw edges without diagonal line */}
            <Edges
              linewidth={1}
              threshold={15}
              color={isHighlighted ? "#63b3ed" : "#2a4365"}
              transparent
              opacity={isHighlighted ? unveilProgress : unveilProgress * 0.5}
            />
          </mesh>
          {isHighlighted && text && (
            <Text
              position={[0, 0, 0.01]} // Slightly in front of the plane
              fontSize={0.25}
              color="#ffffff"
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
      {/* Background Sphere - maybe a lighter color for the light theme or keep it dark for contrast */}
      <GlobeContent scale={4} opacity={0.02} color="#1a365d" isBackground={true} />

      {/* Background Stars - faint stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Center Animated Elements */}
      <group>
        {/* The center sphere that fades out and scales down (zoom out) */}
        <group ref={centerSphereRef} scale={[3,3,3]}>
           <GlobeContent scale={1} opacity={0.3} color="#4299e1" />
        </group>

        {/* The lattice that fades in and scales down (zoom out) */}
        <group ref={latticeGroupRef} scale={[3,3,3]}>
          {squares}
        </group>
      </group>
    </>
  );
}
