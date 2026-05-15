import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Hero Slideshow — medical / pharmacy / GLP-1 ── */
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1600&q=80&fit=crop', alt: 'Compassionate doctor consulting a patient about weight management', kb: 'kb-zoom-in', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80&fit=crop', alt: 'Medical prescription and pharmacotherapy for obesity', kb: 'kb-pan', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80&fit=crop', alt: 'Clinical consultation and weight management support', kb: 'kb-zoom-out', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=80&fit=crop', alt: 'Patient measuring progress on health journey', kb: 'kb-zoom-in', pos: 'object-center' },
];

/* ─── Data ─────────────────────────────────────────────────── */
const MEDICATIONS = [
  {
    id: 'orlistat',
    name: 'Orlistat',
    class: 'Lipase Inhibitor',
    mechanism: 'Blocks 30% of dietary fat absorption in the gut',
    weightLoss: '5–10%',
    weightLossKg: '4–8 kg/year',
    trial: 'XENDOS (4-year trial)',
    brands: 'Xenical (Roche), Vyfat, Olistat',
    dosing: '120 mg with each main meal (up to 3×/day)',
    cost: '₹1,500–₹3,000/month',
    sideEffects: ['Oily/loose stools if high-fat meal eaten', 'Oily spotting on clothing', 'Frequent/urgent bowel movements', 'Fat-soluble vitamin malabsorption (take supplement)'],
    pros: ['Oldest approved anti-obesity drug (since 1999)', 'Available OTC in 60 mg dose', 'Cheapest option', 'No systemic side effects', 'Works locally in gut'],
    cons: ['GI side effects can be embarrassing', 'Modest weight loss vs newer drugs', 'Compliance drops due to GI effects'],
    eligibility: 'BMI ≥27.5 with comorbidities or ≥30 (Indian guidelines)',
    color: '#F59E0B',
    badge: 'First-line Oral',
    evidence: '⭐⭐⭐',
  },
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    class: 'GLP-1 Receptor Agonist',
    mechanism: 'Mimics GLP-1 hormone — reduces appetite, slows gastric emptying, improves insulin secretion',
    weightLoss: '14–17%',
    weightLossKg: '12–17 kg (STEP 1 trial)',
    trial: 'STEP 1, STEP 4, SELECT (CV outcomes)',
    brands: 'Ozempic (diabetes, 0.5–2mg), Wegovy (obesity, 2.4mg) — Rybelsus (oral tablet). Generics: Sun Pharma Noveltreat, Alkem, Zydus, Natco (launching 2025–2026)',
    dosing: 'Weekly subcutaneous injection. Start 0.25 mg, titrate to 2.4 mg over 16–20 weeks',
    cost: 'Branded: ₹8,000–₹16,000/month | Generics (2025–26): ₹3,000–₹5,000/month',
    sideEffects: ['Nausea (most common, especially early)', 'Vomiting, diarrhoea, constipation', 'Decreased appetite (intended)', 'Rare: pancreatitis (avoid if history)', 'Rare: gallstones with rapid weight loss'],
    pros: ['Strongest evidence for weight loss (14–17%)', 'Reduces cardiovascular events by 20% (SELECT trial)', 'Excellent for diabetes remission', 'Once-weekly convenience', 'Generic versions launching — huge price drop'],
    cons: ['Requires injection (weekly)', 'Expensive currently', 'Weight regain on stopping', 'GI side effects common in first 4–8 weeks'],
    eligibility: 'BMI ≥27.5 with comorbidities or ≥32.5 (Indian guidelines)',
    color: '#10B981',
    badge: 'Most Effective Oral/Injectable',
    evidence: '⭐⭐⭐⭐⭐',
  },
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    class: 'Dual GLP-1/GIP Receptor Agonist',
    mechanism: 'Activates both GLP-1 and GIP receptors — stronger appetite suppression and metabolic effects than semaglutide alone',
    weightLoss: '15–22%',
    weightLossKg: 'Up to 21.8 kg (SURMOUNT-1)',
    trial: 'SURMOUNT-1, SURMOUNT-2, SURMOUNT-4',
    brands: 'Mounjaro (Eli Lilly) — launched March 2025 in India',
    dosing: 'Weekly subcutaneous injection. Start 2.5 mg, titrate to 5, 10, or 15 mg over months',
    cost: '₹14,000–₹17,500/month (March 2025 pricing)',
    sideEffects: ['Similar to semaglutide: nausea, vomiting', 'GI side effects typically milder than semaglutide', 'Decreased appetite (intended)', 'Rare: pancreatitis, gallstones'],
    pros: ['Highest weight loss of any medication approved', 'Often superior to semaglutide in head-to-head', 'Significant MASLD (fatty liver) improvement', 'Cardiovascular data emerging (SURPASS-CVOT)'],
    cons: ['Most expensive option currently', 'Weekly injection', 'Weight regain on stopping', 'Newly launched in India — limited real-world data'],
    eligibility: 'BMI ≥27.5 with comorbidities or ≥32.5 (Indian guidelines)',
    color: '#3B82F6',
    badge: 'Highest Weight Loss',
    evidence: '⭐⭐⭐⭐⭐',
  },
  {
    id: 'metformin',
    name: 'Metformin',
    class: 'Biguanide (Off-label for obesity)',
    mechanism: 'Reduces hepatic glucose output, improves insulin sensitivity, mild appetite suppression',
    weightLoss: '2–3%',
    weightLossKg: '2–4 kg',
    trial: 'DPP (Diabetes Prevention Programme), BIGPRO1',
    brands: 'Glyciphage, Glucophage, Obimet — widely available across India',
    dosing: '500–2,000 mg/day orally (divided doses with meals). Not approved for obesity but widely used off-label in India.',
    cost: '₹100–₹300/month',
    sideEffects: ['Nausea, loose stools (take with food)', 'Metallic taste', 'B12 deficiency long-term (supplement)', 'Rare: lactic acidosis (very rare if kidneys normal)'],
    pros: ['Extremely affordable', 'Widely available', 'Safe long-term record (50+ years)', 'Reduces diabetes risk by 31% (DPP trial)', 'Often prescribed first in India for PCOS + obesity'],
    cons: ['Modest weight loss only', 'Not FDA/CDSCO approved specifically for obesity', 'GI side effects in first weeks'],
    eligibility: 'Typically used for prediabetes, PCOS, or as adjunct to other obesity medicines',
    color: '#8B5CF6',
    badge: 'Off-label / Adjunct',
    evidence: '⭐⭐⭐',
  },
  {
    id: 'topiramate',
    name: 'Topiramate / Phentermine-Topiramate',
    class: 'Anticonvulsant + Sympathomimetic combo',
    mechanism: 'Reduces appetite via multiple pathways including GABA modulation; combination with phentermine increases sympathetic tone',
    weightLoss: '8–11%',
    weightLossKg: '8–10 kg (CONQUER trial)',
    trial: 'CONQUER trial (phentermine/topiramate)',
    brands: 'Qsymia (USA). In India: Topiramate alone — Topamax, Topamac. Phentermine not approved in India.',
    dosing: 'Topiramate 25–100 mg/day (off-label in India). Phentermine-topiramate combination not available in India.',
    cost: 'Topiramate: ₹500–₹1,500/month',
    sideEffects: ['Cognitive slowing ("brain fog")', 'Paraesthesia (tingling)', 'Kidney stones (increased risk)', 'Mood changes', 'Teratogenic — STRICTLY contraindicated in pregnancy'],
    pros: ['Significant weight loss', 'Available in India as topiramate alone', 'May help binge eating disorder'],
    cons: ['Cognitive side effects', 'Teratogenic — women must use contraception', 'Combination not approved in India', 'Not commonly used for obesity in India'],
    eligibility: 'Specialist-only. Not suitable for women trying to conceive.',
    color: '#EF4444',
    badge: 'Specialist Use',
    evidence: '⭐⭐⭐',
  },
];

