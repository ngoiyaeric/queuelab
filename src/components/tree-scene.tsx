"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export function TreeScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture("/assets/tree.png")
  const { viewport } = useThree()

  // Responsive scaling based on viewport width
  const isMobile = viewport.width < 7
  const scale = isMobile ? 5 : 7.5

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle swaying animation
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      // Gentle floating animation
      meshRef.current.position.y = (isMobile ? 0.8 : 1.2) + Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
  })

  // Calculate aspect ratio of the texture
  // Casting to any to avoid TS errors with the texture image property in some environments
  const textureImage = texture.image as any
  const aspect = textureImage && textureImage.width ? textureImage.width / textureImage.height : 1

  return (
    <mesh ref={meshRef} position={[0, isMobile ? 0.8 : 1.2, 0]} scale={[scale * aspect, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        alphaTest={0.1}
        side={THREE.DoubleSide}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}
