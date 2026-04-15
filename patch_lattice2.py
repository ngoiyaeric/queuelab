import re

with open('src/components/sphere-lattice-animation.tsx', 'r') as f:
    content = f.read()

# Make the outer line geometry have a black border
old_block = """            {/* Darker border for the highlighted white tiles */}
            {isHighlighted && (
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(1, 1)]} />
                <lineBasicMaterial color="#000000" transparent opacity={unveilProgress} />
              </lineSegments>
            )}"""

new_block = """            {/* Darker border for the highlighted white tiles */}
            {isHighlighted && (
              <mesh>
                 <planeGeometry args={[1.05, 1.05]} />
                 <meshBasicMaterial color="#3182ce" wireframe transparent opacity={unveilProgress * 0.8} />
              </mesh>
            )}"""

content = content.replace(old_block, new_block)

with open('src/components/sphere-lattice-animation.tsx', 'w') as f:
    f.write(content)

print("Patched.")
