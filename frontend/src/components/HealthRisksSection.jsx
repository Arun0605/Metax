import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// ── NCD Death Data (WHO India Profile 2018) ─
const NCD_DEATHS = [
  { name: 'Cardiovascular', value: 27, color: '#DC2626', icon: '❤️', desc: 'Heart attacks, strokes, hypertension. Leading cause of NCD mortality in India.' },
  { name: 'Other NCDs (incl. Obesity)', value: 13, color: '#9D174D', icon: '⚙️', desc: 'Includes obesity-related disorders, kidney disease, and metabolic conditions.' },
  { name: 'Respiratory', value: 11, color: '#D97706', icon: '🫁', desc: 'COPD, asthma. Obesity worsens breathing and sleep apnea dramatically.' },
  { name: 'Cancer', value: 9, color: '#7C3AED', icon: '🔬', desc: 'Obesity is linked to 13+ types of cancer including breast, colon, and endometrial.' },
  { name: 'Diabetes', value: 3, color: '#0D9488', icon: '💉', desc: 'Type 2 diabetes is strongly driven by obesity. India is the diabetes capital of the world.' },
  { name: 'Communicable / Other', value: 37, color: '#94A3B8', icon: '🦠', desc: 'Non-NCD deaths. Context for scale of NCD burden.' },
];

// ── Disease Risk Cards ─────────────────────
const DISEASES = [
  {
    title: 'Type 2 Diabetes',
    risk: '5× higher risk',
    color: '#0D9488',
    bg: '#F0FDFA',
    border: '#CCFBF1',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#CCFBF1"/>
        <path d="M24 14v10l7 4" stroke="#0D9488" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="#0D9488"/>
        <path d="M15 36s2-4 9-4 9 4 9 4" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    desc: 'Excess fat, especially around the abdomen, causes insulin resistance. India has 101 million people with diabetes — rising rapidly with obesity.',
    stats: '101M diabetics in India (IDF 2023)',
  },
  {
    title: 'Cardiovascular Disease',
    risk: '3× higher risk',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#FEE2E2"/>
        <path d="M24 34s-12-7-12-15a8 8 0 0116 0 8 8 0 0116 0C44 27 36 34 24 34z" fill="#DC2626" opacity=".8"/>
        <path d="M16 22h4l2-4 4 8 2-4h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    desc: 'Obesity raises blood pressure, cholesterol, and triglycerides. CVD is responsible for 27% of all NCD deaths in India. South Asians develop CVD a decade earlier than Westerners.',
    stats: '27% of NCD deaths from CVD',
  },
  {
    title: 'Hypertension',
    risk: '2× higher risk',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#EDE9FE"/>
        <rect x="16" y="18" width="16" height="12" rx="6" fill="#7C3AED" opacity=".8"/>
        <path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="white"/>
      </svg>
    ),
    desc: 'Excess body weight significantly raises blood pressure, straining the heart and blood vessels. Uncontrolled hypertension leads to strokes and kidney failure.',
    stats: '220M Indians have hypertension',
  },
  {
    title: 'Sleep Apnea',
    risk: '7× higher risk',
    color: '#1E40AF',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#DBEAFE"/>
        <path d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#1E40AF" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M14 24c0 5.5 4.5 10 10 10" stroke="#1E40AF" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round"/>
        <path d="M28 20l4-4M32 20h-4v-4" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
        <text x="22" y="28" fontSize="8" fill="#1E40AF" fontWeight="bold">Zzz</text>
      </svg>
    ),
    desc: 'Fatty tissue around the throat causes airway blockages during sleep. Sleep apnea is severely underdiagnosed in India yet strongly tied to obesity and metabolic syndrome.',
    stats: 'Up to 6× more common in obese adults',
  },
  {
    title: 'Cancer Risk',
    risk: '13+ cancer types',
    color: '#9D174D',
    bg: '#FDF2F8',
    border: '#FBCFE8',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#FCE7F3"/>
        <circle cx="24" cy="24" r="7" fill="#9D174D" opacity=".7"/>
        <path d="M24 12v4M24 32v4M12 24h4M32 24h4M16.1 16.1l2.83 2.83M29.07 29.07l2.83 2.83M16.1 31.9l2.83-2.83M29.07 18.93l2.83-2.83" stroke="#9D174D" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    desc: 'Obesity is a significant risk factor for at least 13 types of cancer including breast, colon, endometrial, liver, and kidney. Chronic inflammation from excess fat promotes tumour growth.',
    stats: 'Linked to 9% of NCD deaths',
  },
  {
    title: 'Joint & Bone Disease',
    risk: '4× higher risk',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="20" fill="#FEF3C7"/>
        <path d="M18 14l4 8 4-4 4 10" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="14" r="3" fill="#D97706"/>
        <circle cx="34" cy="28" r="3" fill="#D97706"/>
        <path d="M16 34h16" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    desc: 'Every extra kilogram puts 4 kg of pressure on the knees. Osteoarthritis, back pain, and joint inflammation are extremely common in obese Indians, particularly affecting daily mobility.',
    stats: 'Every 5 kg gain = 36% higher OA risk',
  },
];

