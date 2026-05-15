import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ── Count-up on scroll ─────────────────────────
function useCountUp(target, decimals = 0, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(parseFloat(cur.toFixed(decimals)));
      if (cur >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, decimals, start]);
  return val;
}

// ── Data ──────────────────────────────────────
const HEADLINE_STATS = [
  {
    label: 'Women overweight / obese',
    subLabel: 'All-India, NFHS-5 (2019–21)',
    value: 24, decimals: 0, suffix: '%',
    color: '#C9963F', bg: '#FFF7ED',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    label: 'Men overweight / obese',
    subLabel: 'All-India, NFHS-5 (2019–21)',
    value: 23, decimals: 0, suffix: '%',
    color: '#1B5E3A', bg: '#F0FDF4',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        <path strokeLinecap="round" d="M20 8l2-2m0 0l-2-2m2 2h-3"/>
      </svg>
    ),
  },
  {
    label: 'Women obese (ages 15–49)',
    subLabel: 'NFHS-5 subset',
    value: 6.4, decimals: 1, suffix: '%',
    color: '#7C3AED', bg: '#F5F3FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M12 2a5 5 0 100 10A5 5 0 0012 2zM4 22c0-4 3.6-7 8-7s8 3 8 7"/>
        <path strokeLinecap="round" d="M17 11l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Men obese (ages 15–49)',
    subLabel: 'NFHS-5 subset',
    value: 4.0, decimals: 1, suffix: '%',
    color: '#0D9488', bg: '#F0FDFA',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M12 2a5 5 0 100 10A5 5 0 0012 2zM4 22c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    label: 'Children under 5 overweight',
    subLabel: 'NFHS-5 (up from 2.1% in NFHS-4)',
    value: 3.4, decimals: 1, suffix: '%',
    color: '#DC2626', bg: '#FEF2F2',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M12 4c-1.5 0-2.7 1.2-2.7 2.7S10.5 9.4 12 9.4s2.7-1.2 2.7-2.7S13.5 4 12 4z"/>
        <path strokeLinecap="round" d="M7 20v-3a5 5 0 0110 0v3"/>
        <path strokeLinecap="round" d="M8 14l-1.5 1M16 14l1.5 1"/>
      </svg>
    ),
  },
  {
    label: 'Global obesity increase since 1990',
    subLabel: 'Adults — WHO 2024',
    value: 2, decimals: 0, suffix: '×',
    color: '#F59E0B', bg: '#FFFBEB',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M3 17l4-8 4 5 3-3 4 6"/>
        <path strokeLinecap="round" d="M3 17h18"/>
      </svg>
    ),
  },
];

const PROGRESS_DATA = [
  { label: 'NFHS-3 (2005–06)', women: 12.6, men: 9.3 },
  { label: 'NFHS-4 (2015–16)', women: 20.6, men: 18.9 },
  { label: 'NFHS-5 (2019–21)', women: 24.0, men: 23.0 },
];

// ── Sub-component: stat card ────────────────
const StatCard = ({ stat, inView }) => {
  const count = useCountUp(stat.value, stat.decimals, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="rounded-2xl p-5 flex flex-col gap-3 card-shine initiative-card"
      style={{ background: stat.bg }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: stat.color + '20', color: stat.color }}
      >
        {stat.icon}
      </div>
      <div>
        <div
          className="text-4xl font-manrope font-extrabold stat-number leading-none"
          style={{ color: stat.color }}
        >
          {count}{stat.suffix}
        </div>
        <p className="font-manrope font-semibold text-slate-800 text-sm mt-1">{stat.label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{stat.subLabel}</p>
      </div>
    </motion.div>
  );
};

