import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PathwayCard = ({ pathway }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
      style={{ minHeight: 380 }}
    >
      {/* Static placehold.co background */}
      <div className="absolute inset-0">
        <img
          src={pathway.image}
          alt={pathway.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ opacity: 0.85 }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, rgba(4,12,24,0.82) 0%, rgba(4,12,24,0.55) 45%, rgba(4,12,24,0.78) 100%)` }} />
        {/* Accent color glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: `linear-gradient(to top, ${pathway.accentColor}55, transparent)` }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-7" style={{ minHeight: 380 }}>
        <div>
          {/* Tier badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-xs font-bold text-white"
            style={{ background: pathway.accentColor + '40', border: `1px solid ${pathway.accentColor}60` }}>
            {pathway.icon}
            <span>{pathway.tier}</span>
          </div>
          {/* Title */}
          <h3 className="font-manrope font-extrabold text-2xl sm:text-3xl text-white leading-tight whitespace-pre-line mb-3">
            {pathway.title}
          </h3>
          {/* Description */}
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">
            {pathway.desc}
          </p>
        </div>

        <div>
          {/* Stat pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-bold text-white"
            style={{ background: pathway.accentColor }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {pathway.stat}
          </div>
          {/* CTA */}
          <Link
            to={pathway.link}
            className="flex items-center justify-between w-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-bold px-5 py-3.5 rounded-2xl transition-all group/btn backdrop-blur-sm"
          >
            <span>Explore Pathway</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CTASection = () => (
  <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
    {/* Animated bg blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="animate-blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-india-green/5 blur-3xl" />
      <div className="animate-blob-delay absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-saffron/5 blur-3xl" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Section Header ── */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-saffron/10 text-saffron text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
          Take Action Today
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900"
        >
          Your Path to a
          <span className="gradient-text"> Healthier Life</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-600 text-sm sm:text-base max-w-xl mx-auto"
        >
          Two clear next steps — start with understanding your risk, then explore your
          personalised management options.
        </motion.p>
      </div>

      {/* ── Three Management Pathway Cards — Dynamic Ken Burns ── */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            tier: 'Tier 1 — Foundation',
            title: 'Lifestyle\nManagement',
            desc: 'Diet, physical activity, behavioural therapy & sleep — the evidence-based core of every obesity treatment plan.',
            stat: '5–10% body weight loss',
            accentColor: '#10B981',
            link: '/lifestyle',
            image: 'https://placehold.co/600x400/0f766e/ffffff?text=Image:+Healthy+Indian+Thali+with+Green+Vegetables+and+Dal',
            icon: (
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <circle cx="16" cy="16" r="15" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
                <path d="M10 20c2-4 6-6 6-6s4 2 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="12" r="3" fill="white" opacity="0.9"/>
                <path d="M8 24h16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            tier: 'Tier 2 — Medical',
            title: 'Medical\nWeight Loss',
            desc: 'GLP-1 medicines (Semaglutide, Tirzepatide) and pharmacotherapy — achieving 14–22% total body weight loss.',
            stat: '14–22% body weight loss',
            accentColor: '#3B82F6',
            link: '/medical',
            image: 'https://placehold.co/600x400/0369a1/ffffff?text=Image:+Compassionate+Indian+Doctor+Consulting+Patient',
            icon: (
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <circle cx="16" cy="16" r="15" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
                <rect x="11" y="10" width="10" height="14" rx="3" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
                <line x1="16" y1="13" x2="16" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12.5" y1="17" x2="19.5" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            tier: 'Tier 3 — Surgical',
            title: 'Bariatric &\nMetabolic Surgery',
            desc: 'Laparoscopic sleeve, bypass and endoscopic procedures — 25–45% sustained weight loss with metabolic disease reversal.',
            stat: '25–45% body weight loss',
            accentColor: '#8B5CF6',
            link: '/surgical',
            image: 'https://placehold.co/600x400/4338ca/ffffff?text=Image:+Clean+Modern+Hospital+Corridor+Soft+Lighting',
            icon: (
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <circle cx="16" cy="16" r="15" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
                <path d="M10 22l4-10 4 6 3-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="21" cy="12" r="2.5" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.3)"/>
              </svg>
            ),
          },
        ].map((pathway, idx) => (
          <PathwayCard key={idx} pathway={pathway} />
        ))}
      </div>

      {/* ── Two original CTA Cards (Assessment + Explore) — restored compact ── */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* Card 1 — Free Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden shadow-xl card-shine group"
        >
          <div className="bg-gradient-to-br from-[#C9963F] to-[#F59E0B] p-8 pb-0 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              ✨ FREE — No Cost, No Commitment
            </div>
            <h3 className="font-manrope font-extrabold text-2xl mb-3 leading-snug">
              Free Health Assessment
            </h3>
            <p className="text-white/85 text-sm leading-relaxed mb-6">
              Get a comprehensive, personalised health risk assessment powered by AI.
              Understand your metabolic profile, obesity-related risks, and receive
              tailored guidance in minutes — completely free.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Personalised BMI & metabolic risk analysis',
                'Obesity-linked disease risk scoring',
                'Actionable health recommendations',
                'Guided next steps for your profile',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-[#C9963F] to-[#F59E0B] p-8 pt-0">
            <Link
              to="/digital-twin"
              className="flex items-center justify-center gap-3 bg-white text-[#C9963F] font-bold text-base w-full py-4 rounded-2xl hover:bg-orange-50 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Start Free Assessment
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Card 2 — BMI Check */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="relative rounded-3xl overflow-hidden shadow-xl card-shine group"
        >
          <div className="relative bg-[#0B2240] p-8 text-white overflow-hidden h-full flex flex-col">
            <img
              src="https://placehold.co/700x500/0b2240/5eead4?text=Image:+Doctor+and+Patient+BMI+Consultation"
              alt="Doctor and patient consultation"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B2240]/80 to-[#0D9488]/30" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 w-fit">
                📊 Indian BMI Thresholds
              </div>
              <h3 className="font-manrope font-extrabold text-2xl mb-3 leading-snug">Check Your BMI<br /><span className="text-[#5EEAD4]">Know Your Risk</span></h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
                Calculate your BMI using Indian-specific thresholds recommended by ICMR — where overweight starts at 23, not 25.
              </p>
              <div className="space-y-2 mb-8">
                {[['Overweight threshold', 'BMI ≥ 23 (Indian)'], ['Obese threshold', 'BMI ≥ 25 (Indian)'], ['Morbid obesity', 'BMI ≥ 35 (Indian)']].map(([k,v],i) => (
                  <div key={i} className="flex justify-between text-xs border-b border-white/10 pb-1.5">
                    <span className="text-white/60">{k}</span>
                    <span className="text-[#5EEAD4] font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => document.getElementById('bmi-calc')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-3 border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-bold text-base w-full py-4 rounded-2xl transition-all"
              >
                Calculate My BMI
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Trust Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10 text-slate-400 text-xs"
      >
        {[
          { label: 'WHO Guidelines', icon: '🌍' },
          { label: 'ICMR Standards', icon: '🔬' },
          { label: 'NFHS-5 Data', icon: '📊' },
          { label: 'Clinically Validated', icon: '✅' },
          { label: '100% Free Assessment', icon: '🎁' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 font-semibold">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CTASection;
