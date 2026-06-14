'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/maulanaiskak9@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#111111]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase mb-3">Let&apos;s Work Together</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you have a project in mind, want to discuss backend architecture,
              or just say hi — my inbox is always open.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <Mail size={20} className="text-[#00d4ff]" />,
                  label: 'Email',
                  value: 'maulanaiskak9@gmail.com',
                  href: 'mailto:maulanaiskak9@gmail.com',
                },
                {
                  icon: <Linkedin size={20} className="text-[#00d4ff]" />,
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/maulanaiskak',
                  href: 'https://linkedin.com/in/maulanaiskak',
                  external: true,
                },
                {
                  icon: <Github size={20} className="text-[#00d4ff]" />,
                  label: 'GitHub',
                  value: 'github.com/maulanaiskak',
                  href: 'https://github.com/maulanaiskak',
                  external: true,
                },
              ].map(({ icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#00d4ff]/30 transition-colors duration-200 group"
                >
                  <div className="bg-[#00d4ff]/10 p-2 rounded-lg shrink-0">{icon}</div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-gray-300 text-sm group-hover:text-[#00d4ff] transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 bg-white/5 border border-[#00d4ff]/20 rounded-2xl p-12 text-center">
                <CheckCircle size={48} className="text-[#00d4ff]" />
                <h3 className="text-white text-xl font-semibold">Message Sent!</h3>
                <p className="text-gray-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
              >
                {[
                  { id: 'name', label: 'Name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                ].map(({ id, label, type }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm text-gray-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      id={id}
                      name={id}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#00d4ff] text-[#0d0d0d] font-semibold py-3 rounded-xl hover:bg-[#00b8d9] disabled:opacity-60 transition-colors"
                >
                  <Send size={16} />
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
