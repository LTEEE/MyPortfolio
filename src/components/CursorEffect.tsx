"use client";

import React from "react";
import { Shader, ChromaFlow } from "shaders/react";

export default function CursorEffect() {
  return (
    <div 
      className="fixed inset-0 z-[-1] overflow-hidden"
    >
      <Shader>
        <ChromaFlow 
          baseColor="#0a0a0a" 
          downColor="#ffffff" 
          leftColor="#ffffff" 
          rightColor="#ffffff" 
          upColor="#ffffff" 
          momentum={13} 
          radius={3.5} 
        />
      </Shader>
    </div>
  );
}
