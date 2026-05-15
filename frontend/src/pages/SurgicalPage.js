import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Hero Slideshow — bariatric / surgery / recovery ── */
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80&fit=crop', alt: 'Skilled bariatric surgical team performing laparoscopic procedure', kb: 'kb-zoom-in', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=80&fit=crop', alt: 'Modern hospital operating theatre equipment', kb: 'kb-pan', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1600&q=80&fit=crop', alt: 'Compassionate surgical team consultation before bariatric procedure', kb: 'kb-zoom-out', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80&fit=crop', alt: 'Patient celebrating weight loss milestone after surgery', kb: 'kb-zoom-in', pos: 'object-center' },
];

/* ─── Data ─────────────────────────────────────────────────── */
const PROCEDURES = [
  {
    id: 'balloon',
    name: 'Intragastric Balloon',
    type: 'Endoscopic — No Incisions',
    icon: '🫁',
    tag: 'No Surgery',
    tagColor: '#10B981',
    weightLoss: '10–15%',
    weightLossKg: '8–15 kg',
    duration: 'Procedure: 20–30 min | In body: 6–16 weeks',
    hospital: 'Day procedure, home same day',
    recovery: '2–3 days',
    reversible: true,
    bestFor: 'BMI 27–40; bridging to surgery; people not ready for surgery',
    eligibility: 'BMI 27–40 with comorbidities. Ideal "first step" or for people wanting non-surgical option.',
    mechanism: 'A saline-filled silicone balloon (400–700 mL) is placed in the stomach endoscopically. It partially fills the stomach, reducing capacity and promoting early satiety.',
    types: [
      { name: 'Orbera Intragastric Balloon', how: 'Endoscope placement', duration: '6–12 months in place', cost: '₹3–5 lakh', note: 'Gold standard; longest published data' },
      { name: 'Allurion (Swallowable)', how: 'Swallow capsule — no endoscope needed', duration: '16 weeks, self-deflates', cost: '₹2.5–4 lakh', note: 'No anaesthesia; most comfortable; growing in India' },
    ],
    pros: ['No cuts, no general anaesthesia (Allurion)', 'Completely reversible', 'Same-day discharge', 'Good for BMI 27–35', 'Kickstarts weight loss before lifestyle takes effect'],
    cons: ['Temporary — weight regain possible after removal if habits not changed', 'Nausea and vomiting common first 1–2 weeks', 'Cannot eat large meals (intended)', 'Rare: balloon deflation, migration', 'Not suitable if history of esophageal/gastric issues'],
    longTerm: 'Without sustained lifestyle changes, most balloon patients regain 50–70% of weight within 1–2 years. It is a "bridge" and kickstart tool, not a permanent solution.',
    indianContext: 'Allurion balloon gaining popularity in Indian tier-1 cities (Mumbai, Delhi, Bangalore). Several certified centres available. Post-procedure coaching through app included with Allurion programme.',
    color: '#10B981',
  },
  {
    id: 'sleeve',
    name: 'Sleeve Gastrectomy (LSG)',
    type: 'Laparoscopic Surgery',
    icon: '✂️',
    tag: 'Most Popular in India',
    tagColor: '#3B82F6',
    weightLoss: '25–30%',
    weightLossKg: '20–35 kg',
    duration: 'Surgery: 45–60 min',
    hospital: '2–3 days hospital stay',
    recovery: '2–3 weeks to normal activity',
    reversible: false,
    bestFor: 'BMI >32.5–37.5 or BMI >27.5 with poorly controlled T2DM, HTN, PCOS',
    eligibility: 'BMI ≥32.5 with comorbidities or ≥37.5 without. Lower threshold (BMI ≥27.5) with metabolic syndrome.',
    mechanism: 'Approximately 75–80% of the stomach is removed laparoscopically, creating a narrow "sleeve" or banana-shaped stomach (~100–150 mL). Also reduces ghrelin (hunger hormone) by removing the gastric fundus.',
    types: [
      { name: 'Standard LSG', how: 'Laparoscopic (keyhole surgery, 5 small incisions)', duration: 'Permanent', cost: '₹4–6 lakh', note: 'Most performed bariatric surgery in India' },
      { name: 'Single Incision LSG', how: 'Through single port at belly button', duration: 'Permanent', cost: '₹5–7 lakh', note: 'Better cosmesis; specialist centres only' },
    ],
    pros: ['Most commonly performed bariatric surgery in India', 'Relatively simple technically (shorter OR time)', 'Good weight loss: 25–30% total body weight', 'Significant improvement in T2DM, HTN, PCOS, MASLD', 'No intestinal rerouting (simpler nutritional management)', 'Hunger reduced (ghrelin decrease)'],
    cons: ['Irreversible', 'Stomach leak risk <1% (most serious complication)', 'GERD/acid reflux may worsen in some patients', 'Weight regain possible at 5+ years if habits poor', 'No added diabetes remission benefit vs RYGB'],
    longTerm: 'Long-term outcomes at 5 years: average 20–25% total body weight loss maintained. Requires lifelong vitamin supplementation (B12, iron, calcium). Annual follow-up recommended.',
    indianContext: 'LSG is the #1 bariatric surgery in India. Available at hundreds of certified bariatric centres nationwide. IFSO India chapter and Indian Society for Bariatric and Metabolic Surgery set the standards of care.',
    color: '#3B82F6',
  },
  {
    id: 'rygb',
    name: 'Roux-en-Y Gastric Bypass (RYGB)',
    type: 'Laparoscopic Surgery',
    icon: '🔀',
    tag: 'Gold Standard for Diabetes',
    tagColor: '#8B5CF6',
    weightLoss: '27–32%',
    weightLossKg: '25–40 kg',
    duration: 'Surgery: 90–120 min',
    hospital: '3–4 days hospital stay',
    recovery: '3–4 weeks',
    reversible: false,
    bestFor: 'Diabetes-dominant patients, severe GERD, BMI >40 or BMI >32.5 with T2DM',
    eligibility: 'BMI ≥32.5 with T2DM or severe GERD. Often preferred over sleeve for patients with poorly controlled diabetes.',
    mechanism: 'A small gastric pouch (30–50 mL) is created at the top of the stomach. The small intestine is rerouted (Roux-en-Y configuration) so food bypasses most of the stomach and upper small intestine. Dual mechanism: restriction + malabsorption + powerful gut hormone changes.',
    types: [
      { name: 'Standard RYGB', how: 'Laparoscopic', duration: 'Permanent', cost: '₹5–7 lakh', note: 'Gold standard globally for metabolic surgery' },
      { name: 'Robotic RYGB', how: 'Robotic-assisted laparoscopic', duration: 'Permanent', cost: '₹8–12 lakh', note: 'Better precision; premium centres; higher cost' },
    ],
    pros: ['Gold standard for diabetes remission (60–80% T2DM remission)', 'Highest cardiovascular risk reduction of all procedures', 'Excellent long-term data (30+ years of evidence)', 'Superior for patients with GERD vs sleeve', 'Reverses MASLD significantly'],
    cons: ['More complex surgery (higher technical skill needed)', 'More nutritional complications: B12, iron, calcium — lifelong supplements essential', 'Dumping syndrome possible after sweet/high-fat meals', 'Irreversible', 'Rare: internal hernia, anastomotic leak'],
    longTerm: '10-year data shows sustained weight loss of 25% of original body weight on average. T2DM remission durable at 10 years in 50–60% of patients. Annual blood tests essential.',
    indianContext: 'Second most common bariatric surgery in India. Preferred for patients with BMI >37.5, severe T2DM, or GERD. Available at major centres across India.',
    color: '#8B5CF6',
  },
  {
    id: 'oagb',
    name: 'One-Anastomosis Gastric Bypass (OAGB/MGB)',
    type: 'Laparoscopic Surgery',
    icon: '🔁',
    tag: 'Highest Loss — India Favourite',
    tagColor: '#C9963F',
    weightLoss: '30–40%',
    weightLossKg: '30–50 kg',
    duration: 'Surgery: 45–75 min',
    hospital: '2–3 days',
    recovery: '2–3 weeks',
    reversible: false,
    bestFor: 'High BMI (>37.5), strong diabetes, repeat surgery for inadequate LSG weight loss',
    eligibility: 'BMI ≥37.5 or ≥32.5 with difficult-to-control T2DM. Also used as revisional surgery.',
    mechanism: 'A long narrow gastric sleeve is created, then a single anastomosis (connection) is made between the stomach sleeve and a loop of small intestine 200–250 cm from the pylorus. Simpler than RYGB (one join instead of two) but more malabsorptive.',
    types: [
      { name: 'Standard OAGB/MGB', how: 'Laparoscopic', duration: 'Permanent', cost: '₹4.5–6.5 lakh', note: 'Increasingly preferred in India and South Asia' },
      { name: 'OAGB as revision', how: 'After inadequate LSG result', duration: 'Permanent', cost: '₹5.5–8 lakh', note: 'Conversion from sleeve; good outcomes' },
    ],
    pros: ['Highest weight loss of all bariatric procedures in Indian studies', 'Simpler technically than RYGB (shorter surgery time)', 'Excellent diabetes remission rates (70–80%)', 'Increasingly popular in India — many Indian-authored studies', 'Good outcomes for patients who regain weight after sleeve'],
    cons: ['Bile reflux into esophagus (1–10%) — serious if occurs', 'Higher malabsorption: strict lifelong vitamins mandatory', 'Less long-term data than RYGB', 'Technically specific: loop length critical (too short = bile reflux, too long = malnutrition)', 'Not universally accepted — some surgeons still prefer RYGB'],
    longTerm: 'Indian data shows 35–40% total body weight loss maintained at 5 years. Excellent T2DM outcomes. Requires committed long-term follow-up and supplementation.',
    indianContext: 'OAGB has a strong evidence base from Indian bariatric surgeons. Widely performed at top-tier Indian bariatric centres. IFSO has accepted it as a recognised procedure.',
    color: '#C9963F',
  },
  {
    id: 'sadi',
    name: 'SADI-S / Duodenal Switch',
    type: 'Complex Laparoscopic Surgery',
    icon: '⚙️',
    tag: 'Super-Obesity Option',
    tagColor: '#EF4444',
    weightLoss: '38–45%',
    weightLossKg: '45–65+ kg',
    duration: 'Surgery: 2–3 hours',
    hospital: '4–5 days',
    recovery: '4–6 weeks',
    reversible: false,
    bestFor: 'Super-obesity (BMI ≥50), failed prior bariatric surgery, extreme metabolic disease',
    eligibility: 'BMI ≥50, or BMI ≥40 with multiple failed procedures. Specialist high-volume centres only.',
    mechanism: 'Combines sleeve gastrectomy with single anastomosis duodeno-ileal bypass (SADI-S) or full duodenal switch (BPD/DS). A very long segment of bowel is bypassed, maximising malabsorption. Most powerful but most complex.',
    types: [
      { name: 'SADI-S (Single Anastomosis)', how: 'Laparoscopic', duration: 'Permanent', cost: '₹8–14 lakh', note: 'Simpler variant of full duodenal switch; growing' },
      { name: 'BPD/DS (Full Duodenal Switch)', how: 'Laparoscopic or open', duration: 'Permanent', cost: '₹10–16 lakh', note: 'Most powerful; requires expert team; limited centres in India' },
    ],
    pros: ['Highest weight loss of any bariatric procedure', 'Near-universal T2DM remission', 'Cholesterol and lipid improvement dramatic', 'Used when other procedures have failed'],
    cons: ['Highest risk of nutritional deficiencies (protein, fat-soluble vitamins A, D, E, K)', 'Requires very strict lifelong supplementation and monitoring', 'Limited to high-volume specialist centres in India', 'Longer surgery, longer recovery', 'Not for all patients — careful selection essential'],
    longTerm: 'Most dramatic weight loss available. But highest long-term nutritional risk. Requires quarterly blood work, specialist nutritionist, and lifelong engagement.',
    indianContext: 'Available at select high-volume centres in India (Delhi, Mumbai, Hyderabad). Growing as an option for super-obese patients. Requires dedicated bariatric surgery programme.',
    color: '#EF4444',
  },
];

