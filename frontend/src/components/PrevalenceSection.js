import React from 'react';
import { TrendingUp, Users, Globe, AlertTriangle } from 'lucide-react';

const PrevalenceSection = () => {
  return (
    <section className="py-24 bg-white" data-testid="prevalence-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal tracking-tight text-slate-navy mb-4">
            The Global Obesity Crisis
          </h2>
          <p className="text-base md:text-lg text-slate-900 max-w-2xl mx-auto">
            Understanding the scope and impact of metabolic disease worldwide and in India
          </p>
        </div>

        {/* Global Statistics */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12 scroll-reveal">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-10 h-10 text-slate-navy" />
            <h3 className="text-2xl font-manrope font-medium text-slate-navy">Global Burden (2022-2024)</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">890M</div>
              <p className="text-sm text-slate-900">Adults living with obesity globally</p>
            </div>
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">2.5B</div>
              <p className="text-sm text-slate-900">Overweight adults worldwide</p>
            </div>
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">160M</div>
              <p className="text-sm text-slate-900">Adolescents with obesity</p>
            </div>
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">4X</div>
              <p className="text-sm text-slate-900">Adolescent obesity quadrupled since 1990</p>
            </div>
          </div>
          
          <div className="bg-warm-sand rounded-xl p-6">
            <h4 className="font-semibold text-slate-navy mb-3">Health & Economic Impact:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div>
                <p>• 3.7-5 million annual deaths from obesity-related NCDs</p>
                <p>• Cardiovascular disease, Type 2 Diabetes, cancers</p>
              </div>
              <div>
                <p>• Projected economic burden: <strong>US$3 trillion/year by 2030</strong></p>
                <p>• Fastest rise in low/middle-income countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* India Statistics */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12 scroll-reveal">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-10 h-10 text-slate-navy" />
            <h3 className="text-2xl font-manrope font-medium text-slate-navy">India: A Growing Epidemic</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">254M</div>
              <p className="text-sm text-slate-900">Adults with generalised obesity (BMI ≥25)</p>
              <p className="text-xs text-slate-700 mt-2">ICMR-INDIAB 2025</p>
            </div>
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">351M</div>
              <p className="text-sm text-slate-900">Adults with abdominal obesity</p>
              <p className="text-xs text-slate-700 mt-2">ICMR-INDIAB 2025</p>
            </div>
            <div className="text-center p-6 bg-soft-blue rounded-xl">
              <div className="text-4xl font-bold text-slate-navy mb-2">180M</div>
              <p className="text-sm text-slate-900">Second-highest globally (after China)</p>
              <p className="text-xs text-slate-700 mt-2">Lancet 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-warm-sand rounded-xl p-6">
              <h4 className="font-semibold text-slate-navy mb-3">NFHS-5 Trends (2019-21):</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Women overweight/obese: <strong>24%</strong> (↑91% since NFHS-3)</li>
                <li>• Men overweight/obese: <strong>22.9%</strong> (↑146% since NFHS-3)</li>
                <li>• Under-5 overweight rose from 2.1% to <strong>3.4%</strong></li>
                <li>• Adolescent obesity: girls ↑125%, boys ↑288%</li>
                <li>• <strong>Rural areas rising fastest</strong> (double burden)</li>
              </ul>
            </div>
            <div className="bg-warm-sand rounded-xl p-6">
              <h4 className="font-semibold text-slate-navy mb-3">Metabolic Obesity Subtypes (ICMR):</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>MONO</strong> (Metabolically Obese Non-Obese): <strong>43.3%</strong></li>
                <li>• High risk despite "normal" BMI (T2DM OR 6.9, CKD risk)</li>
                <li>• <strong>MOO</strong> (Metabolically Obese Obese): <strong>28.3%</strong></li>
                <li>• Highest in urban areas & females</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-l-4 border-amber-500 bg-amber-50 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-navy mb-2">The Double Burden:</h4>
                <p className="text-slate-700">
                  India faces a unique challenge with coexisting <strong>undernutrition and obesity</strong>, especially in rural areas. 
                  Unhealthy diets are now the #1 contributor to disease burden (56%, ICMR-NIN 2024). 
                  Economic impact projected at <strong>2.5% of GDP by 2060</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center scroll-reveal">
          <div className="bg-soft-blue rounded-2xl p-12 border-2 border-slate-200">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-slate-navy" />
            <h3 className="text-2xl md:text-3xl font-manrope font-medium mb-4 text-slate-navy">
              Early Intervention Changes Everything
            </h3>
            <p className="text-lg text-slate-900 mb-6 max-w-2xl mx-auto">
              Understanding your metabolic health status is the first step toward effective intervention. 
              Our evidence-based assessment uses Asian BMI cut-offs to provide personalized risk evaluation.
            </p>
            <p className="text-sm text-slate-800 font-medium">
              Data sources: WHO 2025, NCD-RisC, NFHS-5, ICMR-INDIAB-23, Lancet Global Burden 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrevalenceSection;
