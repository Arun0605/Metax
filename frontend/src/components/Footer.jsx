import React from 'react';
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'India Crisis',     id: 'india-stats'  },
  { label: 'What is Obesity',  id: 'definition'   },
  { label: 'BMI Calculator',   id: 'bmi-calc'     },
  { label: 'Health Risks',     id: 'health-risks' },
  { label: 'Govt. Initiatives',id: 'initiatives'  },
];

const MANAGEMENT = [
  { label: 'Lifestyle & Nutrition', to: '/lifestyle' },
  { label: 'Medical Management',    to: '/medical'   },
  { label: 'Surgical Options',      to: '/surgical'  },
  { label: 'Free Assessment',       to: '/digital-twin' },
];

const SOURCES = [
  { label: 'WHO — Obesity & Overweight', href: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight' },
  { label: 'World Obesity Day', href: 'https://www.worldobesityday.org/' },
  { label: 'PIB — Obesity Policy India', href: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2107179' },
  { label: 'NFHS-5 (2019–21)', href: 'https://mohfw.gov.in/' },
];

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#0A1F10] text-white">
      {/* Tricolor top */}
      <div className="tricolor-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-india-green to-med-teal flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M9 3C9 3 6 5 6 8s3 5 6 5 6 2 6 5-3 3-3 3M15 3c0 0 3 2 3 5s-3 5-6 5-6 2-6 5 3 3 3 3"/>
                </svg>
              </div>
              <div>
                <p className="font-manrope font-bold text-sm text-white">Metabolic Intelligence</p>
                <p className="text-white/40 text-[10px]">weightloss-assessment.in</p>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-5">
              India's public health portal for obesity education, risk assessment,
              and evidence-based management pathways. Powered by WHO, ICMR &amp; NFHS data.
            </p>
            <Link
              to="/digital-twin"
              className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              Free Assessment →
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-manrope font-bold text-sm text-white mb-4">Learn</p>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-white/55 hover:text-white text-xs transition-colors text-left flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-india-green-light" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Management */}
          <div>
            <p className="font-manrope font-bold text-sm text-white mb-4">Management</p>
            <ul className="space-y-2.5">
              {MANAGEMENT.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/55 hover:text-white text-xs transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <p className="font-manrope font-bold text-sm text-white mb-4">Data Sources</p>
            <ul className="space-y-2.5">
              {SOURCES.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/55 hover:text-white text-xs transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#0D9488]" />
                    {label}
                    <svg className="w-2.5 h-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-[#F59E0B] font-semibold text-[11px] mb-1">⚠️ Medical Disclaimer</p>
              <p className="text-white/50 text-[10px] leading-relaxed">
                This portal is for educational purposes only. Content is not a substitute
                for professional medical advice, diagnosis, or treatment. Always consult
                a qualified healthcare provider.
              </p>
            </div>
          </div>
        </div>

        {/* ── Government Initiatives Strip ── */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-4 text-center">
            Aligned with Government of India Health Initiatives
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Fit India Movement', 'NP-NCD', 'POSHAN Abhiyaan', 'Eat Right India', 'Khelo India', 'Ayush Wellness', 'Amrit Kaal'].map((tag, i) => (
              <span
                key={i}
                className="bg-white/8 border border-white/10 text-white/50 text-[10px] font-semibold px-3 py-1.5 rounded-full"
              >
                🇮🇳 {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-[11px]">
            © 2025 Metabolic Intelligence · weightloss-assessment.in · All rights reserved
          </p>
          <div className="flex items-center gap-1 text-white/30 text-[11px]">
            <span>Data: WHO 2024 · NFHS-5 · ICMR · PIB India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
