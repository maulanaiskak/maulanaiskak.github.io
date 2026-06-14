'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import { skills } from '../data/skills';

const RadarChart = dynamic(() => import('./RadarChart'), { ssr: false });

const CATEGORIES = ['All', ...skills.map((s) => s.category)];

const RADAR_COLORS: Record<string, string> = {
  'Core Competencies':     '#00d4ff',
  'Programming Languages': '#7c3aed',
  'Frameworks':            '#10b981',
  'Data & Messaging':      '#f59e0b',
  'Infrastructure & Tools':'#00d4ff',
  'Languages':             '#10b981',
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? skills : skills.filter((s) => s.category === active);
  const showRadar = active !== 'All' && active !== 'Certifications';
  const radarCategory = skills.find((s) => s.category === active);

  return (
    <section id="skills" className="py-24 bg-[#111111]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Toolkit</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Skills</h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-[#00d4ff] text-[#0d0d0d]'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Radar + bars side-by-side when a specific category is selected */}
        <AnimatePresence mode="wait">
          {showRadar && radarCategory ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Radar chart */}
              <div className="h-72 md:h-96">
                <RadarChart
                  items={radarCategory.items.map((i) => ({ name: i.name, level: i.level }))}
                  color={RADAR_COLORS[active] ?? '#00d4ff'}
                />
              </div>

              {/* Progress bars */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{active}</h3>
                <div className="space-y-4">
                  {radarCategory.items.map((item, ii) => (
                    <div key={item.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                          {item.note && (
                            <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">{item.note}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-600">{item.level}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0090d4]"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: ii * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((category, ci) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: ci * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#00d4ff]/20 transition-colors duration-300"
                >
                  <p className="text-[#00d4ff] text-xs font-mono tracking-widest uppercase mb-4">{category.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, ii) => {
                      const intensity = item.level / 100;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: ci * 0.07 + ii * 0.04 }}
                        >
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                borderColor: `rgba(0,212,255,${0.3 + intensity * 0.5})`,
                                backgroundColor: `rgba(0,212,255,${0.05 + intensity * 0.1})`,
                                color: `rgba(0,212,255,${0.7 + intensity * 0.3})`,
                              }}
                            >
                              {item.name}
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <span
                              className="px-3 py-1.5 rounded-full border text-xs font-medium cursor-default"
                              style={{
                                borderColor: `rgba(255,255,255,${0.06 + intensity * 0.14})`,
                                backgroundColor: `rgba(255,255,255,${0.02 + intensity * 0.06})`,
                                color: `rgba(255,255,255,${0.4 + intensity * 0.55})`,
                              }}
                              title={`${item.level}%${item.note ? ` · ${item.note}` : ''}`}
                            >
                              {item.name}
                              {item.note && <span className="ml-1 opacity-50">· {item.note}</span>}
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
