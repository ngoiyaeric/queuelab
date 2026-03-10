"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Cylinder } from "@react-three/drei"
import * as THREE from "three"

function Petal({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
}) {
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
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    }),
    [],
  )

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
      <extrudeGeometry args={[petalShape, extrudeSettings]} />
      <meshStandardMaterial color="#f8f9fa" roughness={0.4} metalness={0.1} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Stamen({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.03
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Stamen stem */}
      <Cylinder args={[0.015, 0.015, 0.4, 8]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#c9a961" roughness={0.6} />
      </Cylinder>

      {/* Stamen head (anther) */}
      <Sphere args={[0.05, 16, 16]} position={[0, 0.42, 0]}>
        <meshStandardMaterial color="#f4d03f" roughness={0.3} metalness={0.2} />
      </Sphere>
    </group>
  )
}

function Leaf({
  position,
  rotation,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape()

    // Draw leaf outline
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.1, 0.2, 0.15, 0.5, 0.15, 0.8)
    shape.bezierCurveTo(0.15, 1.0, 0.1, 1.2, 0, 1.3)
    shape.bezierCurveTo(-0.1, 1.2, -0.15, 1.0, -0.15, 0.8)
    shape.bezierCurveTo(-0.15, 0.5, -0.1, 0.2, 0, 0)

    return shape
  }, [])

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    }),
    [],
  )

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <extrudeGeometry args={[leafShape, extrudeSettings]} />
      <meshStandardMaterial color="#5a7a5e" roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

export function FlowerScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Center of flower */}
      <Sphere args={[0.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#c9a961" roughness={0.5} />
      </Sphere>

      {/* Three main petals arranged in triangular pattern */}
      <Petal position={[0, 0, 0.3]} rotation={[Math.PI * 0.4, 0, 0]} scale={0.85} />
      <Petal position={[-0.26, 0, -0.15]} rotation={[Math.PI * 0.4, 0, (Math.PI * 2) / 3]} scale={0.85} />
      <Petal position={[0.26, 0, -0.15]} rotation={[Math.PI * 0.4, 0, -(Math.PI * 2) / 3]} scale={0.85} />

      {/* Stamens (6 stamens in the center) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 0.12
        return <Stamen key={i} index={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} />
      })}

      {/* Three leaves below the flower */}
      <Leaf position={[0, -0.5, 0.4]} rotation={[-Math.PI * 0.2, 0, 0]} />
      <Leaf position={[-0.35, -0.5, -0.2]} rotation={[-Math.PI * 0.2, 0, (Math.PI * 2) / 3]} />
      <Leaf position={[0.35, -0.5, -0.2]} rotation={[-Math.PI * 0.2, 0, -(Math.PI * 2) / 3]} />
    </group>
  )
}
