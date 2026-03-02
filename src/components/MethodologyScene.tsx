import { useRef, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInViewport } from '../hooks/useInViewport';
import { getLODConfig } from '../utils/deviceDetection';

const FloatingOrb = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.8;
        meshRef.current.rotation.x = t * 0.2 * speed;
        meshRef.current.rotation.z = t * 0.1 * speed;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                roughness={0.4}
                metalness={0.3}
                emissive={color}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

const MethodologyScene = () => {
    const { ref, isInViewport } = useInViewport(0.1, '200px', true);
    const lodConfig = getLODConfig();

    return (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 12], fov: 50 }}
                dpr={lodConfig.dpr}
                gl={{ alpha: true, antialias: lodConfig.antialias }}
                frameloop={isInViewport ? 'always' : 'never'}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <FloatingOrb position={[-9, 4, -5]} color="#003865" speed={0.5} />
                <FloatingOrb position={[-3, -5, -2]} color="#00A9E0" speed={0.7} />
                <FloatingOrb position={[5, 6, -4]} color="#FF585D" speed={0.6} />
                <FloatingOrb position={[10, -3, -6]} color="#003865" speed={0.4} />
            </Canvas>
        </div>
    );
};

export default memo(MethodologyScene);