// ── Progress bar row ─────────────────────────
const ProgressRow = ({ item, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="space-y-1"
  >
    <div className="flex justify-between text-xs font-semibold text-slate-600">
      <span>{item.label}</span>
      <span className="flex gap-4">
        <span style={{ color: '#C9963F' }}>W: {item.women}%</span>
        <span style={{ color: '#1B5E3A' }}>M: {item.men}%</span>
      </span>
    </div>
    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${item.women}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
        className="absolute top-0 left-0 h-full rounded-full opacity-80"
        style={{ background: '#C9963F' }}
      />
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${item.men}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.35, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 h-1.5 rounded-full opacity-60"
        style={{ background: '#1B5E3A' }}
      />
    </div>
  </motion.div>
);

// ── Main Section ─────────────────────────────
const IndiaStatsSection = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="india-stats" ref={ref} className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-india-green/10 text-india-green text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            India's Obesity Reality
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 section-heading section-heading-center"
          >
            The Numbers That
            <span className="gradient-text"> Demand Action</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            India's obesity burden has nearly doubled over two decades. The National Family Health
            Survey (NFHS-5) paints a stark picture — and the trajectory continues upward.
          </motion.p>
        </div>

        {/* ── Intro Text Box ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-14 rounded-3xl overflow-hidden shadow-lg"
        >
          <div className="grid lg:grid-cols-2">
            {/* Text side */}
            <div className="bg-[#1B5E3A] p-8 lg:p-10 text-white">
              <h3 className="font-manrope font-bold text-2xl mb-4">India's Wake-Up Call</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-4">
                Obesity has become a major public health challenge in India, affecting people across
                all age groups and increasing the risk of non-communicable diseases (NCDs) such as
                diabetes, heart disease, and hypertension.
              </p>
              <p className="text-white/85 text-sm leading-relaxed mb-4">
                Driven by unhealthy diets, sedentary lifestyles, and environmental factors,
                obesity is rising at an alarming rate — impacting both <strong className="text-white">urban and rural
                populations</strong>. The shift towards processed foods, reduced physical activity,
                and lifestyle changes has further contributed to this growing crisis.
              </p>
              <p className="text-white/85 text-sm leading-relaxed">
                As India moves towards <strong className="text-[#F59E0B]">Amrit Kaal</strong>, a
                whole-of-government and whole-of-society approach is being adopted to tackle obesity
                through policy reforms, community engagement, and regulatory measures.
              </p>
            </div>
            {/* Image side */}
            <div className="relative min-h-[280px] lg:min-h-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80&fit=crop"
                alt="Person on weighing scale checking weight"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E3A]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-white text-xs font-semibold">📍 Nationwide Campaign</p>
                  <p className="text-white/80 text-xs mt-1">
                    PM Modi's Mann Ki Baat highlighted the need for collective action —
                    nominating leaders across India to drive awareness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {HEADLINE_STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} inView={inView} />
          ))}
        </div>

        {/* ── Trend Progress Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-md"
        >
          <h3 className="font-manrope font-bold text-xl text-slate-900 mb-2">
            Overweight &amp; Obesity Trend — India (NFHS Surveys)
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            % of adults overweight or obese across National Family Health Surveys
          </p>
          <div className="space-y-5">
            {PROGRESS_DATA.map((item, i) => (
              <ProgressRow key={i} item={item} delay={i * 0.15} />
            ))}
          </div>
          <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#C9963F' }} />
              Women (NFHS)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#1B5E3A' }} />
              Men (NFHS)
            </div>
            <span className="ml-auto text-[10px] text-slate-400">Source: MoHFW / NFHS</span>
          </div>
        </motion.div>

        {/* ── Global context banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-[#1e3a6e] to-[#1B5E3A] p-6 text-white flex flex-col sm:flex-row items-center gap-4 justify-between"
        >
          <div>
            <p className="font-manrope font-bold text-lg">Global Comparison</p>
            <p className="text-white/75 text-sm mt-1">
              Worldwide, <strong className="text-white">1 in 8 people</strong> live with obesity.
              Adolescent obesity has <strong className="text-[#F59E0B]">quadrupled</strong> since 1990.
              Economic cost projected at <strong className="text-[#F59E0B]">$3.23 trillion</strong> by 2030.
            </p>
          </div>
          <div className="flex gap-6 text-center shrink-0">
            <div>
              <p className="text-3xl font-extrabold text-[#F59E0B]">2.5B</p>
              <p className="text-[11px] text-white/70">Adults overweight</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#14B8A6]">890M</p>
              <p className="text-[11px] text-white/70">Adults with obesity</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndiaStatsSection;
