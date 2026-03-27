"use client";

import dynamic from "next/dynamic";

const ShadowApp = dynamic(() => import("@/components/Scene/ShadowApp"), { 
  ssr: false,
  loading: () => <div style={{ background: "#050505", width: "100%", height: "100vh" }} />
});

export default function Home() {
  return (
    <ShadowApp />
  );
}
