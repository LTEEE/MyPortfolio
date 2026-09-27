"use client";

import React, { useRef } from "react";
import { MapPin, Mail, ExternalLink, GraduationCap, Briefcase, Code, PenTool } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation (plays immediately)
    gsap.from(".header-anim", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Scroll animations for sections
    const sections = gsap.utils.toArray<HTMLElement>(".section-anim");
    
    sections.forEach((section) => {
      gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Triggers when the top of the section hits 85% of the viewport height
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-neutral-900 pb-20 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="header-anim text-4xl md:text-5xl font-bold tracking-tight mb-4">Maksym Poberezhnyi</h1>
          <p className="header-anim text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            International Marketing student at the University of Lodz, content writer, and someone who builds his own apps.
          </p>
          <div className="header-anim flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <a 
              href="https://www.linkedin.com/in/mpoberezhnyi/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/LTEEE" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
            <span className="flex items-center gap-1.5 cursor-default">
              <MapPin className="w-4 h-4" />
              Łódź, Poland
            </span>
          </div>
        </header>

        <div className="space-y-20">
          {/* About Section */}
          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              About me
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>
                I study International Marketing at the University of Lodz. My path here was not a straight line, since I started university in Computer Science before I moved into marketing, and I think this is the part that shapes how I work today. I still look at a campaign the way I would look at a piece of software, as something that has to be built, tested and measured before anyone can say it works.
              </p>
              <p>
                Right now I write content for Cool.Club, and most of my blog posts start with market research in Excel long before they turn into text. Outside of work I build my own apps, which keeps me close to the product side of marketing and means I usually understand what a developer means when a launch date slips.
              </p>
            </div>
          </section>

          {/* Projects Section */}
          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project: Weave */}
              <div className="group border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
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
                  A media organisation app with a canvas where people connect their media items visually, much like a Miro board. Built in TypeScript with Expo.
                </p>
              </div>

              {/* Project: Letters */}
              <div className="group border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-neutral-500" />
                    Letters
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  A native macOS writing app with its own AI features, which I am building with SwiftUI and a Rust core.
                </p>
              </div>

              {/* Project: dnails */}
              <div className="group border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
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
                  A website built in HTML, CSS and JavaScript.
                </p>
              </div>

              {/* Project: VST3 plugin */}
              <div className="group border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg flex items-center gap-2">
                    <Code className="w-4 h-4 text-neutral-500" />
                    VST3 Audio Plugin
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Co-developed an audio plugin during my first degree and presented it at a university science conference.
                </p>
              </div>
            </div>
          </section>

          {/* Experience & Education */}
          <section className="section-anim grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experience */}
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
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    I write blog posts, product copy, reports and presentations, and each piece is built on market research and Excel analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
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
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Averaging 4.8/5. Top marks in Digital Marketing, Consumer Behavior, Data Analysis, and Project Management.
                  </p>
                </div>
                <div className="relative pl-6 border-l border-neutral-200 dark:border-neutral-800">
                  <div className="absolute w-2 h-2 bg-neutral-400 rounded-full -left-[4.5px] top-2"></div>
                  <h3 className="font-medium text-lg">Computer Science</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">University of Lodz · 2022 - 2023</p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Studied programming, computer science fundamentals and logic before moving to marketing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="section-anim">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Content Writing", "Digital Marketing", "Consumer Behaviour", "Brand Communication",
                "Excel", "SPSS", "Data Analysis",
                "Claude Code", "Anthropic API", "SwiftUI", "TypeScript", "React"
              ].map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-full border border-neutral-200 dark:border-neutral-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
