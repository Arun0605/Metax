import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Indian BMI thresholds ────────────────────
const CATEGORIES = [
  { label: 'Underweight',     min: 0,    max: 18.49, color: '#3B82F6', bg: '#EFF6FF', textClass: 'text-blue-700',     badgeClass: 'risk-underweight', icon: '⚠️', advice: 'Your BMI suggests underweight. Please consult a doctor for nutritional guidance.' },
  { label: 'Normal Weight',   min: 18.5, max: 22.99, color: '#16A34A', bg: '#F0FDF4', textClass: 'text-green-700',    badgeClass: 'risk-normal',      icon: '✅', advice: 'Great! Your BMI is in the healthy range for Indians. Maintain your current lifestyle.' },
  { label: 'Overweight',      min: 23.0, max: 24.99, color: '#D97706', bg: '#FFFBEB', textClass: 'text-amber-700',    badgeClass: 'risk-overweight',  icon: '⚠️', advice: 'You are in the overweight range (Indian threshold: 23+). Consider dietary changes and regular exercise.' },
  { label: 'Obese',           min: 25.0, max: 34.99, color: '#DC2626', bg: '#FEF2F2', textClass: 'text-red-700',      badgeClass: 'risk-obese',       icon: '🔴', advice: 'Your BMI indicates obesity. This increases risk of diabetes, heart disease and hypertension. Seek professional medical advice.' },
  { label: 'Morbidly Obese',  min: 35.0, max: 999,   color: '#9D174D', bg: '#FDF2F8', textClass: 'text-pink-900',     badgeClass: 'risk-morbid',      icon: '🚨', advice: 'Morbid obesity requires immediate medical attention. Please consult a bariatric specialist or physician urgently.' },
];

function getCategory(bmi) {
  return CATEGORIES.find(c => bmi >= c.min && bmi <= c.max) || CATEGORIES[0];
}

// Needle angle: -90° (BMI 0) → +90° (BMI 40+)
// We map BMI 15–40 to -90 to +90
function bmiToAngle(bmi) {
  const clamped = Math.max(15, Math.min(40, bmi));
  return -90 + ((clamped - 15) / 25) * 180;
}

