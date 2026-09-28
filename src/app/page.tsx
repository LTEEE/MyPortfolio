"use client";

import React, { useRef, useState } from "react";
import { MapPin, Mail, ExternalLink, GraduationCap, Briefcase, Code, PenTool } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { TiltCard } from "../components/TiltCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [bgGradient, setBgGradient] = useState<string>("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)");

  useGSAP(() => {
    gsap.from(".header-anim", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    const sections = gsap.utils.toArray<HTMLElement>(".section-anim");
    sections.forEach((section) => {
      gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen text-[var(--foreground)] font-sans selection:bg-neutral-800 selection:text-white pb-20 overflow-hidden relative">
      
      {/* Semantic Gradient Underlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[0] mix-blend-multiply dark:mix-blend-screen opacity-50 blur-[100px]"
        animate={{ background: bgGradient }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 relative z-10">
        <header className="mb-16">
          <h1 className="header-anim text-4xl md:text-5xl font-bold tracking-tight mb-4">Maksym Poberezhnyi</h1>
          <p className="header-anim text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed max-w-2xl">
            International Marketing student at the University of Lodz, content writer, and someone who builds his own apps.
          </p>
          <div className="header-anim flex flex-wrap gap-4 text-sm mb-8">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <MapPin className="w-4 h-4" />
              Łódź, Poland
            </div>
            <a href="mailto:maksym.poberezhnyi@example.com" className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a href="https://github.com/LTEEE" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/maksympoberezhnyi" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </header>

        <div className="space-y-24">
          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              About
            </h2>
            <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl space-y-4">
              <p>
                Right now I write content for Cool.Club, and most of my blog posts start with market research in Excel long before they turn into text. Outside of work I build my own apps, which keeps me close to the product side of marketing and means I usually understand what a developer means when a launch date slips.
              </p>
            </div>
          </section>

          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div 
                onMouseEnter={() => setBgGradient("radial-gradient(circle at 100% 0%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 0% 100%, #8b5cf6 0%, transparent 60%)")}
                onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
              >
                <TiltCard>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Code className="w-4 h-4 text-neutral-500" />
                      Weave
                    </h3>
                    <a href="https://github.com/LTEEE/ProjectWeave" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    A media organisation app with an infinite canvas where people connect their ideas and media items visually, much like a Miro board.
                  </p>
                </TiltCard>
              </div>

              <div 
                onMouseEnter={() => setBgGradient("radial-gradient(circle at 0% 0%, #f97316 0%, transparent 60%), radial-gradient(circle at 100% 100%, #facc15 0%, transparent 60%)")}
                onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
              >
                <TiltCard>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-neutral-500" />
                      Letters
                    </h3>
                    <a href="https://github.com/LTEEE/ProjectLetters" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    A native macOS writing environment built to enhance focus, featuring its own set of integrated AI assistance tools.
                  </p>
                </TiltCard>
              </div>

              <div 
                onMouseEnter={() => setBgGradient("radial-gradient(circle at 100% 100%, #ec4899 0%, transparent 60%), radial-gradient(circle at 0% 0%, #f43f5e 0%, transparent 60%)")}
                onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
              >
                <TiltCard>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Code className="w-4 h-4 text-neutral-500" />
                      dnails
                    </h3>
                    <a href="https://github.com/LTEEE/dnails" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    A modern, responsive landing page and business website designed for Dream Nails, a manicure and pedicure salon based in Łódź.
                  </p>
                </TiltCard>
              </div>

              <div 
                onMouseEnter={() => setBgGradient("radial-gradient(circle at 0% 100%, #10b981 0%, transparent 60%), radial-gradient(circle at 100% 0%, #14b8a6 0%, transparent 60%)")}
                onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
              >
                <TiltCard>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Code className="w-4 h-4 text-neutral-500" />
                      Actual
                    </h3>
                    <a href="https://github.com/LTEEE/ProjectActual" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    A time-tracking and focus app that compares your estimated task times against actual completion times, generating a calibration score to help improve your time management bias.
                  </p>
                </TiltCard>
              </div>
            </div>
          </section>

          {/* Experience & Education */}
          <section className="section-anim grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-neutral-500" />
                Experience
              </h2>
              <div className="space-y-8">
                <div 
                  className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors duration-500"
                  onMouseEnter={() => setBgGradient("radial-gradient(circle at 50% 100%, #3b82f6 0%, transparent 70%)")}
                  onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
                >
                  <div className="absolute w-2 h-2 bg-neutral-400 rounded-full -left-[4.5px] top-2"></div>
                  <h3 className="font-medium text-lg">Content Writer</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Cool.Club</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    I write blog posts, product copy, reports and presentations, and each piece is built on market research and Excel analysis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Content Writing", "Excel", "Data Analysis"].map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-full border border-neutral-200 dark:border-neutral-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-neutral-500" />
                Education
              </h2>
              <div className="space-y-8">
                <div 
                  className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 hover:border-fuchsia-500 transition-colors duration-500"
                  onMouseEnter={() => setBgGradient("radial-gradient(circle at 50% 100%, #d946ef 0%, transparent 70%)")}
                  onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
                >
                  <div className="absolute w-2 h-2 bg-neutral-400 rounded-full -left-[4.5px] top-2"></div>
                  <h3 className="font-medium text-lg">International Marketing</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">University of Lodz · 2024 - 2027</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    Averaging 4.8/5. Top marks in Digital Marketing, Consumer Behavior, Data Analysis, and Project Management.
                  </p>
                </div>
                <div 
                  className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 transition-colors duration-500"
                  onMouseEnter={() => setBgGradient("radial-gradient(circle at 50% 100%, #10b981 0%, transparent 70%)")}
                  onMouseLeave={() => setBgGradient("radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)")}
                >
                  <div className="absolute w-2 h-2 bg-neutral-400 rounded-full -left-[4.5px] top-2"></div>
                  <h3 className="font-medium text-lg">Computer Science</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">University of Lodz · 2022 - 2023</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    Studied programming, computer science fundamentals and logic before moving to marketing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
