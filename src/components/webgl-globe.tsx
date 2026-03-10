"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// --- Leaf Geometry Generator ---
function createLeafGeometry() {
  const shape = new THREE.Shape();
  // Draw a simple leaf shape using bezier curves
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.5, 0.5, 0, 1.5);
  shape.quadraticCurveTo(-0.5, 0.5, 0, 0);

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.01
  };
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

interface GlobeContentProps {
  onClick?: () => void;
  scrollY?: MotionValue<number>;
}

const GlobeContent: React.FC<GlobeContentProps> = ({ onClick, scrollY }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  const leafGeometry = useMemo(() => createLeafGeometry(), []);

  // Materials for the leaves to give them a gradient/varied look
  const leafMaterials = useMemo(() => [
    new THREE.MeshStandardMaterial({ color: '#7cfc00', roughness: 0.4 }), // Light green
    new THREE.MeshStandardMaterial({ color: '#32cd32', roughness: 0.5 }), // Lime green
    new THREE.MeshStandardMaterial({ color: '#228b22', roughness: 0.6 }), // Forest green
    new THREE.MeshStandardMaterial({ color: '#adff2f', roughness: 0.3 }), // Green yellow
  ], []);

  // Pre-calculate leaf positions and rotations along the orbit
  const numLeaves = 12;
  const orbitRadiusX = 3.5;
  const orbitRadiusZ = 3.5;

  const leavesData = useMemo(() => {
    const data = [];
    for (let i = 0; i < numLeaves; i++) {
      const angle = (i / numLeaves) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadiusX;
      const z = Math.sin(angle) * orbitRadiusZ;
      const y = Math.sin(angle * 2) * 0.2; // slight wave in the orbit

      const scale = 0.3 + Math.random() * 0.2; // vary scale slightly
      const materialIndex = Math.floor(Math.random() * leafMaterials.length);

      data.push({ x, y, z, angle, scale, materialIndex });
    }
    return data;
  }, [leafMaterials.length]);

  // Create the orbit line (stem)
  const orbitLineGeometry = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadiusX;
      const z = Math.sin(angle) * orbitRadiusZ;
      const y = Math.sin(angle * 2) * 0.2;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollY ? scrollY.get() : 0;

    if (groupRef.current) {
      // Rotation: faster with scroll
      const rotationSpeed = 0.05 + (scroll * 0.0002);
      groupRef.current.rotation.y += delta * rotationSpeed;

      // Scale (Zoom): bigger with scroll
      const scale = 1 + (scroll * 0.0005);
      groupRef.current.scale.set(scale, scale, scale);
    }

    // Animate the leaf orbit around the globe
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y -= delta * 0.2; // Rotate opposite to the globe
    }

    if (glowMeshRef.current) {
        const material = glowMeshRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
            const baseOpacity = 0.1;
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
        <meshBasicMaterial color="#a0c4ff" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Inner Blue Glow Sphere */}
      <mesh ref={glowMeshRef}>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#e0f0ff" transparent opacity={0.4} />
      </mesh>

      {/* Outer Halo / Atmosphere effect */}
       <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#e0f0ff" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Leaf Orbit Ring */}
      <group ref={orbitGroupRef} rotation={[Math.PI / 8, 0, Math.PI / 6]}>
        {/* Orbit Line (Stem) */}
        <primitive object={new THREE.Line(orbitLineGeometry, new THREE.LineBasicMaterial({ color: "#7cfc00", opacity: 0.5, transparent: true }))} />

        {/* Leaves */}
        {leavesData.map((leaf, index) => (
          <mesh
            key={index}
            geometry={leafGeometry}
            material={leafMaterials[leaf.materialIndex]}
            position={[leaf.x, leaf.y, leaf.z]}
            // Orient the leaf along the path.
            // We rotate it so it lays somewhat flat along the ring but points along the tangent.
            rotation={[0, -leaf.angle, -Math.PI / 2]}
            scale={[leaf.scale, leaf.scale, leaf.scale]}
          />
        ))}
      </group>

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
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <directionalLight position={[-5, -10, -5]} intensity={1} color="#a0c4ff" />
        <GlobeContent onClick={onClick} scrollY={scrollY} />
        {/* Removed Stars to match white background */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default WebGLGlobe;
