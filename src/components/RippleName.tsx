"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface RippleNameProps {
  firstName: string;
  lastName: string;
}

export function RippleName({ firstName, lastName }: RippleNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full cursor-crosshair select-none my-8 py-8"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Text */}
      <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] leading-[0.85] tracking-tighter font-medium text-foreground">
        <div className="pl-[8vw] md:pl-[12vw]">{firstName}</div>
        <div>{lastName}</div>
      </h1>

      {/* Ripple / Glass Refraction Text Overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          // Use mask-image instead of clip-path for a soft, smooth transition
          // that beautifully simulates continuous liquid/glass refraction.
          maskImage: `radial-gradient(circle 12vw at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 12vw at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
        }}
      >
        <h1 
          className="text-[12vw] sm:text-[10vw] md:text-[9vw] leading-[0.85] tracking-tighter font-medium text-foreground"
          style={{
            // A subtle scale and translation creates the physical "bulge" of the lens
            transform: 'translate(1vw, 1vw) scale(1.03)', 
            transformOrigin: `${mousePos.x}px ${mousePos.y}px`
          }}
        >
          <div className="pl-[8vw] md:pl-[12vw]">{firstName}</div>
          <div>{lastName}</div>
        </h1>
      </motion.div>
    </div>
  );
}
