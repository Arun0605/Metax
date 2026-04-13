import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import JourneyTimeline from '../components/JourneyTimeline';
import TreatmentPathways from '../components/TreatmentPathways';
import PrevalenceSection from '../components/PrevalenceSection';
import DataVisualization from '../components/DataVisualization';
import HealthCalculatorModal from '../components/HealthCalculatorModal';

const HomePage = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const navigate = useNavigate(); // This is the new tool that lets us change pages

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* We changed the button action right here! */}
      <HeroSection onOpenCalculator={() => navigate('/digital-twin')} />
      
      <JourneyTimeline />
      <TreatmentPathways />
      <PrevalenceSection />
      <DataVisualization />
      
      {/* The old modal is still here just in case, but it won't open when you click the main button anymore */}
      <HealthCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </div>
  );
};

export default HomePage;