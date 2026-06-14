'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

const ROLES = [
  'Backend Engineer',
  'Java Spring Boot Engineer',
  'Golang Engineer',
  'Cloud Engineer',
];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-[#00d4ff]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#0d0d0d]/10 to-[#0d0d0d]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
        >
          <GlitchText>Maulana Iskak</GlitchText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl md:text-3xl font-light text-gray-300 mb-8 h-10"
        >
          <TypewriterText />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable distributed systems that power millions of users.
          Specializing in Java Spring Boot, Golang, and Google Cloud Platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-[#00d4ff] text-[#0d0d0d] font-semibold rounded-full hover:bg-[#00b8d9] transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[#00d4ff] text-[#00d4ff] font-semibold rounded-full hover:bg-[#00d4ff]/10 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex gap-6 justify-center"
        >
          <a
            href="https://github.com/maulanaiskak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/maulanaiskak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:maulanaiskak9@gmail.com"
            aria-label="Email"
            className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-200"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" aria-label="Scroll down">
          <ChevronDown
            size={28}
            className="text-gray-500 animate-bounce hover:text-[#00d4ff] transition-colors"
          />
        </a>
      </motion.div>
    </section>
  );
}
