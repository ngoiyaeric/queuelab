"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export type TileType = 'text' | 'button' | 'image';

export interface TileConfig {
  /** Grid column index (integer, can be negative) */
  gridX: number;
  /** Grid row index (integer, can be negative) */
  gridY: number;
  /** Tile content type */
  type: TileType;
  /** Label shown on text/button tiles */
  label?: string;
  /** Image URL for image tiles */
  src?: string;
  /** Alt text for image tiles */
  alt?: string;
  /** Click handler for button tiles */
  onClick?: () => void;
  /** Optional tile background color override */
  color?: string;
}

const DEFAULT_TILES: TileConfig[] = [
  { gridX: -1, gridY: 0, type: 'text', label: 'EVA' },
  { gridX: 0,  gridY: 0, type: 'text', label: 'QCX' },
  { gridX: 1,  gridY: 0, type: 'text', label: 'FIX' },
];

// Background globe wireframe
const GlobeContent = ({
  scale = 1,
  opacity = 0.3,
  wireframe = true,
  color = "#4299e1",
  isBackground = false,
}: {
  scale?: number;
  opacity?: number;
  wireframe?: boolean;
  color?: string;
  isBackground?: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
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

interface TileProps {
  config: TileConfig;
  spacing: number;
  unveilProgress: number;
}

function Tile({ config, spacing, unveilProgress }: TileProps) {
  const { gridX, gridY, type, label, src, alt, onClick, color } = config;
  const tileColor = color ?? "#ffffff";
  const opacity = Math.max(0.2, unveilProgress);

  return (
    <group position={[gridX * spacing, gridY * spacing, 0]}>
      {/* Tile background plane */}
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={tileColor}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Blue border overlay */}
      <mesh>
        <planeGeometry args={[1.05, 1.05]} />
        <meshBasicMaterial color="#3182ce" wireframe transparent opacity={unveilProgress * 0.8} />
      </mesh>

      {/* Tile content */}
      {type === 'text' && label && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.25}
          color="black"
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={unveilProgress}
        >
          {label}
        </Text>
      )}

      {type === 'button' && (
        <Html
          center
          position={[0, 0, 0.02]}
          style={{ opacity: unveilProgress, pointerEvents: unveilProgress > 0.5 ? 'auto' : 'none' }}
        >
          <button
            onClick={onClick}
            style={{
              background: 'transparent',
              border: '1px solid #3182ce',
              color: '#1a365d',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {label ?? 'Button'}
          </button>
        </Html>
      )}

      {type === 'image' && src && (
        <Html center position={[0, 0, 0.02]} style={{ opacity: unveilProgress }}>
          <img
            src={src}
            alt={alt ?? label ?? ''}
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
          />
        </Html>
      )}
    </group>
  );
}

interface LatticeTileProps {
  gridX: number;
  gridY: number;
  spacing: number;
  unveilProgress: number;
}

function LatticeTile({ gridX, gridY, spacing, unveilProgress }: LatticeTileProps) {
  return (
    <group position={[gridX * spacing, gridY * spacing, 0]}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#1a365d"
          wireframe
          transparent
          opacity={Math.max(0.1, unveilProgress * 0.5)}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export interface SphereLatticeAnimationProps {
  /**
   * Highlighted/interactive tiles. Each entry configures a tile at a specific
   * grid position with text, a button, or an image.
   * Defaults to three text tiles labelled EVA, QCX, FIX.
   */
  tiles?: TileConfig[];
  /** Number of columns (and rows) in the background lattice grid. Defaults to 5. */
  gridSize?: number;
  /** Spacing between grid cells in world units. Defaults to 1.2. */
  spacing?: number;
}

export function SphereLatticeAnimation({
  tiles = DEFAULT_TILES,
  gridSize = 5,
  spacing = 1.2,
}: SphereLatticeAnimationProps) {
  const [unveilProgress, setUnveilProgress] = useState(0);
  const [isUnveiling, setIsUnveiling] = useState(false);
  const centerSphereRef = useRef<THREE.Group>(null);
  const latticeGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsUnveiling(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_state, delta) => {
    if (isUnveiling && unveilProgress < 1) {
      setUnveilProgress(prev => Math.min(1, prev + delta * 0.5));
    }

    if (centerSphereRef.current) {
      const sphereScale = 1 - unveilProgress;
      centerSphereRef.current.scale.set(sphereScale, sphereScale, sphereScale);
      centerSphereRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial;
          const baseOpacity = mat.wireframe ? 0.3 : 0.1;
          mat.opacity = baseOpacity * (1 - unveilProgress);
        }
      });
    }

    if (latticeGroupRef.current) {
      latticeGroupRef.current.scale.set(unveilProgress, unveilProgress, unveilProgress);
    }
  });

  // Build a Set of highlighted positions for quick lookup
  const highlightedPositions = new Set(tiles.map(t => `${t.gridX},${t.gridY}`));

  const half = Math.floor(gridSize / 2);
  const backgroundTiles: React.ReactNode[] = [];
  for (let i = -half; i <= half; i++) {
    for (let j = -half; j <= half; j++) {
      if (!highlightedPositions.has(`${i},${j}`)) {
        backgroundTiles.push(
          <LatticeTile
            key={`bg-${i}-${j}`}
            gridX={i}
            gridY={j}
            spacing={spacing}
            unveilProgress={unveilProgress}
          />
        );
      }
    }
  }

  return (
    <>
      {/* Background Sphere */}
      <GlobeContent scale={3} opacity={0.05} color="#1a365d" isBackground />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      <group>
        {/* Center sphere that fades out during unveil */}
        <group ref={centerSphereRef}>
          <GlobeContent scale={1} opacity={0.3} color="#4299e1" />
        </group>

        {/* Lattice that scales in */}
        <group ref={latticeGroupRef} scale={[0, 0, 0]}>
          {backgroundTiles}
          {tiles.map(tile => (
            <Tile
              key={`tile-${tile.gridX}-${tile.gridY}`}
              config={tile}
              spacing={spacing}
              unveilProgress={unveilProgress}
            />
          ))}
        </group>
      </group>
    </>
  );
}