"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import City from "./City";
import Hero from "./Hero";
import Atmosphere from "./Atmosphere";
import CameraManager from "./CameraManager";
import { Bloom, EffectComposer, Noise, Glitch, Vignette } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

export default function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 50]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 10, 10]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, 5, 10]} intensity={2} color="#ffffff" />

      <CameraManager scrollProgress={scrollProgress} />
      
      <Hero scrollProgress={scrollProgress} />
      <City scrollProgress={scrollProgress} />
      <Atmosphere scrollProgress={scrollProgress} />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.5} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.05} />
        
        <ScrollControlledGlitch scrollProgress={scrollProgress} />
      </EffectComposer>
    </>
  );
}

function ScrollControlledGlitch({ scrollProgress }: { scrollProgress: number }) {
  const glitchRef = useRef<any>(null);
  
  useFrame(() => {
    if (glitchRef.current) {
      if (scrollProgress > 0.65 && scrollProgress < 0.85) {
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
