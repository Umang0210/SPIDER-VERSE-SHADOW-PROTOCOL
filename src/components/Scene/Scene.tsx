"use client";

import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import City from "./City";
import Hero from "./Hero";
import Atmosphere from "./Atmosphere";
import CameraManager from "./CameraManager";
import { Bloom, EffectComposer, Noise, Glitch, Vignette } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

export default function Scene() {
  const scroll = useScroll();
  const { viewport } = useThree();

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 50]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 10, 10]} intensity={1} color="#ff00ff" />

      <CameraManager />
      
      <Hero />
      <City />
      <Atmosphere />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.5} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.05} />
        
        <ScrollControlledGlitch scroll={scroll} />
      </EffectComposer>
    </>
  );
}

function ScrollControlledGlitch({ scroll }: { scroll: any }) {
  const glitchRef = useRef<any>(null);
  
  useFrame(() => {
    const s = scroll.offset;
    if (glitchRef.current) {
      // Activate glitch heavily in Scene 5 (0.66 - 0.83)
      if (s > 0.65 && s < 0.85) {
        glitchRef.current.strength = new THREE.Vector2(0.3, 0.3);
        glitchRef.current.active = true;
      } else {
        glitchRef.current.active = false;
      }
    }
  });

  return (
    <Glitch
      ref={glitchRef}
      delay={new THREE.Vector2(1.5, 3.5)}
      duration={new THREE.Vector2(0.6, 1.0)}
      strength={new THREE.Vector2(0.3, 1.0)}
      mode={GlitchMode.CONSTANT_WILD}
      active={false}
      ratio={0.85}
    />
  );
}
