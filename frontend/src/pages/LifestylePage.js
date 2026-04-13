import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Utensils, Brain, Moon, TrendingDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const LifestylePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Background */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=85&w=1920&auto=format&fit=crop)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-navy/70 to-slate-navy/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center">
          <Button
            data-testid="back-button"
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/10 w-fit mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-5xl md:text-6xl font-manrope font-light text-white mb-6">
            Lifestyle Management
          </h1>
          <p className="text-xl text-white max-w-3xl">
            Core intervention for all patients • Achieves sustainable 5–10% weight loss • Improves metabolic health
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Overview */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-6">Evidence-Based Foundation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-slate-800 leading-relaxed mb-4">
                  Lifestyle interventions are the cornerstone for all patients, achieving <strong>sustainable 5–10% weight loss</strong> (average 3–5 kg) with significant improvements in obesity-related complications.
                </p>
                <p className="text-lg text-slate-800 leading-relaxed">
                  Multicomponent approaches (diet + activity + behavior) consistently outperform single-modality interventions and combine additively with medications for enhanced outcomes.
                </p>
              </div>
              <div className="bg-soft-blue rounded-xl p-6">
                <h3 className="font-semibold text-slate-navy mb-3">Key Benefits of 5-10% Weight Loss:</h3>
                <ul className="space-y-2 text-slate-800">
                  <li>• Reduces Type 2 Diabetes risk significantly</li>
                  <li>• Improves blood pressure and lipid profiles</li>
                  <li>• Decreases liver fat (MASLD)</li>
                  <li>• Enhances glycemic control</li>
                  <li>• Reduces joint pain and improves mobility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy text-center mb-12">
            Three Pillars of Success
          </h2>
          
          {/* Images Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=85&w=600&auto=format&fit=crop" 
              alt="Healthy nutrition" 
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=85&w=600&auto=format&fit=crop" 
              alt="Physical activity" 
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=600&auto=format&fit=crop" 
              alt="Mental wellness" 
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="space-y-12">
            {/* Nutrition */}
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-8 h-8 text-slate-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-manrope font-medium text-slate-navy mb-4">1. Nutrition</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-slate-navy mb-3">Core Principles:</h4>
                      <ul className="space-y-2 text-slate-800">
                        <li>• <strong>500–750 kcal/day deficit</strong> (baseline 1,200–1,500 kcal for women/men)</li>
                        <li>• <strong>High protein:</strong> ≥1.2 g/kg/day (up to 2.3 g/kg to preserve muscle mass)</li>
                        <li>• Prioritize nutrient-dense foods: vegetables, lean proteins, fruits, whole grains, legumes, nuts</li>
                        <li>• Minimize ultra-processed foods and added sugars</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-navy mb-3">Evidence-Based Approaches:</h4>
                      <ul className="space-y-2 text-slate-800">
                        <li>• Meal replacements (structured portion control)</li>
                        <li>• Intermittent fasting (16:8 or 5:2 protocols)</li>
                        <li>• Mediterranean or DASH patterns</li>
                        <li>• No single "best" macronutrient ratio—adherence is key</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-warm-sand rounded-xl p-6">
                    <h4 className="font-semibold text-slate-navy mb-3">Indian Plate Model (Culturally Adapted):</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-slate-navy">½</div>
                        <div className="text-sm text-slate-900">Vegetables</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-navy">¼</div>
                        <div className="text-sm text-slate-900">Whole Grains/Legumes</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-slate-navy">¼</div>
                        <div className="text-sm text-slate-900">Protein (Dal, Paneer, Eggs)</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-900 mt-4">Limit: mithai, fried snacks, sweetened beverages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Activity */}
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-slate-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-manrope font-medium text-slate-navy mb-4">2. Physical Activity</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-soft-blue rounded-xl p-6">
                      <div className="text-3xl font-bold text-slate-navy mb-2">≥150 min/week</div>
                      <p className="text-slate-800">Moderate aerobic activity (brisk walking, cycling, swimming)</p>
                    </div>
                    <div className="bg-soft-blue rounded-xl p-6">
                      <div className="text-3xl font-bold text-slate-navy mb-2">2-3 days/week</div>
                      <p className="text-slate-800">Resistance training (preserve muscle, counter sarcopenia)</p>
                    </div>
                    <div className="bg-soft-blue rounded-xl p-6">
                      <div className="text-3xl font-bold text-slate-navy mb-2">200-300 min/week</div>
                      <p className="text-slate-800">For maintenance and enhanced weight loss</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-6 border-l-4 border-slate-navy bg-warm-sand rounded-r-xl">
                    <p className="text-slate-800"><strong>Start Gradual:</strong> Begin with achievable goals and increase intensity progressively. Prioritize resistance training, especially when using GLP-1 medications, to preserve lean body mass.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Behavioral & Sleep */}
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8 text-slate-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-manrope font-medium text-slate-navy mb-4">3. Behavioral & Sleep Optimization</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-navy mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Cognitive-Behavioral Therapy (CBT)
                      </h4>
                      <ul className="space-y-2 text-slate-800">
                        <li>• Improves adherence to diet and exercise plans</li>
                        <li>• Addresses stress eating and emotional triggers</li>
                        <li>• Treats binge eating disorder</li>
                        <li>• Reduces internalized weight bias</li>
                        <li>• Manages depression and anxiety</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-navy mb-3 flex items-center gap-2">
                        <Moon className="w-5 h-5" />
                        Sleep & Recovery
                      </h4>
                      <ul className="space-y-2 text-slate-800">
                        <li>• Target: <strong>≥7–8 hours/night</strong></li>
                        <li>• Screen and treat obstructive sleep apnea (OSA)</li>
                        <li>• Poor sleep linked to weight gain and insulin resistance</li>
                        <li>• Establish consistent sleep schedule</li>
                        <li>• Optimize sleep environment (dark, cool, quiet)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence */}
        <section className="mb-20">
          <div className="bg-warm-sand rounded-2xl p-8 md:p-12 border-2 border-slate-200">
            <h2 className="text-3xl font-manrope font-normal mb-6 text-slate-navy">Clinical Evidence (2024-2025 Meta-Analyses)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-navy">Multicomponent Interventions:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li>• Reduce BMI (Mean Difference –0.49) vs. usual care</li>
                  <li>• Decrease BMI z-score and body fat percentage</li>
                  <li>• Short-term programs yield clinically meaningful loss</li>
                  <li>• Workplace and online formats proven effective</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-navy">Long-Term Maintenance:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li>• Requires ongoing support (coaching, mHealth apps)</li>
                  <li>• Sleep interventions support overall lifestyle changes</li>
                  <li>• Combination with pharmacotherapy shows additive effects</li>
                  <li>• Family/community involvement enhances adherence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* India-Specific Considerations */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-6">India-Specific Considerations</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-navy mb-3">Cultural Adaptations:</h3>
                  <ul className="space-y-2 text-slate-800">
                    <li>• Incorporate yoga (traditional + effective for Indian metabolic profile)</li>
                    <li>• Adapt to joint family meal patterns</li>
                    <li>• Festival season planning (Diwali, Eid, etc.)</li>
                    <li>• Vegetarian-friendly high-protein options (dal, paneer, soya, sprouts)</li>
                    <li>• Integrate with "Fit India Movement"</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-navy mb-3">Evidence in India:</h3>
                  <ul className="space-y-2 text-slate-800">
                    <li>• mHealth + community programs highly effective</li>
                    <li>• Yoga + diet superior for Indian metabolic syndrome</li>
                    <li>• Addressing social determinants critical (education, access)</li>
                    <li>• Rural areas: rising obesity with limited resources—simple, low-cost interventions key</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-soft-blue rounded-2xl p-12">
            <h2 className="text-3xl font-manrope font-medium text-slate-navy mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto">
              Take our free health risk assessment to understand your metabolic health status and receive personalized recommendations.
            </p>
            <Button
              data-testid="start-assessment-cta"
              onClick={() => navigate('/')}
              className="bg-slate-navy text-white hover:bg-slate-800 px-8 py-6 text-lg"
            >
              Start Your Free Assessment
            </Button>
            <p className="text-sm text-slate-900 mt-4">
              *Consult a qualified healthcare professional. Individual results vary.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LifestylePage;