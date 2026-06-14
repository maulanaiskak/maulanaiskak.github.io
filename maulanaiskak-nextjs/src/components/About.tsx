'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import GradientOrbs from './GradientOrbs';

const STATS = [
  { value: 3,      suffix: '+',  label: 'Years Experience',           isNum: true },
  { value: 5,      suffix: 'M+', label: 'Users in Pipeline',          isNum: true },
  { value: 170,    suffix: 'K+', label: 'On-chain Tokens Screened',   isNum: true },
  { value: null,   suffix: '',   label: 'Cloud Architect Certified',  text: 'GCP Pro' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24 bg-[#0d0d0d] overflow-hidden" ref={ref}>
      <GradientOrbs variant="cyan" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Get To Know</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              I&apos;m a <span className="text-[#00d4ff] font-medium">Backend Engineer</span> with 3+ years
              building regulated fintech systems at <span className="text-white font-medium">Nanovest</span> —
              a digital asset marketplace for Indonesian retail investors. I specialize in distributed
              transaction orchestration, event-driven architecture, and data correctness in
              high-stakes money-movement systems.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              Day to day I work in <span className="text-gray-200">Java Spring Boot</span> and{' '}
              <span className="text-gray-200">Go</span> on GCP — shipping things like a multi-chain Web3
              settlement system across Solana and EVM, async KYC pipelines, and daily batch
              pipelines that process millions of users.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Engineering Physics graduate from{' '}
              <span className="text-gray-200">Universitas Gadjah Mada</span>, and a certified{' '}
              <span className="text-gray-200">Google Cloud Professional Cloud Architect</span>.
            </p>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/40 transition-colors duration-300"
              >
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">
                  {stat.isNum && stat.value !== null ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                  ) : (
                    stat.text
                  )}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
