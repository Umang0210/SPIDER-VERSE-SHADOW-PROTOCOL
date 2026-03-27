"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Points, PointMaterial, useScroll } from "@react-three/drei";

export default function Atmosphere() {
  const scroll = useScroll();
  const pointsRef = useRef<THREE.Points>(null);
  const fogRef = useRef<THREE.Points>(null);

  // Generate rain/particle data
  const particles = useMemo(() => {
    const temp = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 1] = Math.random() * 50;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, []);

  // Generate "Spider-Glitch" particles
  const glitchParticles = useMemo(() => {
    const temp = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  useFrame((state) => {
    const s = scroll.offset;
    const time = state.clock.getElapsedTime();

    if (pointsRef.current) {
      // Particles fall down (Rain effect)
      pointsRef.current.position.y = - (time % 1) * 20;
    }

    if (fogRef.current) {
      // Particles move with scroll and time (Glitch effect)
      fogRef.current.rotation.y = time * 0.1;
      fogRef.current.position.y = s * 10;
      fogRef.current.visible = s > 0.6; // Only show glitch particles in latter half
    }
  });

  return (
    <group>
      {/* Cinematic Rain */}
      <Points positions={particles} stride={3} ref={pointsRef}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>

      {/* Multiverse Glitch Cubes */}
      <Points positions={glitchParticles} stride={3} ref={fogRef}>
        <PointMaterial
          transparent
          color="#ff00ff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
      
      {/* Background Fog Layer */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#050505" side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
