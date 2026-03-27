"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useScroll, MeshDistortMaterial, Float, useGLTF } from "@react-three/drei";

export default function Hero() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  // Create an original "Spider-Verse" suit style using shaders
  // Standard geometries for "original hero" design
  const { viewport } = useThree();

  useFrame((state) => {
    const s = scroll.offset;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Scene 1-2: Descending into city
      if (s < 0.2) {
        groupRef.current.position.y = 10 - s * 50;
        groupRef.current.rotation.x = Math.PI / 4;
      } 
      // Scene 3: Rooftop land (crouch)
      else if (s < 0.4) {
        groupRef.current.position.y = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.position.z = 2;
      }
      // Scene 4: Action Swing
      else if (s < 0.6) {
        const actionS = (s - 0.4) * 5; // 0 to 1
        groupRef.current.position.x = Math.sin(actionS * Math.PI) * 10;
        groupRef.current.position.y = Math.cos(actionS * Math.PI) * 5;
        groupRef.current.rotation.z = Math.sin(actionS * Math.PI) * 0.5;
        groupRef.current.position.z = 0;
      }
      // Scene 5-6: Glitch and Final Pose
      else {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = (s - 0.8) * 2;
        groupRef.current.position.z = 5;
        groupRef.current.rotation.z = 0;
      }

      // Micro-animations (pulse/breathing)
      if (bodyRef.current) {
        bodyRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Head */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.25, 24, 24]} />
          <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
        </mesh>
        
        {/* Glow eyes */}
        <mesh position={[0.1, 1.65, 0.2]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} />
        </mesh>
        <mesh position={[-0.1, 1.65, 0.2]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} />
        </mesh>

        {/* Body */}
        <mesh ref={bodyRef}>
          <capsuleGeometry args={[0.4, 1.2, 4, 16]} />
          <MeshDistortMaterial
            color="#050505"
            speed={2}
            distort={0.1}
            roughness={0.1}
            metalness={1}
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Suit Accents (Shadow Protocol Style) */}
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[0.5, 0.8, 0.05]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}
