import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Salad, Pill, Scissors } from 'lucide-react';

const TreatmentPathways = () => {
  const navigate = useNavigate();
  
  const pathways = [
    {
      icon: Salad,
      title: 'Lifestyle Management',
      description: 'Structured nutrition counseling, exercise prescription, and behavioral modification for sustainable weight management.',
      color: '#10B981',
      route: '/lifestyle'
    },
    {
      icon: Pill,
      title: 'Medical Weight Loss',
      description: 'Evidence-based pharmacotherapy combined with lifestyle intervention for patients who need additional metabolic support.',
      color: '#F59E0B',
      route: '/medical'
    },
    {
      icon: Scissors,
      title: 'Surgical Interventions',
      description: 'Minimally invasive bariatric procedures with proven long-term efficacy for severe obesity and metabolic disease.',
      color: '#0F172A',
      route: '/surgical'
    }
  ];

  return (
    <section className="py-24 bg-white" data-testid="treatment-pathways">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal tracking-tight text-slate-navy mb-4">
            Treatment Pathways
          </h2>
          <p className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto">
            Personalized care plans designed around your unique metabolic profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(pathway.route)}
                className="treatment-card glass-card rounded-2xl p-8 cursor-pointer scroll-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
                data-testid={`treatment-card-${index}`}
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${pathway.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: pathway.color }} />
                </div>
                <h3 className="text-xl font-manrope font-medium text-slate-navy mb-4">
                  {pathway.title}
                </h3>
                <p className="text-slate-800 leading-relaxed">
                  {pathway.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TreatmentPathways;