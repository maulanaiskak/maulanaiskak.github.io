'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';
import { experience } from '../data/experience';
import type { SceneVariant } from './MiniScene';

const MiniScene = dynamic(() => import('./MiniScene'), { ssr: false });

const EXP_SCENES: { variant: SceneVariant; color: string }[] = [
  { variant: 'multiChain',   color: '#00d4ff' }, // Senior BE — multi-chain orbits
  { variant: 'dataPipeline', color: '#7c3aed' }, // Backend Engineer — async event pipeline
  { variant: 'alertNetwork', color: '#f59e0b' }, // TechConnect — incident routing
  { variant: 'neuralCloud',  color: '#10b981' }, // Bangkit — cloud/ML learning
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 bg-[#111111]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#00d4ff] rounded-full -translate-x-1/2 mt-6 shadow-[0_0_8px_#00d4ff]" />

                  {/* Spacer with Three.js scene — visible only on desktop */}
                  <div className="hidden md:flex md:w-1/2 items-center justify-center">
                    {inView && (
                      <div className="w-full h-80">
                        <MiniScene
                          variant={EXP_SCENES[index % EXP_SCENES.length].variant}
                          color={EXP_SCENES[index % EXP_SCENES.length].color}
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                      <h4 className="text-[#00d4ff] font-semibold mb-3">{exp.company}</h4>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} /> {exp.period}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        {exp.responsibilities.map((r, ri) => (
                          <div key={ri} className="bg-white/5 rounded-lg p-3">
                            <span className="text-[#00d4ff] text-xs font-mono">{r.period}</span>
                            <p className="text-gray-300 text-sm mt-1">{r.description}</p>
                          </div>
                        ))}
                      </div>

                      <ul className="space-y-1 mb-4">
                        {exp.projectsAndAchievements.map((a, ai) => (
                          <li key={ai} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-[#00d4ff] mt-1 shrink-0">▸</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
