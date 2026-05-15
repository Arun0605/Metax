import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ── BMI Classification data ─────────────────
const INDIAN_BMI = [
  { range: '< 18.5',     label: 'Underweight',     color: '#3B82F6', bg: '#EFF6FF', risk: 'Low body weight risks' },
  { range: '18.5 – 22.9', label: 'Normal Weight',  color: '#16A34A', bg: '#F0FDF4', risk: 'Lowest health risk' },
  { range: '23.0 – 24.9', label: 'Overweight',     color: '#D97706', bg: '#FFFBEB', risk: 'Increased metabolic risk' },
  { range: '25.0 – 34.9', label: 'Obese',          color: '#DC2626', bg: '#FEF2F2', risk: 'High NCD risk' },
  { range: '≥ 35',        label: 'Morbidly Obese', color: '#9D174D', bg: '#FDF2F8', risk: 'Very high risk, intervention needed' },
];

const WHO_BMI = [
  { range: '< 18.5',     label: 'Underweight',  color: '#3B82F6', bg: '#EFF6FF' },
  { range: '18.5 – 24.9', label: 'Normal',      color: '#16A34A', bg: '#F0FDF4' },
  { range: '25.0 – 29.9', label: 'Overweight',  color: '#D97706', bg: '#FFFBEB' },
  { range: '≥ 30',        label: 'Obese',        color: '#DC2626', bg: '#FEF2F2' },
];

const CAUSES = [
  {
    title: 'Dietary Factors',
    icon: '🍔',
    desc: 'Shift towards processed, calorie-dense foods. High sugar & saturated fat intake. Excessive consumption of refined carbohydrates.',
  },
  {
    title: 'Physical Inactivity',
    icon: '🛋️',
    desc: 'Sedentary work culture. Reduced walking & manual activity. Screen-time increase across all age groups.',
  },
  {
    title: 'Socioeconomic',
    icon: '🏙️',
    desc: 'Rapid urbanisation changing food access. Lower-cost calorie-dense foods often replacing nutritious options.',
  },
  {
    title: 'Genetic & Hormonal',
    icon: '🧬',
    desc: 'Family history increases risk. Hormonal imbalances (thyroid, PCOS, insulin resistance) contribute significantly.',
  },
  {
    title: 'Psychological',
    icon: '🧠',
    desc: 'Stress eating & emotional overeating. Sleep deprivation linked to increased appetite hormones.',
  },
  {
    title: 'Environmental',
    icon: '🌆',
    desc: 'Limited safe spaces for physical activity. Aggressive food marketing targeting children. Food deserts in rural areas.',
  },
];

// ── Animated BMI Scale Bar ──────────────────
const BMIScaleBar = () => {
  const segments = [
    { label: 'Under-\nweight', width: 14, color: '#3B82F6' },
    { label: 'Normal',         width: 22, color: '#16A34A' },  // Indian: 18.5–22.9
    { label: 'Over-\nweight',  width: 14, color: '#D97706' },  // Indian: 23–24.9
    { label: 'Obese',          width: 30, color: '#EF4444' },  // Indian: 25–34.9
    { label: 'Morbidly\nObese', width: 20, color: '#9D174D' },
  ];
  return (
    <div className="w-full mt-4">
      <div className="flex h-10 rounded-xl overflow-hidden shadow-sm">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
            style={{ width: `${s.width}%`, background: s.color, transformOrigin: 'left' }}
            className="flex items-center justify-center text-white text-[9px] font-bold text-center leading-tight px-1"
          >
            {s.label}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-500 mt-1 px-0.5">
        <span>BMI 0</span><span>18.5</span><span>23</span><span>25</span><span>35</span><span>40+</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-1 text-right">* Indian-specific thresholds (lower than global WHO standards)</p>
    </div>
  );
};

