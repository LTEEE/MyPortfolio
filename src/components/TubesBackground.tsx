"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils"; 

// Helper for random ink colors
const randomInk = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => {
      // Very dark grayscale values (10 to 60)
      const v = Math.floor(10 + Math.random() * 50).toString(16).padStart(2, '0');
      return `#${v}${v}${v}`;
    });
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Safely dynamic import the local module in useEffect to avoid SSR window errors
        const module = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            scale: 0.4,       // Make them overall smaller
            radius: 0.1,      // Thinner tubes
            colors: ["#111111", "#1a1a1a", "#262626"], // Dark, ink-like base colors
            lights: {
              intensity: 15,  // Very dim light to remove the "neon lightning" effect
              colors: ["#333333", "#444444", "#555555", "#666666"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    const colors = randomInk(3);
    const lightsColors = randomInk(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-screen overflow-hidden", className)}
      onClick={handleClick}
    >
      {/* Dark background layer */}
      <div className="fixed inset-0 z-0 bg-[#0a0a0a]" />

      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full block z-[1]"
        style={{ touchAction: 'none' }}
      />
      
      {/* SVG Noise Texture Generator */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
      </svg>
      {/* The Noise Overlay Layer */}
      <div 
        className="fixed inset-0 w-full h-full opacity-[0.25] z-[2] pointer-events-none"
        style={{ filter: "url(#noiseFilter)" }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-[10] w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
