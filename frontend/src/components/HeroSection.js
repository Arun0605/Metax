import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onOpenCalculator }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center" data-testid="hero-section">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=85&w=1920&auto=format&fit=crop"
          alt="Medical consultation"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-manrope font-light tracking-tight text-slate-navy leading-tight mb-8">
            Transform Your Health,<br />
            <span className="font-normal">Reclaim Your Life</span>
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed text-slate-600 mb-12 max-w-2xl">
            Evidence-based bariatric and metabolic surgery solutions tailored to your unique health journey. 
            Discover if surgical intervention could restore your metabolic health and improve your quality of life.
          </p>
          
          <button
            data-testid="start-assessment-button"
            onClick={onOpenCalculator}
            className="cta-button inline-flex items-center gap-3 bg-slate-navy text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-slate-800"
          >
            Start Your Free Health Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-sm text-slate-500 mt-6">
            Takes 2 minutes • Evidence-based assessment • Confidential
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;