import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show after user scrolls 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* ── Expanded Panel ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 16 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-72 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1B5E3A] to-[#0D9488] p-5 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                        🤖
                      </div>
                      <div>
                        <p className="font-manrope font-bold text-sm">Health Assistant</p>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <p className="text-white/70 text-[10px]">Online now</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpanded(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Hi! I can help you understand your obesity risk and guide you to the right health pathway. 👋
                  </p>
                </div>

                {/* Chat bubble */}
                <div className="p-4 bg-slate-50">
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 mb-3">
                    <p className="text-slate-700 text-xs leading-relaxed">
                      With <strong>1 in 4 Indians</strong> overweight or obese, early action is key.
                      Start with a free assessment to know your risk profile. 🇮🇳
                    </p>
                  </div>
                  <p className="text-slate-400 text-[10px] mb-4 text-center">
                    Based on WHO &amp; NFHS-5 data
                  </p>

                  {/* Quick actions */}
                  <div className="space-y-2">
                    <Link
                      to="/digital-twin"
                      onClick={() => setExpanded(false)}
                      className="flex items-center justify-between w-full bg-[#C9963F] text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-[#9A7430] transition-colors"
                    >
                      <span>Free Health Assessment</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        document.getElementById('bmi-calc')?.scrollIntoView({ behavior: 'smooth' });
                        setExpanded(false);
                      }}
                      className="flex items-center justify-between w-full border-2 border-[#1B5E3A] text-[#1B5E3A] text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-india-green/6 transition-colors"
                    >
                      <span>Check My BMI</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                      </svg>
                    </button>
                    <Link
                      to="/lifestyle"
                      onClick={() => setExpanded(false)}
                      className="flex items-center justify-between w-full border-2 border-slate-200 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:border-slate-300 transition-colors"
                    >
                      <span>Explore Management</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4 flex items-center justify-between">
                  <p className="text-slate-400 text-[10px]">Metabolic Intelligence</p>
                  <button
                    onClick={() => setDismissed(true)}
                    className="text-slate-400 hover:text-slate-600 text-[10px] transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Floating Bubble Button ── */}
          <div className="relative">
            {/* Pulse rings */}
            {!expanded && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#C9963F]/30 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-[#C9963F]/20" style={{ animation: 'pulse-ring 2.5s ease-out infinite 0.5s' }} />
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpanded(!expanded)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E3A] to-[#0D9488] shadow-2xl flex items-center justify-center text-white hover:shadow-[0_8px_30px_rgba(232,93,4,0.5)] transition-shadow"
              aria-label="Open health assistant"
            >
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.div
                    key="bot"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    {/* Person + heart health icon */}
                    <svg viewBox="0 0 32 32" className="w-8 h-8 animate-float" fill="none">
                      {/* Person silhouette */}
                      <circle cx="16" cy="8" r="4" fill="white" opacity=".95"/>
                      <path d="M8 24 C8 18 10 15 16 15 C22 15 24 18 24 24" fill="white" opacity=".95"/>
                      {/* Weighing scale base */}
                      <rect x="11" y="25" width="10" height="2" rx="1" fill="#C9963F" opacity=".9"/>
                      <rect x="14.5" y="23" width="3" height="3" rx="0.5" fill="#C9963F" opacity=".8"/>
                      {/* Small heart on chest */}
                      <path d="M14.5 20 C14.5 18.8 15.2 18 16 18.5 C16.8 18 17.5 18.8 17.5 20 C17.5 21.2 16 22.5 16 22.5 C16 22.5 14.5 21.2 14.5 20Z" fill="#C9963F"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Tooltip label (visible when closed) */}
            {!expanded && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md pointer-events-none"
              >
                Free Assessment →
                <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
