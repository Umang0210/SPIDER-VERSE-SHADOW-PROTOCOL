"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Scene from "./Scene";
import Overlay from "../UI/Overlay";

export default function ShadowApp() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div style={{ height: "600vh", width: "100%" }} /> {/* Spacer for scrolling */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#050505", zIndex: 0 }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
      <Overlay scrollProgress={scrollProgress} />
    </>
  );
}
