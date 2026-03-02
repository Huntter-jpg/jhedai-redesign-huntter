import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, memo } from 'react';
import * as THREE from 'three';
import { generateFibonacciSphere, generateEscapedParticles } from '../utils/fibonacciSphere';
import { getParticleCount, getLODConfig } from '../utils/deviceDetection';
import { useInViewport } from '../hooks/useInViewport';

// Configuration for the giant particle sphere
const SPHERE_CONFIG = {
    baseParticleCount: 80000,  // Base count for high-end desktop
    radius: 4.55,  // Reduced by 30% from 6.5
    pulseAmplitude: 0.06,
    pulseSpeed: 0.4,
    rotationSpeed: { x: 0.03, y: 0.05, z: 0.01 }, // radians/second
    cameraPosition: [0, 0, 20] as [number, number, number],  // Closer camera
    cameraFov: 50,
    escapePercentage: 0.12, // 12% of particles escape the sphere
};

const SphereParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Calculate particle count based on device performance
    const particleCount = getParticleCount(SPHERE_CONFIG.baseParticleCount);

    const { positions, sizes, randoms } = useMemo(() => {
        // Generate main sphere particles using Fibonacci distribution
        const spherePositions = generateFibonacciSphere(particleCount, SPHERE_CONFIG.radius);

        // Generate escaped particles for depth
        const escapedPositions = generateEscapedParticles(
            spherePositions,
            particleCount,
            SPHERE_CONFIG.escapePercentage
        );

        const escapedCount = escapedPositions.length / 3;
        const totalCount = particleCount + escapedCount;

        // Combine sphere and escaped particles
        const combinedPositions = new Float32Array(totalCount * 3);
        combinedPositions.set(spherePositions, 0);
        combinedPositions.set(escapedPositions, particleCount * 3);

        // Generate sizes and random values for all particles
        const sizes = new Float32Array(totalCount);
        const randoms = new Float32Array(totalCount);

        for (let i = 0; i < totalCount; i++) {
            // Sphere particles: sizes 1.0-3.5
            // Escaped particles: smaller sizes 0.5-2.0
            const isEscaped = i >= particleCount;
            sizes[i] = isEscaped
                ? 0.5 + Math.random() * 1.5
                : 1.0 + Math.random() * 2.5;
            randoms[i] = Math.random();
        }

        return { positions: combinedPositions, sizes, randoms };
    }, [particleCount]);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color('#003865') }, // navy
                uColor2: { value: new THREE.Color('#00A9E0') }, // cyan
                uColor3: { value: new THREE.Color('#4FC3F7') }, // light cyan
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uPulseAmplitude: { value: SPHERE_CONFIG.pulseAmplitude },
                uPulseSpeed: { value: SPHERE_CONFIG.pulseSpeed },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aRandom;
                uniform float uTime;
                uniform float uPixelRatio;
                uniform float uPulseAmplitude;
                uniform float uPulseSpeed;

                varying float vAlpha;
                varying float vDistanceFromCenter;
                varying float vRandom;

                void main() {
                    // === ANIMATION LAYER 1: Base position ===
                    vec3 pos = position;

                    // === ANIMATION LAYER 2: Pulsing (breathing effect) ===
                    float pulse = sin(uTime * uPulseSpeed) * uPulseAmplitude;
                    pos *= (1.0 + pulse);

                    // === ANIMATION LAYER 3: Micro-float on surface ===
                    // Create tangent space for surface movement
                    float surfacePhase = aRandom * 6.28318;
                    vec3 tangent = normalize(cross(pos, vec3(0.0, 1.0, 0.0)));
                    vec3 bitangent = normalize(cross(pos, tangent));

                    // Float particles along surface
                    pos += tangent * sin(uTime * 0.3 + surfacePhase) * 0.15;
                    pos += bitangent * cos(uTime * 0.25 + surfacePhase * 1.3) * 0.12;

                    // === DEPTH CALCULATIONS ===
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    float depth = -mvPosition.z;

                    // Store values for fragment shader
                    vDistanceFromCenter = length(pos);
                    vRandom = aRandom;

                    // Fade particles based on depth (approximates depth sorting)
                    vAlpha = smoothstep(35.0, 5.0, depth);
                    vAlpha = clamp(vAlpha, 0.3, 1.0);

                    // === POINT SIZE (with perspective) ===
                    gl_PointSize = aSize * uPixelRatio * (8.0 / max(depth, 1.0));
                    gl_PointSize = max(gl_PointSize, 1.2);

                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform vec3 uColor3;
                uniform float uTime;

                varying float vAlpha;
                varying float vDistanceFromCenter;
                varying float vRandom;

                void main() {
                    // === PARTICLE SHAPE (circular) ===
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    // === SOFT EDGE ===
                    float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
                    alpha = pow(alpha, 1.2);
                    alpha *= vAlpha;

                    // === COLOR GRADIENT (vertical wave across sphere) ===
                    float colorPhase = vDistanceFromCenter * 0.3 + uTime * 0.1;
                    vec3 color = mix(uColor1, uColor2, sin(colorPhase) * 0.5 + 0.5);

                    // Mix in light cyan for highlights
                    color = mix(color, uColor3, vRandom * 0.5);

                    // Brighten overall - increased from 1.3 to 1.8 for more brightness
                    color *= 1.8;

                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame((state) => {
        if (!pointsRef.current || !materialRef.current) return;
        const t = state.clock.getElapsedTime();

        // === ANIMATION LAYER 4: Global rotation ===
        pointsRef.current.rotation.x = t * SPHERE_CONFIG.rotationSpeed.x;
        pointsRef.current.rotation.y = t * SPHERE_CONFIG.rotationSpeed.y;
        pointsRef.current.rotation.z = t * SPHERE_CONFIG.rotationSpeed.z;

        // Update shader time uniform
        materialRef.current.uniforms.uTime.value = t;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
            </bufferGeometry>
            <primitive ref={materialRef} object={shaderMaterial} attach="material" />
        </points>
    );
};

const ParticleSphere = () => {
    const { ref, isInViewport } = useInViewport(0.1, '200px', true);
    const lodConfig = getLODConfig();

    return (
        <div ref={ref} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: SPHERE_CONFIG.cameraPosition, fov: SPHERE_CONFIG.cameraFov }}
                dpr={lodConfig.dpr}
                gl={{ alpha: true, antialias: lodConfig.antialias, powerPreference: 'low-power' }}
                frameloop={isInViewport ? 'always' : 'never'}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <SphereParticles />
            </Canvas>
        </div>
    );
};

export default memo(ParticleSphere);
