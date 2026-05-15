import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Hero Slideshow — lifestyle / nutrition / fitness ── */
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80&fit=crop', alt: 'Vibrant colourful vegetables and healthy eating choices', kb: 'kb-zoom-in', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80&fit=crop', alt: 'Outdoor yoga and mindful movement for metabolic health', kb: 'kb-pan', pos: 'object-top' },
  { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80&fit=crop', alt: 'Fresh Indian-style healthy meal spread', kb: 'kb-zoom-out', pos: 'object-center' },
  { src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80&fit=crop', alt: 'Person monitoring their health progress', kb: 'kb-zoom-in', pos: 'object-center' },
];

/* ─── Data ─────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 'diet',
    icon: '🥗',
    title: 'Therapeutic Nutrition',
    subtitle: 'Indian-context diet science',
    color: '#10B981',
    bg: '#ECFDF5',
    stats: [{ val: '500–750', unit: 'kcal/day', label: 'Deficit target' }, { val: '5–7%', unit: 'body weight', label: 'Expected loss 6 months' }, { val: '30%', unit: 'fat reduction', label: 'Visceral fat decrease' }],
    overview: 'A calorie deficit of 500–750 kcal/day produces 0.5–0.75 kg/week weight loss. For South Asians, low glycaemic index (GI) diets reduce visceral fat more effectively than generic low-fat protocols (ICMR NIN, 2020).',
    principles: [
      { title: 'Caloric Deficit First', body: 'Target 1,400–1,600 kcal/day for women, 1,600–1,800 kcal/day for men. Use the ICMR plate model: ½ plate vegetables, ¼ lean protein, ¼ complex carbs.' },
      { title: 'Low-GI Indian Foods', body: 'Choose: brown rice, millets (jowar, bajra, ragi), whole wheat roti, moong dal, chickpeas. Avoid: white rice, maida, polished semolina, refined-sugar sweets.' },
      { title: 'Oil Reduction (PM Modi Pledge)', body: 'Indian cooking uses 2–3× more oil than needed. Target ≤3 tsp/day. Use air frying, steaming, minimal tadka. Switch to rice bran or mustard oil.' },
      { title: 'Protein Prioritisation', body: 'Aim for 1.2–1.5g/kg body weight/day. Sources: dal (8–9g/100g), paneer (18g/100g), eggs, chicken breast, soya chunks (52g/100g dried). Protein preserves muscle during weight loss.' },
      { title: 'Meal Timing', body: 'Time-restricted eating (10–12 hour window) improves metabolic markers in South Asians (JAPI, 2022). Avoid skipping breakfast. Dinner before 8 PM where possible.' },
    ],
    tableHeader: '🍽️ Sample Indian Meal Plan (~1,600 kcal)',
    tableRows: [
      { col1: 'Breakfast', col2: 'Moong dal chilla (2) + curd (100g)', col3: '280 kcal', col4: 'Oats upma + 1 egg', col5: '320 kcal' },
      { col1: 'Mid-Morning', col2: 'Handful peanuts + 1 fruit', col3: '180 kcal', col4: 'Greek yoghurt + seeds', col5: '150 kcal' },
      { col1: 'Lunch', col2: '2 roti + dal + sabzi + salad', col3: '450 kcal', col4: 'Brown rice + rajma + cucumber raita', col5: '480 kcal' },
      { col1: 'Snack', col2: 'Roasted chana + green tea', col3: '120 kcal', col4: 'Sprouts chaat', col5: '130 kcal' },
      { col1: 'Dinner', col2: 'Soup + grilled fish + vegetables', col3: '380 kcal', col4: 'Dal khichdi + salad', col5: '360 kcal' },
    ],
  },
  {
    id: 'exercise',
    icon: '🏃',
    title: 'Physical Activity',
    subtitle: 'ICMR & WHO protocol',
    color: '#3B82F6',
    bg: '#EFF6FF',
    stats: [{ val: '150–300', unit: 'min/week', label: 'Moderate activity' }, { val: '2–3×', unit: 'per week', label: 'Strength training' }, { val: '8–10%', unit: 'body weight', label: 'Loss with diet + exercise' }],
    overview: 'Exercise alone produces modest weight loss (~2–3 kg) but dramatically improves cardiometabolic risk and insulin sensitivity. Combined with diet, achieves 8–10% total body weight loss. ICMR recommends 150 minutes/week for all adults.',
    principles: [
      { title: 'Aerobic Exercise (Foundation)', body: '150–300 min/week of moderate intensity (brisk walking, cycling, swimming). Start with 10-min sessions and build. Even 30 min daily walking reduces HbA1c by 0.5% in South Asians.' },
      { title: 'Resistance Training (Critical for Indians)', body: 'Indians have paradoxically high body fat % at normal BMI. 2–3 sessions/week of resistance training builds lean muscle, raises metabolic rate, and targets visceral fat.' },
      { title: 'NEAT (Non-Exercise Activity)', body: 'Non-exercise activity accounts for 15–30% of daily calorie burn. Take stairs, walk after meals, avoid prolonged sitting. Post-meal 10-min walks reduce blood glucose by 15%.' },
      { title: 'Post-meal Walks (Indian Evidence)', body: 'A 15-min moderate walk 30 min after meals reduces 24-hour blood glucose by 22% in South Asians (Nutrition & Diabetes, 2022). Particularly effective after carbohydrate-heavy Indian meals.' },
      { title: 'Indian Exercise Options', body: 'Yoga: 3–5 sessions/week reduces cortisol, waist circumference and improves body composition. Surya Namaskar (12 rounds/day) ≈ 150 kcal burn. Bharatnatyam, Garba, Kabbadi are culturally effective.' },
    ],
    tableHeader: '📅 Progressive Exercise Ramp-Up',
    tableRows: [
      { col1: 'Week 1–4', col2: 'Walk 20 min/day + 2× yoga', col3: 'Foundation', col4: 'Stretch + mobility work', col5: 'Recovery' },
      { col1: 'Week 5–8', col2: 'Walk 30 min + 2× bodyweight', col3: 'Build', col4: '10 min post-meal walks', col5: 'NEAT boost' },
      { col1: 'Week 9–12', col2: '45 min cardio + 2× strength', col3: 'Moderate', col4: 'Add cycling or swimming', col5: 'Variety' },
      { col1: 'Month 4+', col2: '5×/week 60 min mixed training', col3: 'Maintain', col4: 'Gradual intensity increase', col5: 'Progress' },
    ],
  },
  {
    id: 'behavior',
    icon: '🎯',
    title: 'Behavioural Therapy',
    subtitle: 'CBT-based weight management',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    stats: [{ val: '45%', unit: 'more weight lost', label: 'With CBT vs diet alone' }, { val: '3×', unit: 'better', label: '2-year weight maintenance' }, { val: '60%', unit: 'reduced', label: 'Emotional eating episodes' }],
    overview: 'Cognitive Behavioural Therapy (CBT) for obesity addresses psychological drivers of overeating. Studies show CBT combined with diet/exercise produces 45% more weight loss than diet alone, with 3× better 2-year maintenance.',
    principles: [
      { title: 'Self-Monitoring', body: 'Daily food journaling increases dietary adherence by 40–50%. Use apps like HealthifyMe or MyFitnessPal (India DB). Note time, hunger level, mood, food eaten. Patterns emerge within 2 weeks.' },
      { title: 'Identifying Triggers', body: 'Common Indian triggers: work/family stress, cultural pressure to eat, boredom, late-night TV eating. Use hunger scale (1–10) before eating — only eat at 3–4, stop at 7.' },
      { title: 'Cognitive Restructuring', body: 'Replace "I ruined my diet" (all-or-nothing) with "One meal doesn\'t define my progress." Self-compassion reduces binge cycles. Progress, not perfection.' },
      { title: 'Environmental Design', body: 'Keep fruits visible on counter. Store healthy foods at eye level in fridge. Use smaller plates (25% less food consumed). Avoid eating while watching TV — increases intake by 30%.' },
      { title: 'Social & Cultural Strategies', body: 'Navigating Indian festivals and family pressure: "I\'m watching my health" is acceptable. Eat a small healthy snack before family events. Choose one favourite item in moderation, not everything.' },
    ],
    tableHeader: '📌 Habit Implementation Schedule',
    tableRows: [
      { col1: 'Daily', col2: 'Food diary + hunger scale', col3: 'Awareness', col4: 'Mindful eating (screen-free)', col5: 'Mindfulness' },
      { col1: 'Weekly', col2: 'Review trigger patterns', col3: 'Patterns', col4: 'Celebrate small wins', col5: 'Motivation' },
      { col1: 'Monthly', col2: 'Reassess goals (SMART)', col3: 'Adjustment', col4: 'Family communication', col5: 'Support' },
      { col1: 'As needed', col2: 'Therapist/counsellor session', col3: 'Deep work', col4: 'Peer support group', col5: 'Community' },
    ],
  },
  {
    id: 'sleep',
    icon: '😴',
    title: 'Sleep Optimisation',
    subtitle: 'The silent weight driver',
    color: '#0D9488',
    bg: '#F0FDFA',
    stats: [{ val: '55%', unit: 'higher risk', label: 'Obesity with <6h sleep' }, { val: '2 kg', unit: 'more fat lost', label: 'With optimal sleep' }, { val: '28%', unit: 'higher ghrelin', label: 'Hunger hormone rise' }],
    overview: 'Chronic sleep deprivation (<6 hours) increases obesity risk by 55% through disruption of hunger hormones. Ghrelin (hunger) rises 28%, leptin (satiety) falls 18%, cortisol rises — promoting fat storage. 7–9 hours of sleep is a therapeutic intervention.',
    principles: [
      { title: 'Sleep & Hormones', body: 'Short sleep raises ghrelin (hunger hormone) and lowers leptin (fullness hormone). Result: extra 300–400 kcal consumed next day — especially from high-fat, high-carb foods. Fix sleep, reduce hunger passively.' },
      { title: 'Sleep Apnoea & Obesity', body: 'Obesity is the #1 risk factor for obstructive sleep apnoea (OSA) in India. OSA worsens obesity via fatigue and cortisol. Screen if you snore + have daytime sleepiness.' },
      { title: 'Sleep Hygiene Protocol', body: 'Fixed wake time (7 days/week) is the most powerful intervention. Dark, cool room (18–22°C). No screens 60 min before bed. Avoid heavy meals after 9 PM.' },
      { title: 'Indian Sleep Challenges', body: 'Late-night family dinner culture, cricket night games, Reels scrolling. Compromise: dinner by 8:30 PM, 30-min digital wind-down, consistent sleep window (10:30 PM–6:30 AM).' },
      { title: 'Nap Strategy', body: '20-min post-lunch nap (common in India) is beneficial. Avoid >45 min naps — disrupts night sleep and circadian rhythm, worsening metabolic function.' },
    ],
    tableHeader: '🌙 Sleep Protocol Schedule',
    tableRows: [
      { col1: 'Evening', col2: 'Dinner by 8–8:30 PM', col3: 'Circadian', col4: '10-min evening walk', col5: 'Wind-down' },
      { col1: 'Pre-bed', col2: 'No screens 45 min before', col3: 'Melatonin', col4: 'Warm turmeric milk', col5: 'Relaxation' },
      { col1: 'Bedtime', col2: 'Target 10–11 PM lights out', col3: 'Consistency', col4: 'Room temperature 20°C', col5: 'Deep sleep' },
      { col1: 'Morning', col2: 'Fixed wake time 6–7 AM', col3: 'Anchor', col4: '5-min sunlight exposure', col5: 'Cortisol reset' },
    ],
  },
  {
    id: 'stress',
    icon: '🧘',
    title: 'Stress Management',
    subtitle: 'Cortisol & belly fat connection',
    color: '#C9963F',
    bg: '#FFFBEB',
    stats: [{ val: '3×', unit: 'more visceral fat', label: 'In chronically stressed' }, { val: '400 kcal', unit: 'extra/day', label: 'Average stress eating' }, { val: '18%', unit: 'cortisol drop', label: 'With yoga (AIIMS RCT)' }],
    overview: 'Chronic stress elevates cortisol, directly promoting visceral fat accumulation — the most dangerous metabolic fat. Stress eating adds ~400 kcal/day in the average Indian adult. Yoga and pranayama are evidence-based, culturally relevant interventions.',
    principles: [
      { title: 'Cortisol & Belly Fat', body: 'Elevated cortisol triggers visceral fat deposition (around organs) and promotes insulin resistance. Managing stress IS managing obesity.' },
      { title: 'Yoga & Pranayama (Indian Evidence)', body: 'AIIMS Delhi RCT (2019): 16-week yoga reduced waist by 4.3 cm and cortisol by 18% vs controls. Bhramari pranayama and Nadi Shodhana are particularly effective.' },
      { title: 'Mindfulness-Based Eating', body: 'Mindful eating — no screens, chewing slowly — reduces meal size by 15–20% and emotional eating by 60%. Five minutes of mindful breathing before meals activates parasympathetic system.' },
      { title: 'Financial & Work Stress (India-Specific)', body: 'Career pressure and commute stress drive eating in India. 15-min lunchtime walks reduce perceived stress by 25%. Team-based health challenges show 3× better adherence.' },
      { title: 'Ashwagandha Note', body: 'KSM-66 Ashwagandha (300mg twice daily) has Level 1B evidence for cortisol reduction and weight management in Indian adults (JACI, 2020). Useful adjunct under medical guidance.' },
    ],
    tableHeader: '🧘 Stress Management Daily Plan',
    tableRows: [
      { col1: 'Morning', col2: '10-min pranayama + meditation', col3: 'Cortisol reset', col4: 'Surya Namaskar 5 rounds', col5: 'Energise' },
      { col1: 'Afternoon', col2: '5-min mindful breathing', col3: 'Stress peak', col4: '10-min outdoor walk', col5: 'Reset' },
      { col1: 'Evening', col2: '30-min yoga / stretching', col3: 'Wind down', col4: 'Journaling 5 min', col5: 'Processing' },
      { col1: 'Weekend', col2: 'Nature exposure (park, garden)', col3: 'Restoration', col4: 'Social connection', col5: 'Wellbeing' },
    ],
  },
];

const TIMELINE = [
  { week: 'Week 1–2', title: 'Foundation', desc: 'Food diary, baseline measurements, 20-min daily walks', color: '#3B82F6', icon: '📋' },
  { week: 'Week 3–4', title: 'Momentum', desc: 'Add resistance 2×/week, eliminate 1 high-calorie habit', color: '#10B981', icon: '💪' },
  { week: 'Month 2', title: 'Rhythm', desc: '2–3 kg loss expected. Increase exercise. Review triggers.', color: '#8B5CF6', icon: '📈' },
  { week: 'Month 3', title: 'Plateau Prep', desc: 'Metabolic adaptation. Vary exercise. Add HIIT 1×/week.', color: '#C9963F', icon: '⚡' },
  { week: 'Month 4–6', title: 'Deep Loss', desc: '5–7% body weight loss. Medical review if <3% lost.', color: '#0D9488', icon: '🎯' },
  { week: '6 months+', title: 'Maintenance', desc: 'Long-term adherence. 80/20 approach. Regular monitoring.', color: '#EF4444', icon: '🏆' },
];

const OUTCOMES = [
  ['58%', 'Reduced Type 2 Diabetes risk (DPP trial)'],
  ['30%', 'Lower cardiovascular events'],
  ['3–5 mmHg', 'Blood pressure reduction'],
  ['50%+', 'Fatty liver improvement (MASLD)'],
  ['40%', 'Joint pain reduction (knee OA)'],
  ['25%', 'Sleep apnoea improvement'],
  ['20%', 'Reduction in certain cancer risks'],
  ['Significant', 'PCOS symptom improvement'],
];

/* ─── Component ─────────────────────────────────────────────── */
const LifestylePage = () => {
  const [activePillar, setActivePillar] = useState('diet');
  const pillar = PILLARS.find(p => p.id === activePillar);
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
      <div className="relative overflow-hidden" style={{ background: '#04100C', minHeight: 400 }}>
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
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,16,12,0.62) 0%, rgba(10,37,64,0.55) 35%, rgba(12,74,60,0.52) 70%, rgba(6,21,32,0.78) 100%)' }} />
        </div>
        {/* Slide dots */}
        <div className="absolute top-5 right-5 z-20 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setHeroSlide(i); setHeroKey(k => k + 1); }}
              className="transition-all duration-300"
              style={{ width: i === heroSlide ? 18 : 6, height: 6, borderRadius: 3, background: i === heroSlide ? '#10B981' : 'rgba(255,255,255,0.35)' }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#10B981]/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#0D9488]/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 pt-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>

          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-[260px]">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/30 text-[#6EE7B7] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" /> Tier 1 — Foundation for All Patients
              </div>
              <h1 className="text-4xl sm:text-5xl font-manrope font-extrabold text-white mb-4 leading-tight">
                Lifestyle<br />
                <span style={{ background: 'linear-gradient(135deg, #6EE7B7, #5EEAD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Management
                </span>
              </h1>
              <p className="text-white/70 text-base max-w-xl leading-relaxed">
                The evidence-based foundation for every obesity treatment plan. Structured lifestyle intervention achieves{' '}
                <strong className="text-white">5–10% body weight loss</strong> — enough to transform metabolic health.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[['5–10%', 'Body weight loss'], ['150 min', 'Exercise/week'], ['500 kcal', 'Daily deficit']].map(([v, l]) => (
                <div key={l} className="glass-card rounded-2xl px-5 py-4 text-center min-w-[110px]">
                  <div className="text-xl font-manrope font-extrabold text-[#6EE7B7]">{v}</div>
                  <div className="text-xs text-white/55 mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['WHO Guidelines 2022', 'ICMR NIN 2020', 'Look AHEAD Trial', 'JAPI 2023'].map(b => (
              <span key={b} className="text-xs bg-white/10 border border-white/20 text-white/65 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48 }}>
            <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,16 1440,24 L1440,48 L0,48 Z" fill="#F8FAFC" />
          </svg>
        </div>
      </div>

      {/* ── Pillar Tabs ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PILLARS.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 border-2"
              style={activePillar === p.id
                ? { background: p.color, color: '#fff', borderColor: p.color, boxShadow: `0 4px 20px ${p.color}35` }
                : { background: '#fff', color: '#64748B', borderColor: '#E2E8F0' }}
            >
              <span className="text-base">{p.icon}</span> {p.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {pillar.stats.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl font-manrope font-extrabold" style={{ color: pillar.color }}>
                    {s.val} <span className="text-sm font-semibold text-slate-400">{s.unit}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{pillar.icon}</span>
                <div>
                  <h2 className="font-manrope font-bold text-slate-900 text-xl">{pillar.title}</h2>
                  <p className="text-slate-500 text-sm">{pillar.subtitle}</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{pillar.overview}</p>
            </div>

            {/* Principles */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {pillar.principles.map((pr, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border-l-4 shadow-sm" style={{ borderLeftColor: pillar.color }}>
                  <h3 className="font-semibold text-slate-800 mb-2">{pr.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{pr.body}</p>
                </div>
              ))}
            </div>

            {/* Indian Context Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-manrope font-bold text-slate-900 mb-4 text-lg">{pillar.tableHeader}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: pillar.bg }}>
                      <th className="text-left p-3 font-semibold text-slate-700 rounded-tl-lg">Timing</th>
                      <th className="text-left p-3 font-semibold text-slate-700">Option A</th>
                      <th className="text-left p-3 font-semibold text-slate-700 w-28">Notes</th>
                      <th className="text-left p-3 font-semibold text-slate-700">Option B</th>
                      <th className="text-left p-3 font-semibold text-slate-700 rounded-tr-lg w-28">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pillar.tableRows.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="p-3 font-semibold text-slate-700">{row.col1}</td>
                        <td className="p-3 text-slate-600">{row.col2}</td>
                        <td className="p-3 text-slate-400 text-xs">{row.col3}</td>
                        <td className="p-3 text-slate-600">{row.col4}</td>
                        <td className="p-3 text-slate-400 text-xs">{row.col5}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Timeline ── */}
      <div className="bg-white py-14 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-manrope font-bold text-slate-900 text-3xl text-center mb-2">Your 6-Month Journey</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Realistic expectations with structured lifestyle intervention</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
            {TIMELINE.map((t, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl shadow-sm"
                  style={{ background: t.color + '15', border: `2px solid ${t.color}30` }}
                >
                  {t.icon}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.week}</div>
                <div className="text-sm font-semibold text-slate-800 mb-1">{t.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Outcomes ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #051018 0%, #0A2540 40%, #0C4A3C 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10">
            <h2 className="font-manrope font-bold text-2xl md:text-3xl mb-2">What 5–10% Weight Loss Achieves</h2>
            <p className="text-white/65 mb-8 text-sm">Evidence from Look AHEAD, DPP, and ICMR trials</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {OUTCOMES.map(([v, l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-xl font-manrope font-extrabold text-[#6EE7B7]">{v}</div>
                  <div className="text-xs text-white/65 mt-1 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="max-w-6xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all group">
            <svg className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div><div className="font-semibold text-slate-700">Back to Home</div><div className="text-xs text-slate-400">Overview &amp; BMI Calculator</div></div>
          </Link>
          <Link to="/medical" className="flex items-center gap-3 bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group">
            <span className="text-2xl">💊</span>
            <div className="flex-1"><div className="font-semibold text-slate-700">Medical Management</div><div className="text-xs text-slate-400">GLP-1s, Tirzepatide, Indian prices</div></div>
            <svg className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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

export default LifestylePage;
