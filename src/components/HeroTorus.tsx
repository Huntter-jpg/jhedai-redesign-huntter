import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, memo } from "react";
import * as THREE from "three";
import { useInViewport } from "../hooks/useInViewport";

const PARTICLE_COUNT = 10000;
const MOBIUS_RADIUS = 1.4;
const STRIP_HALF_WIDTH = 0.5;

const ParticleMobius = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const initializedRef = useRef(false);

  const { positions, mobiusPositions, randomOffsets, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const mobiusPositions = new Float32Array(PARTICLE_COUNT * 3);
    const randomOffsets = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Parametric Möbius strip
      const u = Math.random() * Math.PI * 2; // around the strip
      const v = (Math.random() - 0.5) * 2 * STRIP_HALF_WIDTH; // across the width

      // Möbius parametric equations
      const x = (MOBIUS_RADIUS + v * Math.cos(u / 2)) * Math.cos(u);
      const y = (MOBIUS_RADIUS + v * Math.cos(u / 2)) * Math.sin(u);
      const z = v * Math.sin(u / 2);

      mobiusPositions[i3] = x;
      mobiusPositions[i3 + 1] = y;
      mobiusPositions[i3 + 2] = z;

      // Scatter offsets — moderate, proportional to shape
      const scatter = 1.0 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * scatter;

      randomOffsets[i3] = Math.cos(angle) * r;
      randomOffsets[i3 + 1] = Math.sin(angle) * r;
      randomOffsets[i3 + 2] = (Math.random() - 0.5) * scatter;

      positions[i3] = mobiusPositions[i3];
      positions[i3 + 1] = mobiusPositions[i3 + 1];
      positions[i3 + 2] = mobiusPositions[i3 + 2];

      sizes[i] = 1.0 + Math.random() * 3.0;
    }

    return { positions, mobiusPositions, randomOffsets, sizes };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#003865") },
        uColor2: { value: new THREE.Color("#00A9E0") },
        uColor3: { value: new THREE.Color("#FF585D") },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aMobiusPosition;
        attribute vec3 aRandomOffset;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vDistance;
        varying float vRandom;

        void main() {
          // === GPU-BASED POSITION INTERPOLATION ===
          // Cycle: Formed -> Scattered -> Formed
          float cycle = uTime * 0.3;
          float raw = sin(cycle);
          float normalized = (raw + 1.0) / 2.0;
          float pw = pow(normalized, 4.0);

          // Interpolate between Möbius position and scattered position
          vec3 pos = aMobiusPosition + aRandomOffset * pw;

          // Organic movement (same as CPU version)
          float organic = sin(float(gl_VertexID) * 0.1 + uTime) * 0.03;
          pos += organic;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vDistance = length(pos.xyz) / 3.0;
          vRandom = aSize / 4.0;
          gl_PointSize = aSize * uPixelRatio * (8.0 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        varying float vDistance;
        varying float vRandom;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          alpha *= 0.85;

          vec3 color = mix(uColor1, uColor2, vDistance);
          float orangeMix = sin(vRandom * 6.28 + uTime * 0.8) * 0.5 + 0.5;
          color = mix(color, uColor3, orangeMix * 0.18);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    // Initialize rotation on first frame to prevent jumps
    if (!initializedRef.current) {
      pointsRef.current.rotation.x = Math.PI * 0.3;
      pointsRef.current.rotation.y = 0;
      pointsRef.current.rotation.z = 0;
      initializedRef.current = true;
    }

    const t = state.clock.getElapsedTime();

    // Slow elegant rotation using delta time for frame-rate independence
    pointsRef.current.rotation.x += 0.08 * delta;
    pointsRef.current.rotation.y += 0.15 * delta;
    pointsRef.current.rotation.z += 0.03 * delta;

    // Update shader time uniform (position calculation now in GPU)
    materialRef.current.uniforms.uTime.value = t;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute
          attach="attributes-aMobiusPosition"
          args={[mobiusPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomOffset"
          args={[randomOffsets, 3]}
        />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <primitive ref={materialRef} object={shaderMaterial} attach="material" />
    </points>
  );
};

const HeroTorus = () => {
  const { ref, isInViewport } = useInViewport(0.1, "0px", true);

  return (
    <div ref={ref} className="w-full h-full overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={isInViewport ? "always" : "never"}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        <ParticleMobius />
      </Canvas>
    </div>
  );
};

export default memo(HeroTorus);
