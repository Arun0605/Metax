import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Data ──────────────────────────────────────
const INITIATIVES = [
  {
    id: 1,
    ministry: 'Ministry of Health & Family Welfare',
    tag: 'NP-NCD',
    title: 'National Programme for Prevention & Control of NCDs',
    launched: 'Ongoing — National Health Mission',
    color: '#DC2626',
    bg: '#FEF2F2',
    icon: '🏥',
    highlights: [
      '682 District NCD Clinics established',
      '191 District Cardiac Care Units',
      '5,408 CHC NCD Clinics across India',
      'Screening, early diagnosis & referral at all healthcare levels',
      'Behaviour change through IEC/BCC campaigns',
    ],
    desc: 'In India, NCDs cause 63% of all deaths. NP-NCD integrates prevention, screening, management and follow-up through the National Health Mission. It targets cardiovascular diseases, diabetes, cancers, and chronic respiratory diseases — all closely linked to obesity.',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Image:+District+NCD+Clinic+Healthcare+Workers+India',
  },
  {
    id: 2,
    ministry: 'Ministry of Youth Affairs & Sports',
    tag: 'Fit India',
    title: 'Fit India Movement',
    launched: 'Launched August 2019 by PM Modi',
    color: '#1B5E3A',
    bg: '#F0FDF4',
    icon: '🏃',
    highlights: [
      'Fit India School Certification Programme',
      'Fit India Sundays on Cycle initiative',
      'Mass yoga sessions & community fitness',
      'Workplace fitness challenge programs',
      'National fitness tracker & pledges',
    ],
    desc: 'Launched by PM Narendra Modi in 2019, the Fit India Movement promotes active lifestyles and encourages individuals to incorporate fitness into daily routines. It is India\'s largest-ever mass fitness mobilization, covering schools, colleges, and workplaces.',
    image: 'https://placehold.co/600x400/1b5e3a/ffffff?text=Image:+Indian+Community+Group+Yoga+Outdoor+Morning',
  },
  {
    id: 3,
    ministry: 'Ministry of Women & Child Development',
    tag: 'POSHAN',
    title: 'POSHAN Abhiyaan (Nutrition Mission)',
    launched: 'Launched 8 March 2018',
    color: '#F59E0B',
    bg: '#FFFBEB',
    icon: '🌱',
    highlights: [
      'Poshan Vatikas (Nutri-Gardens) for home-grown nutrition',
      'Technology-driven real-time monitoring (ICDS-CAS)',
      'Jan Andolan — community nutrition movement',
      'AYUSH wellness practices integration',
      'Focus on children under 6, pregnant women, and lactating mothers',
    ],
    desc: 'POSHAN Abhiyaan (Mission Poshan 2.0) is the Government of India\'s flagship initiative for holistic nourishment. It prevents childhood obesity through dietary diversity, food fortification, millet promotion and multi-ministerial convergence.',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=Image:+Diverse+Indian+Family+Healthy+Nutritious+Meal',
  },
  {
    id: 4,
    ministry: 'FSSAI (Food Safety)',
    tag: 'Eat Right India',
    title: 'Eat Right India Movement',
    launched: 'FSSAI Initiative — ongoing',
    color: '#0D9488',
    bg: '#F0FDFA',
    icon: '🥗',
    highlights: [
      "Aaj Se Thoda Kam — Reduce Fat, Sugar, Salt campaign",
      'HFSS food front-of-pack labelling mandate',
      'FoSTaC: Food Safety Training & Certification',
      'RUCO — Repurpose Used Cooking Oil initiative',
      'Eat Right Campus & Eat Right School programmes',
      'DART Book & Magic Box for food adulteration detection',
    ],
    desc: 'The Eat Right India movement by FSSAI encompasses supply-side and demand-side initiatives to ensure safe, healthy, sustainable food for all Indians. The "Aaj Se Thoda Kam" campaign across 12 languages encourages gradual reduction of fat, sugar, and salt.',
    image: 'https://placehold.co/600x400/0d9488/ffffff?text=Image:+Colourful+Fresh+Vegetables+Healthy+Indian+Thali',
  },
  {
    id: 5,
    ministry: 'Ministry of Youth Affairs & Sports',
    tag: 'Khelo India',
    title: 'Khelo India Programme',
    launched: 'Launched 2016–17',
    color: '#7C3AED',
    bg: '#F5F3FF',
    icon: '🏅',
    highlights: [
      'Sports participation from school to elite level',
      'World-class training infrastructure for young athletes',
      'Equal sports opportunities across rural and urban India',
      'Khelo India Youth Games & University Games',
      'Sports science and nutrition support',
    ],
    desc: 'Khelo India promotes sports as a public health tool — building an active generation from the grassroots up. By normalizing physical activity and competitive sports for youth, it directly counters sedentary lifestyles and childhood obesity.',
    image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Image:+Young+Indian+Athletes+Sports+Training+Field',
  },
  {
    id: 6,
    ministry: 'Ministry of AYUSH',
    tag: 'Ayush Wellness',
    title: 'AYUSH-Based Obesity Management',
    launched: 'Ayurswasthya Yojana — since FY 2021–22',
    color: '#D97706',
    bg: '#FFFBEB',
    icon: '🧘',
    highlights: [
      'AIIA (New Delhi): Panchakarma + Yoga therapy for obesity',
      '45,000+ patients with metabolic disorders benefited',
      'CCRAS research validating Ayurvedic interventions',
      'Dincharya, Ritucharya, Ahara guidelines',
      'Collaborative research with CSIR',
      '11 active projects on obesity, diabetes & hypertension',
    ],
    desc: 'The Ministry of AYUSH integrates traditional Indian health systems into obesity management. Ayurvedic treatments, yoga, and holistic lifestyle regimens have evidence of effectiveness in managing metabolic disorders at the All India Institute of Ayurveda.',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=Image:+Ayurveda+Yoga+Wellness+Indian+Traditional+Healing',
  },
];