const ELIGIBILITY = [
  { bmi: '≥27.5', condition: 'BMI ≥27.5 kg/m²', req: 'Plus at least ONE comorbidity (Type 2 Diabetes, Hypertension, Dyslipidaemia, OSA, MASLD/NAFLD, PCOS, CVD)', color: '#F59E0B' },
  { bmi: '≥32.5', condition: 'BMI ≥32.5 kg/m²', req: 'Medicines appropriate with or without comorbidities (Indian-specific threshold, lower than global 30 due to South Asian phenotype)', color: '#10B981' },
];

const COMPARISON_TABLE = [
  { drug: 'Orlistat', loss: '5–10%', frequency: '3×/day oral', cost: '₹1,500–3,000', suitable: 'BMI 27.5+ with comorbidities', diabetes: 'Neutral', heart: 'Neutral' },
  { drug: 'Semaglutide', loss: '14–17%', frequency: 'Once-weekly injection', cost: '₹3,000–16,000', suitable: 'BMI 27.5+ with comorbidities', diabetes: '✅ Excellent', heart: '✅ Proven (SELECT)' },
  { drug: 'Tirzepatide', loss: '15–22%', frequency: 'Once-weekly injection', cost: '₹14,000–17,500', suitable: 'BMI 27.5+ with comorbidities', diabetes: '✅ Excellent', heart: '🔄 Emerging data' },
  { drug: 'Metformin', loss: '2–3%', frequency: '2–3×/day oral', cost: '₹100–300', suitable: 'Prediabetes, PCOS, adjunct', diabetes: '✅ Good', heart: '✅ Mild benefit' },
  { drug: 'Topiramate', loss: '8–11%', frequency: 'Daily oral', cost: '₹500–1,500', suitable: 'Specialist only', diabetes: 'Neutral', heart: 'Neutral' },
];