const ELIGIBILITY_CRITERIA = [
  { label: 'BMI ≥32.5', detail: 'With at least one comorbidity (T2DM, HTN, OSA, MASLD)', color: '#F59E0B' },
  { label: 'BMI ≥37.5', detail: 'Without comorbidities — Indian threshold (lower than global 40)', color: '#EF4444' },
  { label: 'BMI 27.5–32.5', detail: 'If poorly controlled T2DM or metabolic syndrome despite optimal medical management', color: '#10B981' },
  { label: 'Previous failure', detail: 'Failed lifestyle + pharmacotherapy (6+ months of supervised therapy)', color: '#8B5CF6' },
];

const PRE_OP_STEPS = [
  { step: '1', title: 'Comprehensive Evaluation', detail: 'BMI, metabolic panel, liver function, cardiac workup, sleep study (OSA screening), endoscopy', color: '#3B82F6' },
  { step: '2', title: 'Multidisciplinary Team', detail: 'Bariatric surgeon, endocrinologist, dietitian, psychologist assessment', color: '#8B5CF6' },
  { step: '3', title: 'Pre-op Weight Loss (2–4 weeks)', detail: 'Liver-shrinking diet (high protein, low carb) reduces liver size, making surgery safer', color: '#10B981' },
  { step: '4', title: 'Nutritional Preparation', detail: 'Start protein supplementation, vitamin baseline assessment, stop smoking, reduce alcohol', color: '#C9963F' },
  { step: '5', title: 'Psychological Clearance', detail: 'Assessment for eating disorders, depression, realistic expectations, motivation', color: '#0D9488' },
  { step: '6', title: 'Insurance/Financial Planning', detail: 'Check corporate health insurance, CGHS (government employees), pre-authorisation process', color: '#EF4444' },
];

