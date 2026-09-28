"use client";

import React, { useRef, useState, useEffect } from "react";
import { MapPin, Mail, ExternalLink, GraduationCap, Briefcase, Code, PenTool, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PROJECTS = [
  {
    name: "Weave",
    description: "A media organisation app with an infinite canvas where people connect their ideas.",
    link: "https://github.com/LTEEE/ProjectWeave",
    color: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
  },
  {
    name: "Letters",
    description: "A native macOS writing environment built to enhance focus, featuring its own set of integrated AI assistance tools.",
    link: "https://github.com/LTEEE/ProjectLetters",
    color: "linear-gradient(135deg, #f97316 0%, #facc15 100%)"
  },
  {
    name: "dnails",
    description: "A modern, responsive landing page and business website designed for Dream Nails.",
    link: "https://github.com/LTEEE/dnails",
    color: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
  },
  {
    name: "Actual",
    description: "A time-tracking and focus app that generates a calibration score to help improve your time management bias.",
    link: "https://github.com/LTEEE/ProjectActual",
    color: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)"
  }
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      
      {/* The Floating Memory Reveal */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[500px] rounded-2xl pointer-events-none z-[5] shadow-2xl object-cover"
        animate={{
          x: mousePos.x - 200, // center on mouse
          y: mousePos.y - 250,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
          rotate: hoveredIndex !== null ? (mousePos.x % 10 - 5) : 0, // subtle dynamic rotation
          background: hoveredIndex !== null ? PROJECTS[hoveredIndex].color : "transparent"
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, opacity: { duration: 0.2 } }}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl" />
      </motion.div>

      {/* Dim the rest of the site when a project is hovered */}
      <motion.div
        className="fixed inset-0 bg-white/60 dark:bg-black/60 pointer-events-none z-[4]"
        animate={{ opacity: hoveredIndex !== null ? 1 : 0 }}
        transition={{ duration: 0.3 }}
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

          {/* Projects Section - Brutalist List */}
          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              Projects
            </h2>
            <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-800">
              {PROJECTS.map((project, idx) => (
                <a 
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-neutral-200 dark:border-neutral-800 hover:pl-6 transition-all duration-300 relative z-10"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300 mb-2 md:mb-0">
                    {project.name}
                  </div>
                  <div className="flex flex-col items-start md:items-end md:max-w-sm text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300">
                    <p className="text-sm md:text-right">{project.description}</p>
                  </div>
                </a>
              ))}
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
                <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800">
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
                <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="absolute w-2 h-2 bg-neutral-400 rounded-full -left-[4.5px] top-2"></div>
                  <h3 className="font-medium text-lg">International Marketing</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">University of Lodz · 2024 - 2027</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    Averaging 4.8/5. Top marks in Digital Marketing, Consumer Behavior, Data Analysis, and Project Management.
                  </p>
                </div>
                <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800">
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
