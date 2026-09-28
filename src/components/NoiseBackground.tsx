"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NoiseBackground() {
  const container = useRef<HTMLDivElement>(null);
  const cursorOrb = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Animate background ambient orbs to slowly drift
    const orbs = gsap.utils.toArray<HTMLElement>(".ambient-blob");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: "random(-150, 150, 5)",
        y: "random(-150, 150, 5)",
        scale: "random(0.8, 1.2)",
        duration: "random(8, 15)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * -2,
      });
    });

    // 2. Make the specific cursor orb follow the mouse smoothly
    // We use GSAP quickTo for performance
    const xTo = gsap.quickTo(cursorOrb.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(cursorOrb.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Center the orb on the cursor
      // We subtract half its width/height (which is 40vw, so roughly we can just let it center)
      // Actually, since the div is 500x500 px for example, we offset by -250.
      const rect = cursorOrb.current?.getBoundingClientRect();
      if (rect) {
        xTo(e.clientX - rect.width / 2);
        yTo(e.clientY - rect.height / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]"
      style={{ pointerEvents: 'none' }}
    >
      {/* SVG Noise Texture Generator */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
      </svg>

      {/* The animated blobs that create the light/dark mesh */}
      {/* We use mix-blend-screen and extreme blur to make them look like soft glowing lights */}
      <div className="absolute inset-0 w-full h-full opacity-[0.85]">
        
        {/* Cursor tracking blob */}
        <div 
          ref={cursorOrb}
          className="absolute top-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] md:blur-[140px] opacity-60 mix-blend-screen"
        />

        {/* Ambient background blobs */}
        <div className="ambient-blob absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-neutral-400 rounded-full blur-[120px] md:blur-[160px] opacity-30 mix-blend-screen" />
        <div className="ambient-blob absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-neutral-300 rounded-full blur-[120px] md:blur-[160px] opacity-20 mix-blend-screen" />
      </div>

      {/* The Noise Overlay Layer - This is placed ABOVE the blobs so the blur gets noisy */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.25]"
        style={{ filter: "url(#noiseFilter)" }}
      ></div>
      
      {/* A dark vignette to slightly darken the edges */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-80"></div>
    </div>
  );
}
