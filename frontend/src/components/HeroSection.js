import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const STATS = [
  { value: 24,  suffix: '%',  label: 'Women\nOverweight/Obese',    color: '#F59E0B' },
  { value: 23,  suffix: '%',  label: 'Men\nOverweight/Obese',      color: '#14B8A6' },
  { value: 3.4, suffix: '%',  label: 'Children <5 Yrs\nOverweight',color: '#D4A843' },
  { value: 1,   suffix: 'B+', label: 'People Globally\nWith Obesity', color: '#A78BFA' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(parseFloat(current.toFixed(1)));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

const StatCard = ({ stat, animate }) => {
  const count = useCountUp(stat.value, 1800, animate);
  return (
    <div className="glass-card rounded-2xl px-5 py-4 text-center min-w-[140px] card-shine">
      <div className="text-3xl font-manrope font-extrabold" style={{ color: stat.color }}>
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-white/70 mt-1 whitespace-pre-line leading-snug">
        {stat.label}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 700);
    return () => clearTimeout(t);
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 5,
  }));

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(135deg, #0f3460 0%, #0d2137 30%, #0f4c4c 65%, #0d3b3b 100%)' }}
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-10" />

      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-blob absolute -top-36 -left-36 w-[480px] h-[480px] rounded-full bg-teal-600/15 blur-3xl" />
        <div className="animate-blob-delay absolute top-1/3 -right-44 w-[420px] h-[420px] rounded-full bg-teal-400/10 blur-3xl" />
        <div className="animate-blob-delay2 absolute -bottom-20 left-1/3 w-[380px] h-[380px] rounded-full bg-amber-500/8 blur-3xl" />
        <div className="animate-blob absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/8 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white/15"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 sm:px-8 pt-28 lg:pt-32 pb-10">

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          India's Public Health Emergency — NFHS-5 &amp; WHO 2024
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-manrope font-extrabold text-white text-4xl sm:text-5xl lg:text-[64px] xl:text-7xl leading-[1.1] max-w-5xl"
        >
          Obesity:{' '}
          <span className="gradient-text-saffron">India's Silent</span>
          <br className="hidden sm:block" /> Health Crisis
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          1 in 4 Indians is overweight or obese — driven by changing diets, sedentary
          lifestyles, and rapid urbanisation. Understand the risk. Know your numbers.
          Act before it's too late.
        </motion.p>

        {/* WHO + India destigmatising note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-medium px-4 py-2 rounded-full"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Obesity is a complex, chronic disease — not a personal failure. WHO &amp; ICMR recognise it as a medical condition.
        </motion.div>

        {/* PM Modi Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.6 }}
          className="mt-7 max-w-xl mx-auto glass-card rounded-2xl px-6 py-4 border border-white/20"
        >
          <svg className="w-5 h-5 text-[#F59E0B] mb-2 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p className="text-white/90 text-sm sm:text-base italic leading-relaxed">
            "We must take a pledge to reduce the consumption of edible oil. Obesity is
            becoming a major health challenge in India. Collective action is the need of the hour."
          </p>
          <p className="text-[#F59E0B] text-xs font-bold mt-2 tracking-wide">— PM Narendra Modi, Mann Ki Baat</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            to="/digital-twin"
            className="group flex items-center gap-3 bg-white hover:bg-slate-50 text-[#0B2240] font-bold text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Start Free Health Assessment
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <button
            onClick={() => document.getElementById('bmi-calc')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 border-2 border-white/40 hover:border-white/70 text-white font-semibold text-base px-7 py-3.5 rounded-2xl hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Check Your BMI
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} animate={animate} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-5 text-white/35 text-[10px]"
        >
          Sources: NFHS-5 (2019–21), WHO Global Health Observatory 2024, World Obesity Federation
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex flex-col items-center pb-6 text-white/50"
      >
        <p className="text-[11px] tracking-widest uppercase mb-1">Scroll to explore</p>
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full" style={{ height: 72 }}>
          <path d="M0,40 C360,80 720,4 1080,40 C1260,58 1380,28 1440,40 L1440,72 L0,72 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