// ── SVG Semi-Gauge ───────────────────────────
const GaugeMeter = ({ bmi, category }) => {
  const angle = bmi ? bmiToAngle(bmi) : -90;

  // Arc segments (approximate proportions)
  const arcs = [
    { color: '#3B82F6', startDeg: 0,   endDeg: 29  }, // Underweight
    { color: '#16A34A', startDeg: 29,  endDeg: 65  }, // Normal
    { color: '#D97706', startDeg: 65,  endDeg: 86  }, // Overweight
    { color: '#EF4444', startDeg: 86,  endDeg: 148 }, // Obese
    { color: '#9D174D', startDeg: 148, endDeg: 180 }, // Morbid
  ];

  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (cx, cy, r, start, end) => {
    const s = polarToCartesian(cx, cy, r, start);
    const e = polarToCartesian(cx, cy, r, end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 240 140" className="w-full max-w-[280px]">
        {/* Background track */}
        <path d={arcPath(120, 120, 90, 0, 180)} stroke="#F1F5F9" strokeWidth="20" fill="none" strokeLinecap="round" />

        {/* Colored arc segments */}
        {arcs.map((arc, i) => (
          <motion.path
            key={i}
            d={arcPath(120, 120, 90, arc.startDeg, arc.endDeg)}
            stroke={arc.color}
            strokeWidth="20"
            fill="none"
            strokeLinecap="butt"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.12, ease: 'easeOut' }}
          />
        ))}

        {/* Tick marks */}
        {[0, 36, 72, 108, 144, 180].map((deg, i) => {
          const inner = polarToCartesian(120, 120, 72, deg);
          const outer = polarToCartesian(120, 120, 86, deg);
          return (
            <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="white" strokeWidth="2" />
          );
        })}

        {/* Needle */}
        <motion.line
          x1="120" y1="120"
          x2={polarToCartesian(120, 120, 78, (angle / 180) * 180 + 90).x}
          y2={polarToCartesian(120, 120, 78, (angle / 180) * 180 + 90).y}
          stroke={category ? category.color : '#94A3B8'}
          strokeWidth="3"
          strokeLinecap="round"
          initial={false}
          animate={{
            x2: polarToCartesian(120, 120, 78, (angle / 180) * 180 + 90).x,
            y2: polarToCartesian(120, 120, 78, (angle / 180) * 180 + 90).y,
          }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <circle cx="120" cy="120" r="7" fill={category ? category.color : '#94A3B8'} />
        <circle cx="120" cy="120" r="3.5" fill="white" />

        {/* BMI label inside arc */}
        <text x="120" y="108" textAnchor="middle" fontSize="22" fontWeight="800"
          fontFamily="Manrope, sans-serif" fill={category ? category.color : '#94A3B8'}>
          {bmi ? bmi.toFixed(1) : '—'}
        </text>
        <text x="120" y="122" textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="Inter, sans-serif">
          BMI (kg/m²)
        </text>

        {/* Scale labels */}
        {[
          { deg: 0,   val: '15' },
          { deg: 36,  val: '18.5' },
          { deg: 72,  val: '23' },
          { deg: 108, val: '25' },
          { deg: 144, val: '35' },
          { deg: 180, val: '40' },
        ].map(({ deg, val }, i) => {
          const pos = polarToCartesian(120, 120, 104, deg);
          return (
            <text key={i} x={pos.x} y={pos.y + 3} textAnchor="middle"
              fontSize="7" fill="#94A3B8" fontFamily="Inter, sans-serif">
              {val}
            </text>
          );
        })}
      </svg>

      {/* Category badge */}
      {category && (
        <motion.div
          key={category.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-2 px-5 py-2 rounded-full font-bold text-sm"
          style={{ background: category.bg, color: category.color }}
        >
          {category.icon} {category.label}
        </motion.div>
      )}
    </div>
  );
};

// ── Main Component ───────────────────────────
const BMICalculatorSection = () => {
  const [unit, setUnit]           = useState('metric'); // 'metric' | 'imperial'
  const [height, setHeight]       = useState('');
  const [weight, setWeight]       = useState('');
  const [heightFt, setHeightFt]   = useState('');
  const [heightIn, setHeightIn]   = useState('');
  const [bmi, setBmi]             = useState(null);
  const [category, setCategory]   = useState(null);
  const [errors, setErrors]       = useState({});

  const calculate = () => {
    const errs = {};
    let h = parseFloat(height), w = parseFloat(weight);

    if (unit === 'imperial') {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 30.48 + inch * 2.54) / 100; // convert to metres
      w = parseFloat(weight) * 0.453592;      // lbs to kg
    } else {
      h = h / 100; // cm to metres
    }

    if (!h || h <= 0 || h > 2.5) errs.height = 'Enter a valid height';
    if (!w || w <= 0 || w > 300) errs.weight = 'Enter a valid weight';

    setErrors(errs);
    if (Object.keys(errs).length) return;

    const computed = w / (h * h);
    setBmi(computed);
    setCategory(getCategory(computed));
  };

  const reset = () => { setHeight(''); setWeight(''); setHeightFt(''); setHeightIn(''); setBmi(null); setCategory(null); setErrors({}); };

  return (
    <section id="bmi-calc" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
            </svg>
            BMI Calculator
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 section-heading section-heading-center"
          >
            Know Your
            <span className="gradient-text"> BMI Right Now</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base"
          >
            Using <strong>Indian-specific thresholds</strong> — lower than global WHO standards,
            because South Asians face higher metabolic risk at lower BMI values.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── Input Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-md border border-slate-100 p-7 sm:p-9"
          >
            {/* Unit Toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-7 w-fit">
              {['metric', 'imperial'].map(u => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); reset(); }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    unit === u ? 'bg-white text-india-green shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {u === 'metric' ? '📏 Metric (cm / kg)' : '📐 Imperial (ft / lbs)'}
                </button>
              ))}
            </div>

            {/* Height Input */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Height</label>
              {unit === 'metric' ? (
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g. 170"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className={`w-full border-2 ${errors.height ? 'border-red-400' : 'border-slate-200 focus:border-india-green'} rounded-xl px-4 py-3.5 text-sm outline-none transition-colors`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">cm</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="5"
                      value={heightFt}
                      onChange={e => setHeightFt(e.target.value)}
                      className={`w-full border-2 ${errors.height ? 'border-red-400' : 'border-slate-200 focus:border-india-green'} rounded-xl px-4 py-3.5 text-sm outline-none transition-colors`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="7"
                      value={heightIn}
                      onChange={e => setHeightIn(e.target.value)}
                      className={`w-full border-2 ${errors.height ? 'border-red-400' : 'border-slate-200 focus:border-india-green'} rounded-xl px-4 py-3.5 text-sm outline-none transition-colors`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">in</span>
                  </div>
                </div>
              )}
              {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
            </div>

            {/* Weight Input */}
            <div className="mb-7">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Weight</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={unit === 'metric' ? 'e.g. 72' : 'e.g. 160'}
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className={`w-full border-2 ${errors.weight ? 'border-red-400' : 'border-slate-200 focus:border-india-green'} rounded-xl px-4 py-3.5 text-sm outline-none transition-colors`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {unit === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
              {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={calculate}
                className="flex-1 bg-india-green hover:bg-india-green-dark text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 text-sm"
              >
                Calculate My BMI
              </button>
              {bmi && (
                <button
                  onClick={reset}
                  className="px-5 py-4 border-2 border-slate-200 text-slate-500 hover:border-slate-300 rounded-xl text-sm font-semibold transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Result text */}
            <AnimatePresence mode="wait">
              {bmi && category && (
                <motion.div
                  key={bmi}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 rounded-2xl p-5 border-2"
                  style={{ background: category.bg, borderColor: category.color + '40' }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{category.icon}</span>
                    <div>
                      <p className="font-manrope font-bold text-slate-900">
                        {category.label}
                        <span className="ml-2 text-sm font-normal" style={{ color: category.color }}>
                          (BMI: {bmi.toFixed(1)})
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">{category.advice}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row gap-3">
                    <a
                      href="/digital-twin"
                      className="flex-1 text-center bg-saffron text-white text-sm font-bold py-2.5 rounded-xl hover:bg-saffron-dark transition-colors"
                    >
                      Get Full Health Assessment →
                    </a>
                    <a
                      href="/lifestyle"
                      className="flex-1 text-center border-2 border-india-green text-india-green text-sm font-bold py-2.5 rounded-xl hover:bg-india-green/6 transition-colors"
                    >
                      Explore Management Options
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Gauge + Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Gauge */}
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-7">
              <GaugeMeter bmi={bmi} category={category} />
            </div>

            {/* Indian Threshold Reference */}
            <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
              <p className="font-manrope font-bold text-slate-800 text-sm mb-4">
                🇮🇳 Indian BMI Reference
              </p>
              <div className="space-y-2">
                {CATEGORIES.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 transition-all ${
                      category?.label === c.label ? 'scale-[1.02] shadow-sm' : ''
                    }`}
                    style={{
                      background: category?.label === c.label ? c.bg : '#F8FAFC',
                      borderLeft: `3px solid ${category?.label === c.label ? c.color : 'transparent'}`,
                    }}
                  >
                    <span className="text-sm text-slate-700 font-medium">{c.label}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: c.color }}>
                      {c.min === 0 ? '< 18.5' : c.max === 999 ? '≥ 35' : `${c.min} – ${c.max}`}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-3">
                * Indian thresholds per ICMR / WHO Asia-Pacific adapted guidelines
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>Medical Disclaimer:</strong> BMI is a screening tool only. It does not
                directly measure body fat or diagnose disease. Always consult a qualified
                healthcare professional for personalised medical advice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculatorSection;
