"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

const GRID_SIZE = 5;
const SPACING = 1.2;
const UNVEIL_DELAY = 1.5; // seconds before animation starts
const UNVEIL_DURATION = 2.0; // seconds for animation

interface SquareData {
  i: number;
  j: number;
  isHighlighted: boolean;
  text: string;
}

function buildSquareData(): SquareData[] {
  const data: SquareData[] = [];
  const half = Math.floor(GRID_SIZE / 2);
  for (let i = -half; i <= half; i++) {
    for (let j = -half; j <= half; j++) {
      const isCenter = i === 0 && j === 0;
      const isLeft = i === -1 && j === 0;
      const isRight = i === 1 && j === 0;
      const isHighlighted = isCenter || isLeft || isRight;
      let text = "";
      if (isCenter) text = "QCX";
      else if (isLeft) text = "EVA";
      else if (isRight) text = "FIX";
      data.push({ i, j, isHighlighted, text });
    }
  }
  return data;
}

const squareData = buildSquareData();

// Individual square mesh that reads animation progress from a shared ref
function LatticeSquare({
  i,
  j,
  isHighlighted,
  text,
  progressRef,
}: SquareData & { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);

  useFrame(() => {
    const p = progressRef.current;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      if (isHighlighted) {
        mat.opacity = Math.max(0, Math.min(1, p));
      } else {
        mat.opacity = Math.max(0, Math.min(0.5, p * 0.5));
      }
    }

    if (textRef.current) {
      const mat = textRef.current.material as THREE.Material;
      if (mat) {
        (mat as any).opacity = Math.max(0, Math.min(1, p));
      }
    }
  });

  const baseColor = isHighlighted ? "#4299e1" : "#1e3a5f";

  return (
    <group position={[i * SPACING, j * SPACING, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshBasicMaterial
          color={baseColor}
          wireframe={!isHighlighted}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {isHighlighted && (
        <Text
          ref={textRef}
          position={[0, 0, 0.02]}
          fontSize={0.28}
          color="white"
          anchorX="center"
          anchorY="middle"
          material-transparent={true}
          material-opacity={0}
        >
          {text}
        </Text>
      )}
    </group>
  );
}

// The center sphere that fades out during unveil
function CenterSphere({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const p = progressRef.current;
    const invP = 1 - p;

    if (groupRef.current) {
      const s = Math.max(0, invP);
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y += delta * 0.8;
    }

    if (wireRef.current) {
      ((wireRef.current.material) as THREE.MeshBasicMaterial).opacity = 0.45 * invP;
    }
    if (innerRef.current) {
      ((innerRef.current.material) as THREE.MeshBasicMaterial).opacity = 0.15 * invP;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={wireRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4299e1" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={innerRef} scale={0.98}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#2b6cb0" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Background slow-rotating sphere
function BackgroundSphere() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });
  return (
    <group ref={ref} scale={6}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#0d2137" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export function SphereLatticeAnimation() {
  // Use a ref for animation progress to avoid re-renders in useFrame
  const progressRef = useRef(0);
  const elapsedRef = useRef(0);
  const latticeGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    // Start animating after delay
    if (elapsedRef.current > UNVEIL_DELAY) {
      const animTime = elapsedRef.current - UNVEIL_DELAY;
      progressRef.current = Math.min(1, animTime / UNVEIL_DURATION);
    }

    // Drive lattice group scale from ref
    if (latticeGroupRef.current) {
      const p = progressRef.current;
      latticeGroupRef.current.scale.setScalar(p);
    }
  });

  return (
    <>
      <BackgroundSphere />
      <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={0.8} />

      {/* Center sphere fades out */}
      <CenterSphere progressRef={progressRef} />

      {/* Lattice tilted slightly for 3D perspective, scales in */}
      <group
        ref={latticeGroupRef}
        scale={0}
        rotation={[0.25, 0.15, 0]}
      >
        {squareData.map(({ i, j, isHighlighted, text }) => (
          <LatticeSquare
            key={`${i}-${j}`}
            i={i}
            j={j}
            isHighlighted={isHighlighted}
            text={text}
            progressRef={progressRef}
          />
        ))}
      </group>
    </>
  );
}