/* ─── Component ─────────────────────────────────────────────── */
const SurgicalPage = () => {
  const [activeProcedure, setActiveProcedure] = useState('sleeve');
  const proc = PROCEDURES.find(p => p.id === activeProcedure);
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
      <div className="relative overflow-hidden" style={{ background: '#060210', minHeight: 420 }}>
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
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,6,20,0.62) 0%, rgba(26,11,58,0.55) 32%, rgba(30,16,96,0.50) 65%, rgba(8,4,32,0.78) 100%)' }} />
        </div>
        {/* Slide dots */}
        <div className="absolute top-5 right-5 z-20 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setHeroSlide(i); setHeroKey(k => k + 1); }}
              className="transition-all duration-300"
              style={{ width: i === heroSlide ? 18 : 6, height: 6, borderRadius: 3, background: i === heroSlide ? '#8B5CF6' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute -bottom-12 left-1/4 w-72 h-72 rounded-full bg-[#0D9488]/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 pt-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>

          {/* Alert */}
          <div className="bg-purple-500/15 border border-purple-400/30 rounded-xl p-4 mb-6 max-w-2xl flex items-start gap-3">
            <span className="text-purple-400 text-lg mt-0.5">🏥</span>
            <p className="text-purple-200 text-sm leading-relaxed">
              <strong>Specialist Medical Decision.</strong> Bariatric/metabolic surgery requires thorough evaluation by a certified bariatric surgery team. This page provides evidence-based information to help you ask the right questions.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-[260px]">
              <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[#C4B5FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse" /> Tier 3 — Maximum Intervention
              </div>
              <h1 className="text-4xl sm:text-5xl font-manrope font-extrabold text-white mb-4 leading-tight">
                Bariatric &<br />
                <span style={{ background: 'linear-gradient(135deg, #C4B5FD, #5EEAD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Metabolic Surgery
                </span>
              </h1>
              <p className="text-white/70 text-base max-w-xl leading-relaxed">
                The most effective long-term treatment for severe obesity and related metabolic diseases — achieves{' '}
                <strong className="text-white">25–45% sustained weight loss</strong> with high T2DM remission rates.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[['80%', 'T2DM remission (RYGB)'], ['45%', 'Max weight loss (SADI-S)'], ['500k+', 'Bariatric surgeries/yr India']].map(([v, l]) => (
                <div key={l} className="glass-card rounded-2xl px-4 py-4 text-center min-w-[110px]">
                  <div className="text-xl font-manrope font-extrabold text-[#C4B5FD]">{v}</div>
                  <div className="text-xs text-white/55 mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['IFSO Asia Pacific 2022', 'Indian Bariatric Society', 'Indian J Surgery 2023', 'ASMBS Guidelines'].map(b => (
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
        <h2 className="font-manrope font-bold text-slate-900 text-2xl mb-2">Who Qualifies for Surgery?</h2>
        <p className="text-slate-500 text-sm mb-6">IFSO Asia Pacific and IASO guidelines — Asian BMI thresholds apply</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {ELIGIBILITY_CRITERIA.map((e, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm border-t-4" style={{ borderTopColor: e.color }}>
              <div className="text-2xl font-manrope font-extrabold mb-1" style={{ color: e.color }}>{e.label}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{e.detail}</p>
            </div>
          ))}
        </div>

        {/* Procedure Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {PROCEDURES.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProcedure(p.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border-2"
              style={activeProcedure === p.id
                ? { background: p.color, color: '#fff', borderColor: p.color, boxShadow: `0 4px 16px ${p.color}35` }
                : { background: '#fff', color: '#64748B', borderColor: '#E2E8F0' }}
            >
              <span>{p.icon}</span> {p.name.split(' ')[0]} {p.name.split(' ')[1] ? p.name.split(' ')[1] : ''}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProcedure}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            {/* Procedure Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-3xl">{proc.icon}</span>
                    <h2 className="font-manrope font-bold text-slate-900 text-2xl">{proc.name}</h2>
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: proc.tagColor }}>{proc.tag}</span>
                  </div>
                  <p className="text-slate-500 text-sm">{proc.type}</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {[
                    [proc.weightLoss, 'weight loss'],
                    [proc.weightLossKg, 'typical kg'],
                    [proc.reversible ? '✅ Reversible' : '⚠️ Permanent', ''],
                  ].map(([v, l], i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-manrope font-bold" style={{ color: proc.color }}>{v}</div>
                      <div className="text-xs text-slate-400">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {[
                  ['Duration', proc.duration],
                  ['Hospital Stay', proc.hospital],
                  ['Recovery', proc.recovery],
                  ['Best For', proc.bestFor.substring(0, 60) + '…'],
                ].map(([label, val]) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-sm text-slate-700">{val}</div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">How It Works</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{proc.mechanism}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800">
                <strong>Eligibility:</strong> {proc.eligibility}
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-5">
              <h3 className="font-semibold text-slate-800 mb-4">Available Types & Costs (India 2024–25)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {proc.types.map((t, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-4">
                    <div className="font-semibold text-slate-800 mb-1">{t.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{t.how} | {t.duration}</div>
                    <div className="text-xl font-manrope font-bold mb-1" style={{ color: proc.color }}>{t.cost}</div>
                    <div className="text-xs text-slate-500 italic">{t.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros / Cons / Long-term */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-emerald-700 mb-3">✅ Advantages</h3>
                <ul className="space-y-2">
                  {proc.pros.map((p, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-red-700 mb-3">⚠️ Risks & Limitations</h3>
                <ul className="space-y-2">
                  {proc.cons.map((c, i) => (
                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold text-amber-800 mb-2">📅 Long-term Outlook</h3>
                <p className="text-amber-900 text-sm leading-relaxed">{proc.longTerm}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-semibold text-green-800 mb-2">🇮🇳 India-Specific Context</h3>
                <p className="text-green-900 text-sm leading-relaxed">{proc.indianContext}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Pre-op Journey ── */}
      <div className="bg-white py-14 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-manrope font-bold text-slate-900 text-2xl text-center mb-2">Pre-Surgical Evaluation Journey</h2>
          <p className="text-slate-500 text-center text-sm mb-10">What to expect before any bariatric procedure in India</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {PRE_OP_STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm border-t-4" style={{ borderTopColor: s.color }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-manrope font-extrabold text-white mb-3 text-sm"
                  style={{ background: s.color }}
                >
                  {s.step}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Post-op Nutrition ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="rounded-3xl p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0614 0%, #1A0B3A 40%, #1E1060 100%)' }}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10">
            <h2 className="font-manrope font-bold text-2xl mb-2">Post-Surgery Nutrition Protocol</h2>
            <p className="text-white/65 mb-7 text-sm">Lifelong commitment required for safe weight loss after bariatric surgery</p>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                ['Week 1–2', 'Clear liquids only: broth, coconut water, diluted juices', '#3B82F6'],
                ['Week 3–4', 'Full liquids: yoghurt, dal water, protein shakes', '#8B5CF6'],
                ['Week 5–8', 'Pureed/soft foods: khichdi, soft paneer, cooked vegetables', '#10B981'],
                ['Month 3+', 'Regular solid foods — small portions, protein first, no drinking while eating', '#C9963F'],
              ].map(([phase, detail, color]) => (
                <div key={phase} className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="font-bold text-sm mb-2" style={{ color }}>{phase}</div>
                  <p className="text-white/70 text-xs leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/10 rounded-xl p-5 border border-white/10">
              <h3 className="font-semibold mb-3 text-[#C4B5FD]">Lifelong Supplement Requirements (Sleeve, RYGB, OAGB)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  ['Vitamin B12', 'Monthly injection or 1000 mcg daily oral', '#3B82F6'],
                  ['Iron', '150–200 mg elemental iron/day (menstruating women especially)', '#EF4444'],
                  ['Calcium + Vit D', '1200–2000 mg calcium citrate + 3000 IU Vitamin D daily', '#F59E0B'],
                  ['Multivitamin', 'Bariatric-specific multivitamin daily (not regular Supradyn)', '#10B981'],
                ].map(([supp, dose, color]) => (
                  <div key={supp} className="bg-white/10 rounded-lg p-3">
                    <div className="font-semibold text-xs mb-1" style={{ color }}>{supp}</div>
                    <div className="text-white/65 text-xs">{dose}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Weight Loss Comparison Bar Chart ── */}
      <div className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-manrope font-bold text-slate-900 text-2xl mb-2">Procedure Comparison: Expected Weight Loss</h2>
          <p className="text-slate-500 text-sm mb-8">Average % total body weight loss at 18–24 months</p>
          <div className="space-y-4">
            {[
              { name: 'SADI-S / Duodenal Switch', pct: 42, color: '#EF4444' },
              { name: 'OAGB (One-Anastomosis Bypass)', pct: 35, color: '#C9963F' },
              { name: 'Roux-en-Y Gastric Bypass', pct: 29, color: '#8B5CF6' },
              { name: 'Sleeve Gastrectomy', pct: 27, color: '#3B82F6' },
              { name: 'Intragastric Balloon', pct: 12, color: '#10B981' },
              { name: 'GLP-1 Medicines (Tirzepatide)', pct: 20, color: '#0D9488' },
              { name: 'Lifestyle Only', pct: 7, color: '#94A3B8' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-48 text-sm text-slate-600 text-right font-medium flex-shrink-0">{item.name}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-7 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full flex items-center justify-end pr-3"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.pct / 45) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ background: item.color }}
                  >
                    <span className="text-white text-xs font-bold">{item.pct}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Sources: IFSO Global Registry 2023, Indian Bariatric Surgery Registry, SURMOUNT-1 trial</p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/lifestyle" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all group">
            <span className="text-2xl">🥗</span>
            <div className="flex-1"><div className="font-semibold text-slate-700">Lifestyle Management</div><div className="text-xs text-slate-400">Foundation — diet, exercise, behaviour</div></div>
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/medical" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group">
            <span className="text-2xl">💊</span>
            <div className="flex-1"><div className="font-semibold text-slate-700">Medical Weight Loss</div><div className="text-xs text-slate-400">GLP-1 drugs, tirzepatide, Indian costs</div></div>
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all group">
            <svg className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div><div className="font-semibold text-slate-700">Back to Home</div><div className="text-xs text-slate-400">BMI calculator &amp; overview</div></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SurgicalPage;