/* ─── Component ─────────────────────────────────────────────── */
const MedicalPage = () => {
  const [activeMed, setActiveMed] = useState('semaglutide');
  const [showComparison, setShowComparison] = useState(false);
  const med = MEDICATIONS.find(m => m.id === activeMed);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroKey, setHeroKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
      setHeroKey(k => k + 1);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const currentSlide = HERO_SLIDES[heroSlide];

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: '#030B18', minHeight: 420 }}>
        {/* Ken Burns cycling slideshow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={heroSlide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <img
                key={heroKey}
                src={currentSlide.src}
                alt={currentSlide.alt}
                className={`w-full h-full object-cover ${currentSlide.pos} ${currentSlide.kb}`}
                style={{ opacity: 0.65 }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,13,26,0.62) 0%, rgba(11,34,64,0.55) 32%, rgba(10,45,90,0.50) 65%, rgba(4,16,30,0.78) 100%)' }} />
        </div>
        {/* Slide dots */}
        <div className="absolute top-5 right-5 z-20 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setHeroSlide(i); setHeroKey(k => k + 1); }}
              className="transition-all duration-300"
              style={{ width: i === heroSlide ? 18 : 6, height: 6, borderRadius: 3, background: i === heroSlide ? '#3B82F6' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#3B82F6]/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full bg-[#0D9488]/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 pt-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>

          {/* Alert */}
          <div className="bg-amber-500/15 border border-amber-400/30 rounded-xl p-4 mb-6 max-w-2xl flex items-start gap-3">
            <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
            <p className="text-amber-200 text-sm leading-relaxed">
              <strong>Medical Supervision Required.</strong> Anti-obesity medicines should only be started and monitored by a qualified doctor. This page provides educational information only.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-[260px]">
              <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse" /> Tier 2 — When Lifestyle Alone Isn't Enough
              </div>
              <h1 className="text-4xl sm:text-5xl font-manrope font-extrabold text-white mb-4 leading-tight">
                Medical<br />
                <span style={{ background: 'linear-gradient(135deg, #93C5FD, #5EEAD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Weight Loss
                </span>
              </h1>
              <p className="text-white/70 text-base max-w-xl leading-relaxed">
                Modern obesity pharmacotherapy — including revolutionary GLP-1 medicines — can achieve{' '}
                <strong className="text-white">14–22% body weight loss</strong> when combined with lifestyle changes.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[['22%', 'Max weight loss (Tirzepatide)'], ['₹3,000', 'Generic GLP-1 from 2026'], ['5 options', 'Medicines available in India']].map(([v, l]) => (
                <div key={l} className="glass-card rounded-2xl px-4 py-4 text-center min-w-[110px]">
                  <div className="text-xl font-manrope font-extrabold text-[#93C5FD]">{v}</div>
                  <div className="text-xs text-white/55 mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['STEP 1 Trial (2021)', 'SURMOUNT-1 (2022)', 'SELECT Outcomes Trial', 'CDSCO 2024 Guidelines'].map(b => (
              <span key={b} className="text-xs bg-white/10 border border-white/15 text-white/60 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48 }}>
            <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,16 1440,24 L1440,48 L0,48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </div>

      {/* ── Eligibility ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-manrope font-bold text-slate-900 text-2xl mb-2">Who Qualifies for Medication?</h2>
        <p className="text-slate-500 text-sm mb-6">Based on Indian Association for the Study of Obesity (IASO) and ICMR guidelines — thresholds are lower than global due to South Asian phenotype</p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {ELIGIBILITY.map((e, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm border-t-4" style={{ borderTopColor: e.color }}>
              <div className="text-3xl font-manrope font-extrabold mb-1" style={{ color: e.color }}>{e.bmi}</div>
              <div className="font-semibold text-slate-800 mb-2">{e.condition}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{e.req}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 mb-10">
          <strong>Also prerequisite:</strong> Minimum 3–6 months of sincere lifestyle modification (diet + exercise) with documented inadequate response. Medicines work best as addition to, not replacement for, lifestyle changes.
        </div>

        {/* Medicine Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {MEDICATIONS.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMed(m.id)}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border-2"
              style={activeMed === m.id
                ? { background: m.color, color: '#fff', borderColor: m.color, boxShadow: `0 4px 16px ${m.color}40` }
                : { background: '#fff', color: '#64748B', borderColor: '#E2E8F0' }}
            >
              {m.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMed}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            {/* Medicine Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-manrope font-bold text-slate-900 text-2xl">{med.name}</h2>
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: med.color }}>{med.badge}</span>
                  </div>
                  <p className="text-slate-500 text-sm">{med.class}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-slate-400 mr-1">Evidence:</span>
                    <span className="text-sm">{med.evidence}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-manrope font-extrabold" style={{ color: med.color }}>{med.weightLoss}</div>
                    <div className="text-xs text-slate-400">body weight lost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-manrope font-bold text-slate-700">{med.weightLossKg}</div>
                    <div className="text-xs text-slate-400">typical kg range</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-1">How It Works</h3>
                <p className="text-slate-600 text-sm">{med.mechanism}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Brands in India</h3>
                  <p className="text-slate-600 text-sm">{med.brands}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Dosing</h3>
                  <p className="text-slate-600 text-sm">{med.dosing}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Monthly Cost (India)</h3>
                  <p className="text-slate-700 text-sm font-semibold">{med.cost}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Key Trial</h3>
                  <p className="text-slate-600 text-sm">{med.trial}</p>
                </div>
              </div>
            </div>

            {/* Pros / Cons / Side Effects */}
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs">✓</span>
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {med.pros.map((p, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                  Limitations
                </h3>
                <ul className="space-y-2">
                  {med.cons.map((c, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-xs">⚠</span>
                  Side Effects
                </h3>
                <ul className="space-y-2">
                  {med.sideEffects.map((s, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Eligibility note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <strong>Eligibility Note:</strong> {med.eligibility}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Comparison Table ── */}
      <div className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-manrope font-bold text-slate-900 text-2xl">Quick Comparison</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-sm text-[#3B82F6] font-semibold flex items-center gap-1"
            >
              {showComparison ? 'Hide' : 'Show'} full table
              <svg className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          <AnimatePresence>
            {showComparison && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        {['Medicine', 'Weight Loss', 'How Given', 'Cost/Month', 'Best For', 'Diabetes', 'Heart'].map(h => (
                          <th key={h} className="text-left p-3 font-semibold text-slate-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_TABLE.map((row, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="p-3 font-semibold text-slate-800">{row.drug}</td>
                          <td className="p-3 text-slate-700 font-medium">{row.loss}</td>
                          <td className="p-3 text-slate-600">{row.frequency}</td>
                          <td className="p-3 text-slate-600">{row.cost}</td>
                          <td className="p-3 text-slate-600 max-w-[160px]">{row.suitable}</td>
                          <td className="p-3 text-slate-600">{row.diabetes}</td>
                          <td className="p-3 text-slate-600">{row.heart}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showComparison && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {MEDICATIONS.map(m => (
                <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-base font-manrope font-bold text-slate-800 mb-1">{m.name}</div>
                  <div className="text-xl font-extrabold font-manrope mb-1" style={{ color: m.color }}>{m.weightLoss}</div>
                  <div className="text-xs text-slate-400">weight loss</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── GLP-1 India Context ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-3xl p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #060D1A 0%, #0B2240 40%, #0A2D5A 100%)' }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10">
            <h2 className="font-manrope font-bold text-2xl mb-2">🇮🇳 The India GLP-1 Revolution</h2>
            <p className="text-white/65 mb-8 text-sm">What's happening in India's weight loss medicine market right now</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🏭', title: 'Generic Semaglutide Launches (2025–2026)', body: 'Sun Pharma\'s Noveltreat, Alkem, Zydus, Natco, and others received CDSCO approval. Generic semaglutide expected to drop from ₹8,000–16,000 to ₹3,000–5,000/month. Game-changer for affordability.' },
                { icon: '🚀', title: 'Tirzepatide Launched March 2025', body: 'Eli Lilly launched Mounjaro in India at ₹14,000–17,500/month. Already India\'s fastest-growing weight-loss drug. Superior weight loss vs semaglutide in trials.' },
                { icon: '💡', title: 'Indian Phenotype Advantage', body: 'South Asians develop metabolic disease at lower BMI. GLP-1 drugs are particularly effective in Indians — significant benefit even at BMI 27–30 with comorbidities.' },
                { icon: '⚖️', title: 'Insurance Coverage (Improving)', body: 'Some corporate health plans now covering anti-obesity medicines. IRDAI exploring policy changes. Check your employer health policy — coverage is expanding rapidly.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-5 border border-white/10">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="max-w-6xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/lifestyle" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all group">
            <span className="text-2xl">🥗</span>
            <div className="flex-1"><div className="font-semibold text-slate-700">Lifestyle Management</div><div className="text-xs text-slate-400">Diet, exercise, behaviour, sleep</div></div>
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all group">
            <svg className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div><div className="font-semibold text-slate-700">Back to Home</div><div className="text-xs text-slate-400">Overview &amp; BMI Calculator</div></div>
          </Link>
          <Link to="/surgical" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-200 hover:shadow-md transition-all group">
            <span className="text-2xl">🔬</span>
            <div className="flex-1"><div className="font-semibold text-slate-700">Surgical/Procedural</div><div className="text-xs text-slate-400">Bariatric surgery guide for India</div></div>
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicalPage;
