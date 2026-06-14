'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { education } from '../data/education';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-24 bg-[#0d0d0d]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Academic Background</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Education</h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 p-3 rounded-xl shrink-0">
                    <GraduationCap className="text-[#00d4ff]" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                    <h4 className="text-[#00d4ff] font-semibold mb-3">{edu.institution}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {edu.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {edu.period}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-bold text-[#00d4ff]">{edu.gpa}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">GPA</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                <h5 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium">Thesis</h5>
                <p className="text-gray-300 mb-3 text-sm leading-relaxed">{edu.thesis}</p>
                <a
                  href={edu.thesis_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00d4ff] text-sm hover:underline"
                >
                  <ExternalLink size={13} />
                  View Thesis
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
