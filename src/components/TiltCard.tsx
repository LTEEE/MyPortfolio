"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = ((mouseY / height) - 0.5) * -15;
    const rY = ((mouseX / width) - 0.5) * 15;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
      className={cn("h-full", className)}
    >
      <div className="h-full bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-900/10 dark:hover:shadow-black/50 hover:bg-white/80 dark:hover:bg-neutral-900/80">
        {children}
      </div>
    </motion.div>
  );
}
