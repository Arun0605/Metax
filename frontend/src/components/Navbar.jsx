import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'What is Obesity',  id: 'definition'   },
  { label: 'BMI Check',        id: 'bmi-calc'     },
  { label: 'Health Risks',     id: 'health-risks' },
  { label: 'India Crisis',     id: 'india-stats'  },
  { label: 'Govt. Action',     id: 'initiatives'  },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Highlight active section
      const sections = NAV_LINKS.map(l => document.getElementById(l.id));
      const current = sections.findLast(s => s && s.getBoundingClientRect().top <= 120);
      if (current) setActiveId(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* India tricolor top stripe */}
      <div className="tricolor-bar fixed top-0 left-0 right-0 z-50" />

      <nav
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-india-green to-med-teal flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                {/* DNA / Metabolic icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 3C9 3 6 5 6 8s3 5 6 5 6 2 6 5-3 3-3 3M15 3c0 0 3 2 3 5s-3 5-6 5-6 2-6 5 3 3 3 3" />
                </svg>
              </div>
              <div>
                <p
                  className={`font-manrope font-bold text-sm leading-tight transition-colors ${
                    scrolled ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Metabolic Intelligence
                </p>
                <p className={`text-[10px] transition-colors ${scrolled ? 'text-slate-400' : 'text-white/60'}`}>
                  weightloss-assessment.in
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeId === id
                      ? 'text-india-green bg-india-green/10'
                      : scrolled
                      ? 'text-slate-600 hover:text-india-green hover:bg-india-green/8'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                  {activeId === id && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-saffron" />
                  )}
                </button>
              ))}
            </div>

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-3">
              <Link
                to="/digital-twin"
                className="hidden sm:flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Free Assessment
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>

          {/* ── Mobile Menu ── */}
          {menuOpen && (
            <div className="lg:hidden bg-white rounded-2xl shadow-xl mx-2 mb-3 py-3 px-3 border border-slate-100">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex w-full items-center gap-3 py-3 px-3 text-sm font-medium text-slate-700 hover:text-india-green hover:bg-india-green/6 rounded-xl transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-india-green" />
                  {label}
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-100 space-y-2">
                <Link
                  to="/digital-twin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-saffron text-white text-sm font-semibold px-5 py-3 rounded-xl"
                >
                  Free Health Assessment →
                </Link>
                <Link
                  to="/lifestyle"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border-2 border-india-green text-india-green text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-india-green/6"
                >
                  Management Pathways
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