// ── Initiative Card ────────────────────────
const InitiativeCard = ({ initiative, i }) => {
  const [open, setOpen] = useState(false);
  const d = initiative;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 initiative-card"
      style={{ background: d.bg }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
            style={{ background: d.color + '20' }}
          >
            {d.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: d.color, color: 'white' }}
              >
                {d.tag}
              </span>
              <span className="text-xs text-slate-500 truncate">{d.ministry}</span>
            </div>
            <h3 className="font-manrope font-bold text-slate-900 text-base leading-snug">{d.title}</h3>
            <p className="text-slate-500 text-xs mt-0.5">{d.launched}</p>
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-5 space-y-1.5">
          {d.highlights.slice(0, open ? undefined : 3).map((h, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
              <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: d.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-slate-600 text-sm leading-relaxed mt-4 pb-2">{d.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex items-center gap-1.5 text-xs font-bold transition-colors"
          style={{ color: d.color }}
        >
          {open ? 'Show less' : 'Learn more'}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={d.image}
          alt={d.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${d.color}90, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────
const GovernmentInitiativesSection = () => (
  <section id="initiatives" className="py-20 lg:py-28 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Header ── */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-india-green/10 text-india-green text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest"
        >
          🇮🇳 Government of India
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-manrope font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 section-heading section-heading-center"
        >
          India's Multi-Sectoral
          <span className="gradient-text"> Action Framework</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Recognizing obesity as a critical public health concern, the Government of India has
          launched comprehensive, multi-pronged initiatives across multiple ministries — integrating
          health, nutrition, fitness, food safety, and traditional wellness.
        </motion.p>
      </div>

      {/* ── PM Quote Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 rounded-3xl overflow-hidden grid lg:grid-cols-3 shadow-lg"
      >
        <div className="lg:col-span-2 bg-[#1B5E3A] p-8 text-white">
          <p className="font-manrope font-bold text-xl mb-4">
            A Whole-of-Government Approach
          </p>
          <p className="text-white/85 text-sm leading-relaxed mb-4">
            As India moves towards <strong className="text-[#F59E0B]">Amrit Kaal</strong>, a
            whole-of-government and whole-of-society approach is being adopted to tackle
            obesity through policy reforms, community engagement, and regulatory measures.
          </p>
          <p className="text-white/85 text-sm leading-relaxed">
            PM Narendra Modi, in his Mann Ki Baat address, emphasized the need for nationwide
            awareness and nominated prominent individuals across India to lead an awareness
            movement — particularly around reducing edible oil consumption.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Fit India', 'NP-NCD', 'POSHAN Abhiyaan', 'Eat Right India', 'Khelo India', 'Ayush Wellness'].map((p, i) => (
              <span key={i} className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[200px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&fit=crop"
            alt="Community yoga and wellness practice — Fit India Movement"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1B5E3A]/30" />
        </div>
      </motion.div>

      {/* ── Initiative Cards Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIATIVES.map((item, i) => (
          <InitiativeCard key={item.id} initiative={item} i={i} />
        ))}
      </div>

      {/* ── Conclusion ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 rounded-3xl bg-gradient-to-r from-[#1B5E3A] to-[#0D9488] p-8 text-white text-center"
      >
        <p className="font-manrope font-bold text-2xl mb-3">
          A Healthier India Is Within Reach
        </p>
        <p className="text-white/80 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          With sustained commitment, cross-sector collaboration, and active citizen participation,
          India is well-positioned to reverse obesity trends. By prioritizing awareness, lifestyle
          changes, and policy-driven action, India can set a global example — building a nation
          that thrives on wellness, vitality, and holistic well-being.
        </p>
      </motion.div>
    </div>
  </section>
);

export default GovernmentInitiativesSection;
