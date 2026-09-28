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
      className="relative w-full cursor-crosshair select-none my-12 py-8"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Text */}
      <h1 className="text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter font-medium text-foreground">
        <div className="pl-[10vw] md:pl-[15vw]">{firstName}</div>
        <div>{lastName}</div>
      </h1>

      {/* Ripple / Glass Refraction Text Overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          clipPath: `circle(8vw at ${mousePos.x}px ${mousePos.y}px)`,
        }}
      >
        <h1 
          className="text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter font-medium text-foreground"
          style={{
            transform: 'translate(10px, 15px) scale(1.02)', // The refraction distortion!
            transformOrigin: `${mousePos.x}px ${mousePos.y}px`
          }}
        >
          <div className="pl-[10vw] md:pl-[15vw]">{firstName}</div>
          <div>{lastName}</div>
        </h1>
      </motion.div>
    </div>
  );
}
