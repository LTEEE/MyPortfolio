"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils"; 

import { useTheme } from "next-themes";

// Helper for random snow colors
const randomSnow = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => {
      // Very light grayscale values (200 to 255)
      const v = Math.floor(200 + Math.random() * 55).toString(16).padStart(2, '0');
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
  const { theme } = useTheme();

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
            colors: ["#ffffff", "#f0f0f0", "#e0e0e0"],
            lights: {
              intensity: 10,  // Dimmer light
              colors: ["#ffffff", "#dddddd", "#bbbbbb", "#999999"]
            }
          },
          bloom: {
            threshold: 0.5,   // Only bloom the brightest parts (eliminates the large faint aura)
            strength: 0.8,    // Reduce overall bloom intensity
            radius: 0.2       // Make the bloom tighter
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
    
    const colors = randomSnow(3);
    const lightsColors = randomSnow(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-screen overflow-hidden", className)}
      onClick={handleClick}
    >
      {/* Dynamic background layer (Parchment in light, Black in dark) */}
      <div className="fixed inset-0 z-0 bg-[#faf9f6] dark:bg-[#0a0a0a] transition-colors duration-500" />

      {/* The 3D Canvas. ThreeJS clears with black. 
          In light mode, we invert the canvas (black becomes white, white tubes become black ink),
          and use mix-blend-multiply so the white canvas becomes transparent against the parchment! */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full block z-[1] transition-all duration-500 invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen"
        style={{ touchAction: 'none' }}
      />
      
      {/* SVG Noise Texture Generator */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="1" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {/* The Noise Overlay Layer */}
      <div 
        className="fixed inset-0 w-full h-full opacity-[0.15] z-[2] pointer-events-none transition-all duration-500 mix-blend-multiply dark:mix-blend-screen"
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
