import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IndiaStatsSection from '../components/IndiaStatsSection';
import ObesityDefinitionSection from '../components/ObesityDefinitionSection';
import BMICalculatorSection from '../components/BMICalculatorSection';
import HealthRisksSection from '../components/HealthRisksSection';
import GovernmentInitiativesSection from '../components/GovernmentInitiativesSection';
import CTASection from '../components/CTASection';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';

const HomePage = () => {
  // Global scroll-reveal observer (for legacy .scroll-reveal classes)
  useEffect(() => {
    const cb = (entries) =>
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
        }
      });
    const obs = new IntersectionObserver(cb, {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px',
    });
    document
      .querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Sticky navigation */}
      <Navbar />

      {/* 1. Hero — animated gradient, stats, dual CTA */}
      <HeroSection />

      {/* 2. Understanding Obesity — WHO def, BMI cut-offs, causes */}
      <ObesityDefinitionSection />

      {/* 3. BMI Calculator — interactive gauge with Indian thresholds */}
      <BMICalculatorSection />

      {/* 4. Health Risks & NCDs — pie chart, disease cards */}
      <HealthRisksSection />

      {/* 5. India Crisis — NFHS-5 data, trend bars */}
      <IndiaStatsSection />

      {/* 6. Call to Action — Assessment + Management Pathway cards */}
      <CTASection />

      {/* 7. Government Initiatives — multi-ministry program cards */}
      <GovernmentInitiativesSection />

      {/* Footer */}
      <Footer />

      {/* Floating bot CTA — always present */}
      <FloatingCTA />
    </div>
  );
};

export default HomePage;
