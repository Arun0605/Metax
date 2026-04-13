import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pill, AlertCircle, CheckCircle, IndianRupee, Clock, TrendingUp, Heart, Activity, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

const MedicalPage = () => {
  const navigate = useNavigate();

  const medications = [
    {
      name: 'Orlistat',
      mechanism: 'Blocks fat absorption from food',
      weightLoss: '5–10% (4–8 kg in a year)',
      brands: 'Xenical, Orlistat tablets',
      cost: 'Rs. 1,500–3,000',
      notes: 'Oldest & cheapest; causes loose stools if you eat oily food. Available without prescription in low dose.',
      color: '#F59E0B'
    },
    {
      name: 'Semaglutide (GLP-1)',
      mechanism: 'Reduces hunger, slows digestion, controls blood sugar',
      weightLoss: '14–17% (10–15 kg or more)',
      brands: 'Rybelsus (tablet), Ozempic, Wegovy + new generics (Sun Pharma Noveltreat, Alkem, Zydus, Natco)',
      cost: 'Branded: Rs. 8,000–16,000 | Generics (after March 2026): Rs. 3,000–5,000',
      notes: 'Most popular in India. Generics launching now — huge price drop expected. Strong evidence for diabetes remission and heart protection.',
      color: '#10B981'
    },
    {
      name: 'Tirzepatide (Dual GLP-1/GIP)',
      mechanism: 'Stronger hunger control + better blood sugar effect',
      weightLoss: '15–22% (up to 21.8 kg in studies)',
      brands: 'Mounjaro (Eli Lilly)',
      cost: 'Rs. 14,000–17,500',
      notes: 'Launched March 2025. Currently India\'s top-selling weight-loss drug. Often gives better results than semaglutide.',
      color: '#0EA5E9'
    },
    {
      name: 'Liraglutide',
      mechanism: 'Similar to semaglutide but daily injection',
      weightLoss: '8–10%',
      brands: 'Victoza (mainly diabetes), Saxenda',
      cost: 'Rs. 8,000–12,000',
      notes: 'Less common for weight loss now.',
      color: '#8B5CF6'
    }
  ];

  const benefits = [
    { icon: Heart, title: 'Diabetes Control', desc: 'Helps reverse or control Type 2 diabetes (common in India)' },
    { icon: Activity, title: 'Heart Protection', desc: 'Lowers risk of heart attack, stroke, and fatty liver' },
    { icon: TrendingUp, title: 'Improved Mobility', desc: 'Reduces joint pain and improves energy for daily life' },
    { icon: Shield, title: 'Indian Phenotype', desc: 'Works even with more belly fat at lower weight' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=85&w=1920&auto=format&fit=crop)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-navy/85 to-slate-navy/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/10 w-fit mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-6xl font-manrope font-light text-white mb-6 leading-tight">
            Medical Weight Loss:<br />
            <span className="font-normal">Medicines That Can Help</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mb-8">
            When Diet & Exercise Alone Aren't Enough
          </p>
          <div className="bg-amber-500/20 border-l-4 border-amber-500 p-6 rounded-r-xl max-w-4xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white text-lg font-medium mb-2">Important Note:</p>
                <p className="text-white">
                  These medicines are <strong>prescription-only</strong>. They are not magic pills and work best when combined with healthy Indian-style eating and regular activity (like walking or yoga). The Government of India (CDSCO) has warned companies against direct advertising of these drugs to the public — they should only be started after a doctor checks your health. <strong>Always consult a qualified doctor or endocrinologist before starting any medicine.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Who Can Consider */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy mb-8">
              Who Can Consider Medical Weight Loss Medicines?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-soft-blue rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-slate-navy mb-4">India-Specific BMI Cut-offs:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>BMI 25 or more</strong> + any health issue (diabetes, high BP, cholesterol, sleep apnea, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Or BMI 27 or more</strong> even without other problems</span>
                  </li>
                  <li className="text-sm text-slate-700 mt-4 italic">
                    As per Endocrine Society of India (ESI) 2025 guidelines
                  </li>
                </ul>
              </div>
              
              <div className="bg-warm-sand rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Why Lower Cut-offs for India?</h3>
                <p className="text-slate-900 leading-relaxed">
                  Indians tend to develop diabetes and heart problems at smaller waist sizes. This is lower than Western guidelines — <strong>early treatment protects Indian hearts and prevents diabetes better.</strong>
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-sm text-slate-900 font-medium">
                    📊 India Stats: Over <strong>254 million adults</strong> have obesity (ICMR-INDIAB 2025). These medicines have helped thousands of Indian patients lose weight safely and improve blood sugar and heart health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medicines Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy mb-4">
              Medicines Approved and Used in India
            </h2>
            <p className="text-lg text-slate-800">March 2026 Update</p>
          </div>

          <div className="grid gap-8">
            {medications.map((med, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${med.color}20` }}
                  >
                    <Pill className="w-8 h-8" style={{ color: med.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-manrope font-semibold text-slate-navy mb-2">{med.name}</h3>
                    <p className="text-slate-800 mb-4 text-lg"><strong>How It Works:</strong> {med.mechanism}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-700 mb-1">Average Weight Loss</p>
                        <p className="text-xl font-bold text-slate-navy">{med.weightLoss}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-700 mb-1 flex items-center gap-2">
                          <IndianRupee className="w-4 h-4" />
                          Monthly Cost (approx.)
                        </p>
                        <p className="text-xl font-bold text-slate-navy">{med.cost}</p>
                      </div>
                    </div>
                    
                    <div className="bg-soft-blue rounded-lg p-4 mb-3">
                      <p className="text-sm text-slate-700 mb-1 font-semibold">Common Brands in India:</p>
                      <p className="text-slate-900">{med.brands}</p>
                    </div>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
                      <p className="text-slate-900"><strong>Note:</strong> {med.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
            <p className="text-slate-900 text-lg">
              <strong>Coming Soon (2026):</strong> Many more Indian-made generic semaglutide injections will make treatment affordable for lakhs of people.
            </p>
          </div>
        </section>

        {/* How Much Can You Lose */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12 border-2 border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="w-12 h-12 text-slate-navy" />
              <h2 className="text-3xl font-manrope font-normal text-slate-navy">How Much Can You Lose?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xl text-slate-900 mb-4">
                  Most people lose <strong>10–20% of body weight</strong> in 1–2 years with these newer injections — far better than diet alone.
                </p>
                <p className="text-lg text-slate-900">
                  Indian real-world experience shows similar results to global studies, plus big improvements in diabetes control.
                </p>
              </div>
              
              <div className="bg-soft-blue rounded-xl p-6">
                <h3 className="font-semibold text-slate-navy mb-4">Expected Weight Loss by Medicine:</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Orlistat</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-slate-900 font-semibold">5-10%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Liraglutide</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-slate-900 font-semibold">8-10%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Semaglutide</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '70%'}}></div>
                      </div>
                      <span className="text-slate-900 font-semibold">14-17%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900">Tirzepatide</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <span className="text-slate-900 font-semibold">15-22%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-700 mt-4 italic">*Based on STEP and SURMOUNT clinical trials, 2024-2025</p>
              </div>
            </div>
            
            {/* Weight Loss Comparison Chart Visual */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-green-200 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">10-15kg</div>
                <p className="text-slate-900 font-medium">Average Weight Loss</p>
                <p className="text-sm text-slate-700">With newer medications</p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">60-80%</div>
                <p className="text-slate-900 font-medium">T2DM Remission</p>
                <p className="text-sm text-slate-700">In Indian patients (ICMR data)</p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">1-2 Years</div>
                <p className="text-slate-900 font-medium">Duration for Results</p>
                <p className="text-sm text-slate-700">With consistent use</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Indians */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy text-center mb-12">
            Benefits Especially for Indians
          </h2>
          
          {/* Success Rate Pie Chart Visual */}
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-semibold text-slate-navy text-center mb-8">
              Treatment Success Rates in Indian Patients
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle cx="96" cy="96" r="80" stroke="#E5E7EB" strokeWidth="20" fill="transparent" />
                    <circle cx="96" cy="96" r="80" stroke="#10B981" strokeWidth="20" fill="transparent"
                      strokeDasharray="502.4" strokeDashoffset="125.6" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-green-600">75%</span>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Diabetes Improvement</h4>
                <p className="text-sm text-slate-800">Patients see HbA1c reduction (ICMR-INDIAB 2025)</p>
              </div>
              
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle cx="96" cy="96" r="80" stroke="#E5E7EB" strokeWidth="20" fill="transparent" />
                    <circle cx="96" cy="96" r="80" stroke="#0EA5E9" strokeWidth="20" fill="transparent"
                      strokeDasharray="502.4" strokeDashoffset="150.72" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">70%</span>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Heart Health</h4>
                <p className="text-sm text-slate-800">Reduced cardiovascular risk factors</p>
              </div>
              
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle cx="96" cy="96" r="80" stroke="#E5E7EB" strokeWidth="20" fill="transparent" />
                    <circle cx="96" cy="96" r="80" stroke="#F59E0B" strokeWidth="20" fill="transparent"
                      strokeDasharray="502.4" strokeDashoffset="100.48" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-amber-600">80%</span>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Patient Satisfaction</h4>
                <p className="text-sm text-slate-800">Report improved quality of life</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="glass-card rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-slate-navy" />
                  </div>
                  <h3 className="font-semibold text-slate-navy mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-800">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Side Effects */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8">
              Common Side Effects & Safety Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Common Side Effects:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li>• Nausea, vomiting, constipation (usually mild and improves after few weeks)</li>
                  <li>• Possible muscle loss → Eat high-protein Indian food (dal, paneer, eggs, curd) + do strength exercises</li>
                  <li>• Rare: gallbladder issues or low blood sugar (if you have diabetes)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Safety Monitoring:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li>• Doctor will monitor: Blood tests, thyroid, kidney</li>
                  <li>• Dose adjusted slowly to minimize side effects</li>
                  <li>• Not suitable if pregnant, planning pregnancy, or have certain stomach problems</li>
                  <li>• Stop if side effects are severe</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Safely */}
        <section className="mb-20">
          <div className="bg-warm-sand rounded-2xl p-8 md:p-12 border-2 border-slate-200">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8">
              How to Use These Medicines Safely
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-green-600">1</span>
                  <p className="text-slate-900">Start with 3–6 months of proper diet + exercise.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                  <p className="text-slate-900">Add medicine only if you lose less than 5% weight.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                  <p className="text-slate-900">Continue lifestyle changes — medicines are for long-term use (stopping often causes regain).</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-red-600">4</span>
                  <p className="text-slate-900">Regular doctor follow-up is must.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Images Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=85&w=800&auto=format&fit=crop" 
                alt="Healthy Indian lifestyle" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Healthy Indian Diet</h3>
                  <p className="text-white">High-protein meals support weight loss</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=85&w=800&auto=format&fit=crop" 
                alt="Doctor consultation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Medical Supervision</h3>
                  <p className="text-white">Regular monitoring ensures safety</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cost Comparison Visual */}
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8 text-center">
              Medication Costs in India (Per Month)
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-48 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-2xl flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xl">Rs. 2,000</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-amber-500">
                  <p className="font-semibold text-slate-navy">Orlistat</p>
                  <p className="text-sm text-slate-700">Most Affordable</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-64 bg-gradient-to-t from-green-500 to-green-300 rounded-t-2xl flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xl">Rs. 4,000</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-green-500">
                  <p className="font-semibold text-slate-navy">Semaglutide</p>
                  <p className="text-sm text-slate-700">Generics 2026</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-56 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-2xl flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xl">Rs. 10,000</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-purple-500">
                  <p className="font-semibold text-slate-navy">Liraglutide</p>
                  <p className="text-sm text-slate-700">Daily Injection</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-full h-72 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-2xl flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xl">Rs. 15,000</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-blue-500">
                  <p className="font-semibold text-slate-navy">Tirzepatide</p>
                  <p className="text-sm text-slate-700">Highest Efficacy</p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-700 mt-6 italic">
              *Costs are approximate averages. Generic options expected to reduce prices significantly in 2026 (CDSCO approvals 2025).
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-3">Medical Disclaimer</h3>
                <p className="text-slate-900 leading-relaxed mb-3">
                  This information is for education only and based on latest ESI Clinical Practice Guidelines 2025, CDSCO recommendations, ICMR-INDIAB 2025 study, and global trials (SURMOUNT & STEP). It is <strong>not a substitute for professional medical advice</strong>. Results vary from person to person.
                </p>
                <p className="text-slate-900 font-semibold">
                  Consult your doctor before starting any treatment. Data current as of March 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-soft-blue rounded-2xl p-12 border-2 border-blue-300">
            <h2 className="text-3xl font-manrope font-medium text-slate-navy mb-4">
              Ready to Explore Your Options?
            </h2>
            <p className="text-lg text-slate-900 mb-8 max-w-2xl mx-auto">
              Take our comprehensive health assessment to understand if medical weight loss could be right for you.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-slate-navy text-white hover:bg-slate-800 px-8 py-6 text-lg"
            >
              Start Your Free Assessment
            </Button>
            <p className="text-sm text-slate-700 mt-4">
              *Assessment for informational purposes only. Consult a qualified doctor for prescription medicines.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MedicalPage;
