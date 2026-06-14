'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { skills } from '../data/skills';

const CATEGORIES = ['All', ...skills.map((s) => s.category)];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? skills : skills.filter((s) => s.category === active);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors duration-300"
            >
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{category.category}</h3>

              {category.category === 'Certifications' ? (
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors"
                    >
                      {item.name}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {category.items.map((item, ii) => (
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
                          animate={inView ? { width: `${item.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.3 + ii * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
