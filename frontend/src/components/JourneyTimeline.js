import React from 'react';
import { Stethoscope, Activity, Pill, Heart } from 'lucide-react';

const JourneyTimeline = () => {
  const steps = [
    {
      icon: Stethoscope,
      title: 'Consultation',
      description: 'Comprehensive evaluation of your health status and goals'
    },
    {
      icon: Activity,
      title: 'Metabolic Triage',
      description: 'Evidence-based risk assessment and pathway determination'
    },
    {
      icon: Pill,
      title: 'Intervention',
      description: 'Personalized treatment plan: lifestyle, medical, or surgical'
    },
    {
      icon: Heart,
      title: 'Lifelong Support',
      description: 'Continuous monitoring and optimization of your health outcomes'
    }
  ];

  return (
    <section className="py-24 bg-warm-sand" data-testid="journey-timeline">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal tracking-tight text-slate-navy mb-4">
            Your Journey to Better Health
          </h2>
          <p className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto">
            A structured, evidence-based approach to sustainable metabolic wellness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="timeline-step scroll-reveal relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`timeline-step-${index}`}
              >
                {/* Connecting Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-300 z-0" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-navy flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-manrope font-medium text-slate-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;