"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Scene from "./Scene";
import Overlay from "../UI/Overlay";

export default function ShadowApp() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main style={{ height: "100vh", background: "#050505", overflow: "hidden" }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.15}>
            <Scene />
            <Scroll html>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
