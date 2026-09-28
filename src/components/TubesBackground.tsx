"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils"; 

// Helper for random grayscale colors
const randomGrayscale = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => {
      const v = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
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
            colors: ["#ffffff", "#bbbbbb", "#888888"],
            lights: {
              intensity: 200,
              colors: ["#ffffff", "#cccccc", "#aaaaaa", "#dddddd"]
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
    
    const colors = randomGrayscale(3);
    const lightsColors = randomGrayscale(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-screen overflow-hidden bg-[#050505]", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full block z-[-2]"
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
        className="fixed inset-0 w-full h-full opacity-[0.25] z-[-1] pointer-events-none"
        style={{ filter: "url(#noiseFilter)" }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
