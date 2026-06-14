'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects } from '../data/projects';
import type { SceneVariant } from './MiniScene';

const MiniScene = dynamic(() => import('./MiniScene'), { ssr: false });

const PROJECT_SCENES: { variant: SceneVariant; color: string }[] = [
  { variant: 'torusknot',       color: '#00d4ff' }, // Web3 Wallet
  { variant: 'wireSphere',      color: '#7c3aed' }, // KYC Pipeline
  { variant: 'octahedron',      color: '#00d4ff' }, // 2FA Auth
  { variant: 'bars',            color: '#10b981' }, // User Tiering
  { variant: 'twinBoxes',       color: '#f59e0b' }, // DB Migration
  { variant: 'icosahedron',     color: '#ef4444' }, // Alerta
  { variant: 'organicParticles',color: '#10b981' }, // Angkat Tani
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scene = PROJECT_SCENES[index % PROJECT_SCENES.length];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d4ff]/30 transition-colors duration-300 h-full"
        style={{ transition: 'transform 0.15s ease, border-color 0.3s' }}
      >
        {/* Three.js scene header */}
        <div className="relative h-40 bg-[#0a0a0a]">
          {inView && (
            <MiniScene
              variant={scene.variant}
              color={scene.color}
              className="absolute inset-0"
            />
          )}
          {/* Title overlay */}
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent">
            <h3 className="text-white font-bold text-base leading-tight">{project.title}</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500 border border-white/10">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <ul className="space-y-1">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="text-[#00d4ff] mt-0.5 shrink-0">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 bg-[#0d0d0d]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">
            What I&apos;ve Built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