const ObesityDefinitionSection = () => {
  const [tab, setTab] = useState('india');

  return (
    <section id="definition" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding Obesity
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 section-heading section-heading-center"
          >
            Definition, BMI &amp;
            <span className="gradient-text"> Diagnostic Cut-offs</span>
          </motion.h2>
        </div>

        {/* ── WHO Definition Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-3xl overflow-hidden shadow-md grid lg:grid-cols-5"
        >
          <div className="lg:col-span-3 p-8 lg:p-10 bg-gradient-to-br from-[#0F3D24] to-[#1B5E3A] relative overflow-hidden">
            {/* Background obesity image */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=70&fit=crop"
                alt=""
                className="w-full h-full object-cover object-center opacity-15"
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-manrope font-bold text-lg">What is Obesity?</p>
                  <p className="text-white/60 text-xs">WHO Clinical Definition</p>
                </div>
              </div>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-5">
                According to the <strong className="text-white">World Health Organization (WHO)</strong>,
                obesity is defined as an <em>abnormal or excessive fat accumulation</em> that presents
                a risk to health. It is a complex, chronic disease — not merely a lifestyle choice.
              </p>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-4">
                <p className="text-white font-semibold text-sm mb-2">Body Mass Index (BMI)</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  BMI (formerly the <em>Quetelet Index</em>) is calculated by dividing a person's
                  weight in kilograms by their height in metres squared:
                </p>
                <div className="mt-3 bg-white/10 rounded-xl px-5 py-3 text-center">
                  <p className="text-white font-manrope font-bold text-xl tracking-wide">
                    BMI = Weight (kg) ÷ Height² (m²)
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-xs">
                ⚠️ BMI is a screening tool, not a diagnostic measure. It should be interpreted
                alongside waist circumference, fat distribution, and clinical assessment.
              </p>
            </div>
          </div>

          {/* Visual infographic panel */}
          <div className="lg:col-span-2 bg-[#0B2240] p-7 flex flex-col justify-between gap-4">
            <div>
              <p className="font-manrope font-bold text-white text-base mb-4">Why India Uses Lower Cut-offs</p>
              <div className="space-y-3">
                {[
                  { label: 'Higher visceral fat at lower BMI', color: '#F87171', icon: '⬆' },
                  { label: 'Greater insulin resistance risk', color: '#FBBF24', icon: '📈' },
                  { label: 'Cardiovascular risk appears earlier', color: '#C4B5FD', icon: '❤' },
                  { label: 'Metabolic syndrome at lower weights', color: '#5EEAD4', icon: '⚖' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
                    <span className="text-base">{item.icon}</span>
                    <p className="text-white/85 text-xs leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Mini SVG Body-fat Comparison */}
            <div className="bg-white/8 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3">Visceral Fat Risk Comparison</p>
              <div className="flex items-end justify-around gap-4">
                {[
                  { label: 'Global BMI 25', bars: 3, color: '#F59E0B' },
                  { label: 'Indian BMI 23', bars: 5, color: '#F87171' },
                ].map((g, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="flex items-end gap-0.5">
                      {Array.from({length: 5}).map((_, j) => (
                        <div key={j} className="w-3 rounded-t-sm transition-all"
                          style={{
                            height: j < g.bars ? `${(j+1)*8}px` : '4px',
                            background: j < g.bars ? g.color : 'rgba(255,255,255,0.15)',
                            opacity: j < g.bars ? 0.8 + j*0.04 : 1,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-white/60 text-[9px] text-center leading-tight">{g.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── BMI Table Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 sm:p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              {['india', 'who'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    tab === t
                      ? 'bg-white text-india-green shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t === 'india' ? '🇮🇳 Indian Thresholds' : '🌍 WHO Global'}
                </button>
              ))}
            </div>
            <p className="hidden sm:block text-slate-400 text-xs ml-auto">
              {tab === 'india'
                ? 'ICMR / WHO Asia-Pacific adapted guidelines'
                : 'WHO Global Standard (higher thresholds)'}
            </p>
          </div>

          {/* BMI Visual scale */}
          <BMIScaleBar />

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Category</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">BMI Range</th>
                  {tab === 'india' && (
                    <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Health Risk</th>
                  )}
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {(tab === 'india' ? INDIAN_BMI : WHO_BMI).map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <span
                        className="inline-flex items-center gap-2 font-semibold text-slate-800"
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: row.color }} />
                        {row.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">{row.range}</td>
                    {tab === 'india' && (
                      <td className="py-3.5 px-4 text-slate-600 text-xs">{row.risk}</td>
                    )}
                    <td className="py-3.5 px-4">
                      <span
                        className="risk-badge"
                        style={{ background: row.bg, color: row.color }}
                      >
                        {row.label}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {tab === 'india' && (
            <div className="mt-5 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 font-semibold text-xs mb-1">⚠️ Key Indian Distinction</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  In India, overweight begins at BMI <strong>23.0</strong> (vs 25.0 globally) and
                  obesity at <strong>25.0</strong> (vs 30.0 globally). Morbid obesity is classified
                  at BMI ≥ 35.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 font-semibold text-xs mb-1">ℹ️ Children's BMI</p>
                <p className="text-blue-700 text-xs leading-relaxed">
                  For children 5–19 years, overweight is defined as BMI-for-age &gt;1 SD above the
                  WHO Growth Reference median. Obesity is &gt;2 SD above median.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Causes Grid ── */}
        <div className="mb-6">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-manrope font-bold text-2xl text-slate-900 mb-2 section-heading"
          >
            Key Factors Driving Obesity in India
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm mb-8"
          >
            Obesity is multifactorial — a complex interplay of diet, activity, environment, and biology.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAUSES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100 hover:border-india-green/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="font-manrope font-bold text-slate-900 mb-2 group-hover:text-india-green transition-colors">
                  {c.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObesityDefinitionSection;
