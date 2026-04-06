import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingTorus = ({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + position[0];
    meshRef.current.rotation.y = t * 0.1 + position[1];
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.3 + position[0]) * 1.5;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.2 + position[1]) * 0.8;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.35, 48, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

const FloatingSphere = ({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.4 + position[0]) * 2;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.25 + position[1]) * 1.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

const Background3D = () => {
  const shapes = useMemo(
    () => ({
      tori: [
        {
          position: [-6, 3, -8] as [number, number, number],
          color: "#D4AF37",
          size: 2,
        },
        {
          position: [7, -2, -12] as [number, number, number],
          color: "#8B5CF6",
          size: 2.5,
        },
        {
          position: [0, -5, -15] as [number, number, number],
          color: "#D4AF37",
          size: 1.5,
        },
      ],
      spheres: [
        {
          position: [5, 4, -10] as [number, number, number],
          color: "#D4AF37",
          size: 3,
        },
        {
          position: [-8, -3, -14] as [number, number, number],
          color: "#6366F1",
          size: 2.5,
        },
      ],
    }),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8B5CF6" />

        {shapes.tori.map((s, i) => (
          <FloatingTorus key={`t-${i}`} {...s} />
        ))}
        {shapes.spheres.map((s, i) => (
          <FloatingSphere key={`s-${i}`} {...s} />
        ))}
      </Canvas>
    </div>
  );
};

export default Background3D;
