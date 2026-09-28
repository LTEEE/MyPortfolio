"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils"; 

import { useTheme } from "next-themes";

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

  // Watch for theme changes and update the colors
  useEffect(() => {
    if (!tubesRef.current) return;
    
    if (theme === 'light') {
      // Inkish on light background
      tubesRef.current.tubes.setColors(["#111111", "#1a1a1a", "#262626"]);
      tubesRef.current.tubes.setLightsColors(["#333333", "#444444", "#555555", "#666666"]);
    } else {
      // Snowish on dark background
      tubesRef.current.tubes.setColors(["#ffffff", "#f0f0f0", "#e0e0e0"]);
      tubesRef.current.tubes.setLightsColors(["#ffffff", "#dddddd", "#bbbbbb", "#999999"]);
    }
  }, [theme]);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Safely dynamic import the local module in useEffect to avoid SSR window errors
        const module = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const isLight = theme === 'light';

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            scale: 0.4,       // Make them overall smaller
            radius: 0.1,      // Thinner tubes
            colors: isLight 
              ? ["#111111", "#1a1a1a", "#262626"] 
              : ["#ffffff", "#f0f0f0", "#e0e0e0"],
            lights: {
              intensity: 15,  // Very dim light to remove the "neon lightning" effect
              colors: isLight 
                ? ["#333333", "#444444", "#555555", "#666666"]
                : ["#ffffff", "#dddddd", "#bbbbbb", "#999999"]
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
    
    const colors = theme === 'light' ? randomInk(3) : randomSnow(3);
    const lightsColors = theme === 'light' ? randomInk(4) : randomSnow(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-screen overflow-hidden", className)}
      onClick={handleClick}
    >
      {/* Dynamic background layer */}
      <div className="fixed inset-0 z-0 bg-[#f5f5f5] dark:bg-[#0a0a0a] transition-colors duration-500" />

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
        className="fixed inset-0 w-full h-full opacity-[0.25] dark:opacity-[0.25] z-[2] pointer-events-none mix-blend-multiply dark:mix-blend-normal"
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