// ── Custom Tooltip for Pie ────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100 max-w-[200px]">
      <p className="font-manrope font-bold text-slate-900 text-sm">{d.icon} {d.name}</p>
      <p className="text-2xl font-extrabold mt-1" style={{ color: d.color }}>{d.value}%</p>
      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{d.desc}</p>
    </div>
  );
};

// ── Disease Card ───────────────────────────
const DiseaseCard = ({ d, i }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      onClick={() => setExpanded(!expanded)}
      className="rounded-2xl p-5 border-2 cursor-pointer initiative-card card-shine"
      style={{ background: d.bg, borderColor: d.border }}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">{d.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-manrope font-bold text-slate-900 text-sm">{d.title}</h3>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2"
              style={{ background: d.color + '20', color: d.color }}
            >
              {d.risk}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">{d.stats}</p>
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 text-xs leading-relaxed mt-3">{d.desc}</p>
          </motion.div>
          <button
            className="mt-2 text-xs font-semibold flex items-center gap-1"
            style={{ color: d.color }}
          >
            {expanded ? 'Show less' : 'Read more'}
            <svg
              className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── SVG Illustration Complication Cards ────
const COMPLICATION_ILLUSTRATIONS = [
  {
    label: 'Cardiovascular Disease',
    stat: '27% of NCD deaths',
    caption: 'Heart attacks, stroke & hypertension',
    gradFrom: '#DC2626', gradTo: '#7F1D1D',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="48" r="34" fill="rgba(255,255,255,0.12)"/>
        <path d="M50 66C50 66 26 52 26 36a15 15 0 0130 0 15 15 0 0130 0c0 16-36 30-36 30z" fill="white" opacity="0.92"/>
        <path d="M22 50l7 0 4-10 5 18 5-22 4 14 7 0" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Type 2 Diabetes',
    stat: '5× higher risk',
    caption: '101 million diabetics in India',
    gradFrom: '#0D9488', gradTo: '#065F46',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="45" r="34" fill="rgba(255,255,255,0.12)"/>
        <rect x="30" y="26" width="40" height="32" rx="6" fill="rgba(255,255,255,0.22)" stroke="white" strokeWidth="1.5"/>
        <text x="50" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">126</text>
        <text x="50" y="55" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7">mg/dL</text>
        <path d="M62 20c0-4 6-11 6-11s6 7 6 11a6 6 0 01-12 0z" fill="#F87171"/>
        <path d="M65 68l-3-4h6l-3 4z" fill="rgba(255,255,255,0.5)"/>
        <line x1="65" y1="64" x2="65" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: 'Hypertension',
    stat: '220M Indians affected',
    caption: 'Silent killer — often no symptoms',
    gradFrom: '#7C3AED', gradTo: '#4C1D95',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="45" r="34" fill="rgba(255,255,255,0.12)"/>
        <rect x="28" y="30" width="44" height="26" rx="13" fill="rgba(255,255,255,0.20)" stroke="white" strokeWidth="1.5"/>
        <circle cx="50" cy="43" r="8" fill="white" opacity="0.9"/>
        <path d="M46 43l3 3 5-6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 58l4-6M70 58l-4-6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="50" y="72" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="7" fontFamily="sans-serif">160/100 mmHg</text>
      </svg>
    ),
  },
  {
    label: 'Sleep Apnea',
    stat: '7× higher risk',
    caption: 'Severely underdiagnosed in India',
    gradFrom: '#1D4ED8', gradTo: '#1E3A8A',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="45" r="34" fill="rgba(255,255,255,0.12)"/>
        <path d="M32 52c0-10 8-18 18-18s18 8 18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M32 52c0 10 8 18 18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3"/>
        <text x="68" y="35" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="sans-serif" fontWeight="600">z</text>
        <text x="75" y="26" fill="rgba(255,255,255,0.65)" fontSize="7" fontFamily="sans-serif">z</text>
        <text x="80" y="18" fill="rgba(255,255,255,0.45)" fontSize="5" fontFamily="sans-serif">z</text>
      </svg>
    ),
  },
  {
    label: 'Cancer Risk',
    stat: '13+ cancer types',
    caption: 'Breast, colon, endometrial & more',
    gradFrom: '#9D174D', gradTo: '#831843',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="45" r="34" fill="rgba(255,255,255,0.12)"/>
        <circle cx="50" cy="45" r="12" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5"/>
        <circle cx="50" cy="45" r="6" fill="white" opacity="0.8"/>
        <line x1="50" y1="22" x2="50" y2="30" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="60" x2="50" y2="68" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="27" y1="45" x2="35" y2="45" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="65" y1="45" x2="73" y2="45" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="29" x2="40" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="66" y2="61" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="66" y1="29" x2="60" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="61" x2="40" y2="55" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Joint & Bone Disease',
    stat: '4× higher risk',
    caption: '5 kg gain = 36% higher OA risk',
    gradFrom: '#D97706', gradTo: '#92400E',
    svg: (
      <svg viewBox="0 0 100 90" className="w-20 h-16" fill="none">
        <circle cx="50" cy="45" r="34" fill="rgba(255,255,255,0.12)"/>
        <path d="M40 22c-3 0-6 3-6 8s4 8 6 8" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M40 38c0 0-2 2-2 7s2 7 2 7" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <ellipse cx="43" cy="45" rx="8" ry="5" fill="rgba(255,255,255,0.20)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
        <path d="M46 52c0 0 2 2 2 7s-2 7-2 7" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M46 52c3 0 6 3 6 8s-4 8-6 8" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M36 44l4-3M48 40l4 3" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ── Main Section ──────────────────────────
const HealthRisksSection = () => (
  <section id="health-risks" className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Header ── */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Health Risks &amp; NCDs
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 section-heading section-heading-center"
        >
          Obesity Fuels India's
          <span className="gradient-text"> NCD Epidemic</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Non-communicable diseases (NCDs) cause <strong>63% of all deaths in India</strong>{' '}
          (WHO, 2018). Obesity is a primary driver — directly causing and accelerating
          the most prevalent NCDs.
        </motion.p>
      </div>

      {/* ── SVG Illustration Complication Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {COMPLICATION_ILLUSTRATIONS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="relative rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-between p-4 cursor-default"
            style={{
              minHeight: 180,
              background: `linear-gradient(145deg, ${item.gradFrom}, ${item.gradTo})`,
            }}
          >
            {/* Soft glow */}
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 30%, white, transparent 70%)` }} />
            <div className="relative z-10 flex flex-col items-center gap-2 h-full">
              <div className="flex-1 flex items-center justify-center mt-2">
                {item.svg}
              </div>
              <div className="text-center mt-auto">
                <p className="text-white font-manrope font-bold text-xs leading-snug">{item.label}</p>
                <p className="text-white/80 text-[10px] mt-0.5 font-semibold">{item.stat}</p>
                <p className="text-white/55 text-[9px] mt-0.5 leading-tight">{item.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Alert Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 rounded-2xl overflow-hidden relative"
      >
        <img
          src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=70&fit=crop"
          alt="Medical health crisis"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/90 to-[#9D174D]/90" />
        <div className="relative z-10 p-6 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
            ⚠️
          </div>
          <div>
            <p className="font-manrope font-bold text-lg">
              NCDs cause 63% of all deaths in India
            </p>
            <p className="text-white/80 text-sm mt-1 leading-relaxed">
              Cardiovascular diseases (27%), chronic respiratory diseases (11%), cancers (9%),
              diabetes (3%), and other conditions including obesity-related disorders (13%).
              Most are preventable through lifestyle changes.
            </p>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-5xl font-extrabold text-white">3.7M</p>
            <p className="text-white/70 text-xs mt-1">deaths/year from<br />excess body weight (WHO)</p>
          </div>
        </div>
      </motion.div>

      {/* ── Pie Chart + Disease Cards ── */}
      <div className="grid lg:grid-cols-2 gap-10 mb-12 items-start">

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 sm:p-8"
        >
          <h3 className="font-manrope font-bold text-slate-900 mb-1">
            Causes of NCD Deaths — India
          </h3>
          <p className="text-slate-400 text-xs mb-6">Source: WHO NCD India Profile 2018</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={NCD_DEATHS}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                animationBegin={100}
                animationDuration={1200}
              >
                {NCD_DEATHS.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={10}
                formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {NCD_DEATHS.slice(0, 5).map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span>{d.name}: <strong style={{ color: d.color }}>{d.value}%</strong></span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disease Cards */}
        <div className="space-y-4">
          <p className="font-manrope font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-saffron" />
            Click any card to read more
          </p>
          {DISEASES.slice(0, 4).map((d, i) => (
            <DiseaseCard key={i} d={d} i={i} />
          ))}
        </div>
      </div>

      {/* Remaining disease cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {DISEASES.slice(4).map((d, i) => (
          <DiseaseCard key={i + 4} d={d} i={i + 4} />
        ))}
      </div>

      {/* ── Modifiable Risk Factors Box ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-10 rounded-3xl bg-[#F0FDF4] border border-green-200 p-7 grid sm:grid-cols-2 gap-6 items-center"
      >
        <div>
          <p className="font-manrope font-bold text-india-green text-xl mb-3">
            The Good News: Most Risk Factors Are Preventable
          </p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            Tobacco use, unhealthy diets, physical inactivity, and alcohol consumption
            are modifiable. These factors contribute to obesity, high blood pressure,
            elevated blood sugar, and raised cholesterol — all preventable.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Healthy Diet', 'Regular Exercise', 'No Tobacco', 'Limit Alcohol', 'Manage Stress', 'Regular Screening'].map((tag, i) => (
              <span key={i} className="bg-india-green/10 text-india-green text-xs font-semibold px-3 py-1.5 rounded-full">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=600&q=80&fit=crop"
            alt="Person managing weight and health"
            className="w-full h-48 object-cover rounded-2xl shadow-md"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HealthRisksSection;
