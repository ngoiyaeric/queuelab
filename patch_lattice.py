import re

with open('src/components/sphere-lattice-animation.tsx', 'r') as f:
    content = f.read()

# Replace the lattice rendering block
old_block = """      squares.push(
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
      );"""

new_block = """      squares.push(
        <group key={`${i}-${j}`} position={[i * spacing, j * spacing, 0]}>
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={isHighlighted ? "#ffffff" : "#1a365d"}
              wireframe={!isHighlighted}
              transparent
              opacity={isHighlighted ? Math.max(0.2, unveilProgress) : Math.max(0.1, unveilProgress * 0.5)}
              side={THREE.DoubleSide}
            />
            {/* Darker border for the highlighted white tiles */}
            {isHighlighted && (
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(1, 1)]} />
                <lineBasicMaterial color="#000000" transparent opacity={unveilProgress} />
              </lineSegments>
            )}
          </mesh>
          {isHighlighted && (
            <Text
              position={[0, 0, 0.01]} // Slightly in front of the plane
              fontSize={0.25}
              color="black"
              anchorX="center"
              anchorY="middle"
              material-transparent
              material-opacity={unveilProgress}
            >
              {text}
            </Text>
          )}
        </group>
      );"""

content = content.replace(old_block, new_block)

with open('src/components/sphere-lattice-animation.tsx', 'w') as f:
    f.write(content)

print("Patched.")
