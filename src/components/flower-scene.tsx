"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, Cylinder, Html } from "@react-three/drei"
import * as THREE from "three"

type AppType = "EVA" | "QCX" | "FIX" | null;

interface PetalProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  app: AppType
  color: string
  isHovered: boolean
  onHover: (app: AppType) => void
}

function Petal({
  position,
  rotation,
  scale = 1,
  app,
  color,
  isHovered,
  onHover
}: PetalProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create custom petal shape
  const petalShape = useMemo(() => {
    const shape = new THREE.Shape()

    // Draw petal outline (elliptical shape)
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0, 0.3, 0.2, 0.8, 0.4, 1.2)
    shape.bezierCurveTo(0.5, 1.5, 0.5, 1.8, 0.4, 2.0)
    shape.bezierCurveTo(0.3, 2.1, 0.1, 2.15, 0, 2.15)
    shape.bezierCurveTo(-0.1, 2.15, -0.3, 2.1, -0.4, 2.0)
    shape.bezierCurveTo(-0.5, 1.8, -0.5, 1.5, -0.4, 1.2)
    shape.bezierCurveTo(-0.2, 0.8, 0, 0.3, 0, 0)

    return shape
  }, [])

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    }),
    [],
  )

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation per petal
      const time = state.clock.elapsedTime
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.03

      // Interpolate scale for hover effect
      const targetScale = isHovered ? scale * 1.05 : scale
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      )
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={(e) => { e.stopPropagation(); onHover(app) }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null) }}
      >
        <extrudeGeometry args={[petalShape, extrudeSettings]} />
        {/* Glassmorphic Material */}
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          specularIntensity={1}
          specularColor="#ffffff"
          side={THREE.DoubleSide}
          transparent
        />

        {/* Floating Label */}
        {isHovered && (
          <Html position={[0, 1.2, 0.1]} center zIndexRange={[100, 0]} className="pointer-events-none">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white font-semibold tracking-wider text-sm transition-opacity animate-in fade-in duration-300">
              {app}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  )
}

function Stamen({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.02
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <Cylinder args={[0.015, 0.015, 0.4, 8]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.8} />
      </Cylinder>
      <Sphere args={[0.04, 16, 16]} position={[0, 0.42, 0]}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.5} emissive="#ffffff" emissiveIntensity={0.2} />
      </Sphere>
    </group>
  )
}

interface FlowerSceneProps {
  onHoverChange?: (app: AppType) => void;
}

export function FlowerScene({ onHoverChange }: FlowerSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationYRef = useRef(0)
  const [hoveredApp, setHoveredApp] = useState<AppType>(null)

  const handleHover = (app: AppType) => {
    setHoveredApp(app)
    if (onHoverChange) {
      onHoverChange(app)
    }
  }

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation logic: pause if hovered
      if (!hoveredApp) {
        rotationYRef.current += delta * 0.3
      }

      const time = state.clock.elapsedTime

      // Complex wobble / rotation
      const wobbleX = Math.sin(time * 0.5) * 0.1
      const wobbleZ = Math.cos(time * 0.4) * 0.1
      const tiltX = Math.PI * 0.15 // Base downward tilt to face camera more

      groupRef.current.rotation.set(
        tiltX + wobbleX,
        rotationYRef.current,
        wobbleZ
      )

      // Floating up and down
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.1 - 0.5 // slightly lower so it centers well
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Center of flower (Receptacle) */}
      <Sphere args={[0.25, 32, 32]} position={[0, 0, 0]} scale={[1, 0.5, 1]}>
        <meshPhysicalMaterial
           color="#ffffff"
           roughness={0.1}
           metalness={0.8}
           clearcoat={1}
           clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Three Apps as Petals */}
      <Petal
        app="EVA"
        color="#a78bfa" // Purple-ish
        position={[0, 0, 0.35]}
        rotation={[Math.PI * 0.45, 0, 0]}
        scale={0.9}
        isHovered={hoveredApp === "EVA"}
        onHover={handleHover}
      />
      <Petal
        app="QCX"
        color="#60a5fa" // Blue-ish
        position={[-0.3, 0, -0.17]}
        rotation={[Math.PI * 0.45, 0, (Math.PI * 2) / 3]}
        scale={0.9}
        isHovered={hoveredApp === "QCX"}
        onHover={handleHover}
      />
      <Petal
        app="FIX"
        color="#f472b6" // Pink-ish
        position={[0.3, 0, -0.17]}
        rotation={[Math.PI * 0.45, 0, -(Math.PI * 2) / 3]}
        scale={0.9}
        isHovered={hoveredApp === "FIX"}
        onHover={handleHover}
      />

      {/* Stamens */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.15
        return <Stamen key={i} index={i} position={[Math.cos(angle) * radius, 0.05, Math.sin(angle) * radius]} />
      })}
    </group>
  )
}
