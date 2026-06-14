'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight, CheckCircle, Copy, Check } from 'lucide-react';

const EMAIL = 'maulanaiskak9@gmail.com';

function MagneticButton({ children, onClick, disabled, className }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 text-gray-500 hover:text-[#00d4ff] transition-colors text-sm"
      title="Copy email"
    >
      {copied ? <Check size={14} className="text-[#00d4ff]" /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy'}
    </motion.button>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formspree.io/f/maulanaiskak9@gmail.com', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (res.ok) { setSubmitted(true); formRef.current?.reset(); }
    } finally {
      setSubmitting(false);
    }
  }, []);

  const socials = [
    { icon: Github,   label: 'GitHub',   sub: 'maulanaiskak',          href: 'https://github.com/maulanaiskak',          color: '#ffffff' },
    { icon: Linkedin, label: 'LinkedIn', sub: 'in/maulanaiskak',        href: 'https://linkedin.com/in/maulanaiskak',     color: '#0a66c2' },
  ];

  return (
    <section id="contact" className="py-32 bg-[#0d0d0d] relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00d4ff]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-4">Available for opportunities</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Let&apos;s build<br />
            <span className="text-[#00d4ff]">something great.</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Open to backend engineering roles, interesting distributed systems problems,
            or just a good tech conversation.
          </p>
        </motion.div>

        {/* Big email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-[#0d0d0d] font-bold text-lg rounded-full hover:bg-white transition-colors duration-200"
          >
            <Mail size={20} />
            {EMAIL}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <CopyEmail />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full h-px bg-white/10 mb-20 origin-left"
        />

        {/* Two col: socials + form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs text-gray-600 font-mono tracking-widest uppercase mb-6">Find me on</p>
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, sub, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-[#00d4ff]/30 hover:bg-white/[0.07] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2.5 rounded-xl">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{label}</div>
                      <div className="text-gray-500 text-xs">{sub}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-600 group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all duration-200" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="text-xs text-gray-600 font-mono tracking-widest uppercase mb-6">Or send a message</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 p-12 text-center border border-[#00d4ff]/20 rounded-2xl bg-[#00d4ff]/5"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                  <CheckCircle size={44} className="text-[#00d4ff]" />
                </motion.div>
                <h3 className="text-white text-lg font-semibold">Message sent!</h3>
                <p className="text-gray-500 text-sm">I&apos;ll get back to you as soon as I can.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name',  label: 'Name',  type: 'text'  },
                  { id: 'email', label: 'Email', type: 'email' },
                ].map(({ id, label, type }) => (
                  <div key={id} className="relative">
                    <input
                      type={type}
                      id={id}
                      name={id}
                      required
                      placeholder=" "
                      onFocus={() => setFocused(id)}
                      onBlur={() => setFocused(null)}
                      className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                    />
                    <label
                      htmlFor={id}
                      className={`absolute left-4 text-xs font-medium tracking-wide transition-all duration-200 pointer-events-none
                        ${focused === id ? 'top-2 text-[#00d4ff]' : 'top-2 text-gray-600'}`}
                    >
                      {label}
                    </label>
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder=" "
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 text-xs font-medium tracking-wide transition-all duration-200 pointer-events-none
                      ${focused === 'message' ? 'top-2 text-[#00d4ff]' : 'top-2 text-gray-600'}`}
                  >
                    Message
                  </label>
                </div>

                <MagneticButton
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#00d4ff] text-[#0d0d0d] font-bold py-3.5 rounded-xl hover:bg-white disabled:opacity-50 transition-colors duration-200 cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-[#0d0d0d]/30 border-t-[#0d0d0d] rounded-full"
                      />
                      Sending…
                    </span>
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
                  )}
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
