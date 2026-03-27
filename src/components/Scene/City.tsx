"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

const BUILDING_COUNT = 100;

export default function City({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const buildings = useMemo(() => {
    return Array.from({ length: BUILDING_COUNT }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        0,
        (Math.random() - 0.5) * 60,
      ] as [number, number, number],
      scale: [
        1 + Math.random() * 2,
        5 + Math.random() * 20,
        1 + Math.random() * 2,
      ] as [number, number, number],
      color: Math.random() > 0.5 ? "#00ffff" : "#ff00ff",
    }));
  }, []);

  useFrame((state) => {
    const s = scrollProgress;
    if (groupRef.current) {
      groupRef.current.position.y = -s * 20; 
      groupRef.current.rotation.y = s * 0.1; 
    }
  });

  return (
    <group ref={groupRef} position={[0, -10, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#020202" roughness={0.1} metalness={0.8} />
      </mesh>

      <Instances range={BUILDING_COUNT}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0} metalness={1} />
        {buildings.map((b, i) => (
          <BuildingInstance key={i} {...b} />
        ))}
      </Instances>

      {buildings.slice(0, 20).map((b, i) => (
        <mesh key={`neon-${i}`} position={[b.position[0], b.scale[1] / 2, b.position[2]]}>
          <boxGeometry args={[b.scale[0] + 0.1, b.scale[1], b.scale[2] + 0.1]} />
          <meshStandardMaterial 
            color={b.color} 
            emissive={b.color} 
            emissiveIntensity={10} 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function BuildingInstance({ position, scale, color }: any) {
  const ref = useRef<any>(null);
  
  return (
    <Instance
      ref={ref}
      position={[position[0], scale[1] / 2, position[2]]}
      scale={scale}
      color="#111111"
    />
  );
}
