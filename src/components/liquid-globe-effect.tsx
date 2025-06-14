import Sketch from "react-p5";
import type p5Type from "p5"; // Renamed to avoid conflict with p5 instance

interface LiquidGlobeEffectProps {
  size: number;
}

export function LiquidGlobeEffect({ size }: LiquidGlobeEffectProps) {
  let noiseOffsetX = 0;
  let noiseOffsetY = 10000; // Different starting points for x and y noise

  const setup = (p5: p5Type, canvasParentRef: Element) => {
    p5.createCanvas(size, size).parent(canvasParentRef);
    p5.colorMode(p5.RGB);
  };

  const draw = (p5: p5Type) => {
    p5.clear(); // Clear with transparency, or use p5.background(0,0,0,0) if needed

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35; // Adjust radius to be a bit smaller than canvas to see the effect
    const mouseInfluenceFactor = 0.2; // How much the mouse proximity affects the bulge (0 to 1)
    const noiseMagnitude = size * 0.1; // How much the Perlin noise affects the shape

    p5.fill(50, 100, 255); // Blue color for the globe
    p5.noStroke();

    p5.beginShape();
    const angleStep = p5.TWO_PI / 120; // Number of vertices for the circle

    for (let angle = 0; angle < p5.TWO_PI; angle += angleStep) {
      // Base circle point
      const baseX = centerX + radius * p5.cos(angle);
      const baseY = centerY + radius * p5.sin(angle);

      // Calculate vector from mouse to base point
      const vecToMouseX = p5.mouseX - baseX;
      const vecToMouseY = p5.mouseY - baseY;
      let distToMouse = p5.dist(p5.mouseX, p5.mouseY, baseX, baseY);

      // Normalize vector to mouse
      const normVecToMouseX = vecToMouseX / (distToMouse + 0.00001); // Add epsilon to avoid division by zero
      const normVecToMouseY = vecToMouseY / (distToMouse + 0.00001);

      // Displacement based on mouse proximity (closer means more outward bulge)
      // The displacement is in the opposite direction of the vector to the mouse (i.e., away from the mouse)
      // We want points on the circumference near the mouse to bulge outwards from the center.

      // Vector from center to current point on circumference
      const vecCenterX = baseX - centerX;
      const vecCenterY = baseY - centerY;
      const distToCenter = p5.sqrt(vecCenterX * vecCenterX + vecCenterY * vecCenterY);
      const normVecCenterX = vecCenterX / (distToCenter + 0.00001);
      const normVecCenterY = vecCenterY / (distToCenter + 0.00001);

      // Calculate how much to bulge based on mouse distance from the *center* of the globe
      // This makes the whole side of the globe bulge a bit.
      let mouseDistFromCenter = p5.dist(p5.mouseX, p5.mouseY, centerX, centerY);
      let proximityEffect = p5.max(0, (radius * 2 - mouseDistFromCenter) / (radius * 2)); // 0 to 1, 1 when mouse is at center

      // More refined: bulge points on circumference that are "aligned" with the mouse direction from center
      const mouseAngle = p5.atan2(p5.mouseY - centerY, p5.mouseX - centerX);
      const pointAngle = p5.atan2(baseY - centerY, baseX - centerX);
      let angleDifference = p5.abs(p5.degrees(mouseAngle) - p5.degrees(pointAngle));
      if (angleDifference > 180) angleDifference = 360 - angleDifference; // Ensure shortest angle

      // Bulge factor based on angular alignment with mouse (max bulge at 0 deg diff, min at 180 deg diff)
      // and proximity of mouse to the globe's center
      let bulgeAmount = 0;
      if (mouseDistFromCenter < radius * 1.5) { // Only bulge if mouse is somewhat close to the globe
         bulgeAmount = p5.map(angleDifference, 0, 90, radius * mouseInfluenceFactor * proximityEffect, 0, true); // true constrains output
         bulgeAmount = p5.max(0, bulgeAmount); // Ensure it doesn't go negative
      }


      // Perlin noise displacement (along the normal to the circle)
      const noiseVal = p5.noise(noiseOffsetX + p5.cos(angle) * 0.5, noiseOffsetY + p5.sin(angle) * 0.5); // Vary noise input based on angle
      const noiseDisplacementX = normVecCenterX * noiseMagnitude * (noiseVal - 0.5) * 2; // Noise can push in or out
      const noiseDisplacementY = normVecCenterY * noiseMagnitude * (noiseVal - 0.5) * 2;

      // Combine displacements
      // Bulge outwards along the normal from the center
      const displacedX = baseX + normVecCenterX * bulgeAmount + noiseDisplacementX;
      const displacedY = baseY + normVecCenterY * bulgeAmount + noiseDisplacementY;

      p5.vertex(displacedX, displacedY);
    }
    p5.endShape(p5.CLOSE);

    noiseOffsetX += 0.005; // Increment noise offset for animation
    noiseOffsetY += 0.005;
  };

  // It's important to type p5 in setup and draw, and the Sketch component
  return <Sketch setup={setup} draw={draw} />;
}
