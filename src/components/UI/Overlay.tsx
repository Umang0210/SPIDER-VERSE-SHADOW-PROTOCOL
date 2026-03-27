"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overlay() {
  const scroll = useScroll();
  const [activeScene, setActiveScene] = useState(0);

  useFrame(() => {
    const s = scroll.offset;
    if (s < 0.16) setActiveScene(1);
    else if (s < 0.33) setActiveScene(2);
    else if (s < 0.50) setActiveScene(3);
    else if (s < 0.66) setActiveScene(4);
    else if (s < 0.83) setActiveScene(5);
    else setActiveScene(6);
  });

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="scene-overlay"
        >
          {activeScene === 1 && (
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-black neon-text-cyan">
                A Hero Is Not Born…
              </h1>
              <p className="mt-4 tracking-widest opacity-50">SCROLL TO BEGIN THE DATA SYNC</p>
            </div>
          )}

          {activeScene === 3 && (
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-black neon-text-magenta">
                …He Is Forged
              </h1>
            </div>
          )}

          {activeScene === 5 && (
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-black italic glitch-text">
                MULTIVERSE SYNC ERROR
              </h1>
              <p className="text-cyan-400 font-mono text-sm mt-2">DECODING REALITY...</p>
            </div>
          )}

          {activeScene === 6 && (
            <div className="text-center glass-panel p-12 max-w-lg">
              <h2 className="text-4xl font-black text-white glow-gold">
                SPIDER-VERSE
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed uppercase tracking-tighter text-sm">
                PROTOCOL: SHADOW IS COMPLETE. THE WEB IS YOURS TO EXPLORE.
              </p>
              <button className="mt-8 px-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300">
                ENTER THE WEBVERSE
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Global Cinematic Elements */}
      <div className="fixed top-12 left-12 opacity-30 text-[10px] tracking-[0.5em] font-mono">
        SYSTEM STATUS: ONLINE / PROTOCOL_V3.8
      </div>
      <div className="fixed bottom-12 right-12 opacity-30 text-[10px] tracking-[0.5em] font-mono">
        {Math.floor(scroll.offset * 100)}% SYNCED
      </div>
    </div>
  );
}
