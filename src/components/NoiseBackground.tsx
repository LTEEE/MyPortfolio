"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NoiseBackground() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We animate the white blurred orbs to create a fluid, ever-changing abstract shape
    const orbs = gsap.utils.toArray<HTMLElement>(".blob");
    
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: "random(-100, 100, 5)",
        y: "random(-100, 100, 5)",
        scale: "random(0.8, 1.4)",
        duration: "random(5, 10)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * -2,
      });
    });
  }, { scope: container });

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]"
      style={{ pointerEvents: 'none' }}
    >
      {/* SVG Noise Texture Generator */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
      </svg>

      {/* The animated blobs that create the light/dark mesh */}
      <div className="absolute inset-0 w-full h-full opacity-70">
        <div className="blob absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen" />
        <div className="blob absolute top-1/3 right-1/4 w-[50vw] h-[30vw] bg-white/10 rounded-full blur-[100px] md:blur-[140px] mix-blend-screen" />
        <div className="blob absolute bottom-1/4 left-1/3 w-[60vw] h-[40vw] bg-white/15 rounded-full blur-[90px] md:blur-[130px] mix-blend-screen" />
      </div>

      {/* The Noise Overlay Layer */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.15]"
        style={{ filter: "url(#noiseFilter)" }}
      ></div>
      
      {/* A dark vignette to focus the center like the image */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-80"></div>
    </div>
  );
}
