"use client";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";

export default function CameraManager() {
  const scroll = useScroll();
  const { camera: rawCamera, mouse } = useThree();
  const camera = rawCamera as THREE.PerspectiveCamera;
  const initialFov = 50;

  useFrame((state, delta) => {
    const s = scroll.offset;
    const time = state.clock.getElapsedTime();

    // Scene definitions for Camera Pathways
    // Scene 1: Space Hook (0.0 to 0.16)
    if (s < 0.16) {
      const zoomS = s / 0.16;
      camera.position.z = THREE.MathUtils.lerp(18, 10, zoomS);
      camera.position.y = THREE.MathUtils.lerp(10, 5, zoomS);
      camera.lookAt(0, 2, 0);
    }
    // Scene 2: City Dive (0.16 to 0.33)
    else if (s < 0.33) {
      const diveS = (s - 0.16) / 0.17;
      camera.position.y = THREE.MathUtils.lerp(5, 1, diveS);
      camera.position.z = THREE.MathUtils.lerp(10, 5, diveS);
      camera.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 4, diveS);
    }
    // Scene 3: Hero Reveal (0.33 to 0.50)
    else if (s < 0.50) {
      const revealS = (s - 0.33) / 0.17;
      camera.position.set(0, 1, 6);
      camera.lookAt(0, 1, 0);
      camera.fov = initialFov - RevealLerp(revealS) * 10;
    }
    // Scene 4: Action Sequence (0.50 to 0.66)
    else if (s < 0.66) {
      const actionS = (s - 0.50) / 0.16;
      camera.position.x = Math.sin(actionS * Math.PI) * 15;
      camera.position.y = 5 + Math.cos(actionS * Math.PI) * 5;
      camera.position.z = 10;
      camera.lookAt(0, 2, 0);
      // "Cinematic Slow Motion" zoom
      camera.fov = initialFov + Math.sin(actionS * Math.PI) * 20;
    }
    // Scene 5: Multiverse Glitch (0.66 to 0.83)
    else if (s < 0.83) {
      const glitchS = (s - 0.66) / 0.17;
      camera.position.x = (Math.random() - 0.5) * glitchS * 0.5; // Visual camera shake
      camera.position.z = 8 + (Math.random() - 0.5) * glitchS; 
      camera.rotation.z = Math.sin(time * 10) * glitchS * 0.1;
    }
    // Scene 6: Final Hero Pose (0.83 to 1.0)
    else {
      const finalS = (s - 0.83) / 0.17;
      camera.position.lerp(new THREE.Vector3(0, 1.5, 4), 0.1);
      camera.lookAt(0, 1.2, 0);
      camera.fov = THREE.MathUtils.lerp(60, 45, finalS);
    }

    // Parallax Interaction: Mouse influence
    camera.position.x += (mouse.x * 0.5 - camera.position.x * 0.05) * 0.1;
    camera.position.y += (mouse.y * 0.5 - camera.position.y * 0.05) * 0.1;

    camera.updateProjectionMatrix();
  });

  return null;
}

function RevealLerp(s: number) {
  return s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2;
}
