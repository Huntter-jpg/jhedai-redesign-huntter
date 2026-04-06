/**
 * Fibonacci Sphere Algorithm
 * Generates evenly distributed points on a sphere surface using the golden angle
 * This prevents clustering and creates a visually uniform distribution
 *
 * @param count - Number of particles to generate
 * @param radius - Radius of the sphere
 * @returns Float32Array with particle positions [x, y, z, x, y, z, ...]
 *
 * @example
 * const positions = generateFibonacciSphere(10000, 15);
 * // Use with THREE.BufferGeometry
 * geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
 */
export const generateFibonacciSphere = (
  count: number,
  radius: number,
): Float32Array => {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden angle in radians ≈ 2.399963...

  for (let i = 0; i < count; i++) {
    // Distribute y uniformly from 1 to -1
    const y = 1 - (i / (count - 1)) * 2;

    // Radius at this y level (circle radius on horizontal plane)
    const radiusAtY = Math.sqrt(1 - y * y);

    // Angle around the circle using golden angle
    const theta = phi * i;

    // Convert spherical to Cartesian coordinates
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Store position scaled by radius
    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }

  return positions;
};

/**
 * Generate additional "escaped" particles that float outside the main sphere
 * Adds depth and organic feel to the visualization
 *
 * @param spherePositions - Base sphere positions from generateFibonacciSphere
 * @param count - Number of particles on the sphere
 * @param escapePercentage - Percentage of particles to escape (0.1 = 10%)
 * @param minDistance - Minimum distance from sphere surface
 * @param maxDistance - Maximum distance from sphere surface
 * @returns Float32Array with escaped particle positions
 */
export const generateEscapedParticles = (
  spherePositions: Float32Array,
  count: number,
  escapePercentage = 0.12,
  minDistance = 1.2,
  maxDistance = 4.5,
): Float32Array => {
  const escapedCount = Math.floor(count * escapePercentage);
  const escapedPositions = new Float32Array(escapedCount * 3);

  for (let i = 0; i < escapedCount; i++) {
    // Pick a random sphere particle as base
    const sphereIdx = Math.floor(Math.random() * count);
    const baseX = spherePositions[sphereIdx * 3];
    const baseY = spherePositions[sphereIdx * 3 + 1];
    const baseZ = spherePositions[sphereIdx * 3 + 2];

    // Calculate normalized direction from sphere center
    const length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
    const dirX = baseX / length;
    const dirY = baseY / length;
    const dirZ = baseZ / length;

    // Extend outward by random distance
    const escapeDistance =
      minDistance + Math.random() * (maxDistance - minDistance);

    escapedPositions[i * 3] = baseX + dirX * escapeDistance;
    escapedPositions[i * 3 + 1] = baseY + dirY * escapeDistance;
    escapedPositions[i * 3 + 2] = baseZ + dirZ * escapeDistance;
  }

  return escapedPositions;
};
