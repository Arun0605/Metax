import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scissors, Heart, TrendingUp, Shield, AlertCircle, CheckCircle, Clock, IndianRupee, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';

const SurgicalPage = () => {
  const navigate = useNavigate();
  const [selectedProcedure, setSelectedProcedure] = useState('sleeve');

  const procedures = [
    {
      id: 'allurion',
      name: 'Allurion Swallowable Balloon',
      type: 'Endoscopic (No Surgery)',
      weightLoss: '10-15%',
      duration: '16 weeks',
      bestFor: 'BMI 27-40; people scared of surgery',
      pros: ['Swallow capsule in 15-min', 'No cuts, no anaesthesia', 'Quick recovery'],
      cons: ['Nausea first weeks', 'Rare migration'],
      cost: 'Rs. 2.5-4 lakh',
      color: '#8B5CF6'
    },
    {
      id: 'orbera',
      name: 'Orbera Gastric Balloon',
      type: 'Endoscopic',
      weightLoss: '10-20 kg',
      duration: '6-12 months',
      bestFor: 'BMI 27-40',
      pros: ['Proven safety', 'Good for lower BMI'],
      cons: ['Requires endoscopy', 'Nausea common'],
      cost: 'Rs. 3-5 lakh',
      color: '#F59E0B'
    },
    {
      id: 'sleeve',
      name: 'Sleeve Gastrectomy (LSG)',
      type: 'Laparoscopic Surgery',
      weightLoss: '25-30%',
      duration: 'Permanent',
      bestFor: 'BMI >32.5-37.5+',
      pros: ['Safe, quick (45-60 min)', 'Fewer nutritional issues', 'Most popular in India'],
      cons: ['Stomach leak risk (<1%)', 'Reflux possible'],
      cost: 'Rs. 4-6 lakh',
      color: '#10B981'
    },
    {
      id: 'rygb',
      name: 'Roux-en-Y Gastric Bypass (RYGB)',
      type: 'Laparoscopic Surgery',
      weightLoss: '27-32%',
      duration: 'Permanent',
      bestFor: 'Diabetes-heavy patients',
      pros: ['Excellent diabetes remission', '60-80% T2DM cure'],
      cons: ['More nutritional supplements needed'],
      cost: 'Rs. 5-7 lakh',
      color: '#0EA5E9'
    },
    {
      id: 'oagb',
      name: 'One-Anastomosis Gastric Bypass (OAGB)',
      type: 'Laparoscopic Surgery',
      weightLoss: '33-48%',
      duration: 'Permanent',
      bestFor: 'High BMI or strong diabetes',
      pros: ['Simpler, faster', 'Highest weight loss in Indian data'],
      cons: ['Bile reflux (1-10%)', 'Lifelong vitamins'],
      cost: 'Rs. 4.5-6.5 lakh',
      color: '#EF4444'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=85&w=1920&auto=format&fit=crop)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-navy/90 to-slate-navy/95" />
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
            Surgical Weight Loss:<br />
            <span className="font-normal">A Life-Changing Option</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mb-8">
            For Long-Lasting Results • 25-35% Sustained Weight Loss • 60-80% Diabetes Remission
          </p>
          <div className="bg-amber-500/20 border-l-4 border-amber-500 p-6 rounded-r-xl max-w-4xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white text-lg font-medium mb-2">Important Note for Readers:</p>
                <p className="text-white">
                  Bariatric and metabolic surgery is a <strong>serious medical procedure, not cosmetic</strong>. It must be done only by experienced bariatric surgeons in accredited hospitals. CDSCO and OSSI regulate these treatments. Always consult a qualified bariatric surgeon, endocrinologist, and nutritionist. <strong>Results vary person to person. This page is for education only.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Eligibility Section */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy mb-8">
              Who Can Consider Surgical Weight Loss in India?
            </h2>
            
            <p className="text-lg text-slate-900 mb-8 leading-relaxed">
              India uses <strong>lower BMI cut-offs</strong> because Indians develop diabetes, heart disease, and other problems at smaller waist sizes (Asian-Indian phenotype).
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-soft-blue rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-slate-navy mb-4">OSSI Guidelines 2024 (India):</h3>
                <ul className="space-y-3 text-slate-900">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>BMI &gt;32.5 kg/m²</strong> + any obesity-related disease (diabetes, high BP, sleep apnea, fatty liver, joint pain)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>BMI &gt;37.5 kg/m²</strong> even without other diseases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>BMI &gt;30 kg/m²</strong> with life-threatening conditions (uncontrolled diabetes, severe heart disease, very bad sleep apnea)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span>Age <strong>18-65 years</strong> (possible outside in special cases)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-warm-sand rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Additional Requirements:</h3>
                <ul className="space-y-3 text-slate-900">
                  <li>• Must have tried diet + exercise for <strong>at least 6 months</strong> without success</li>
                  <li>• Ready for <strong>lifelong follow-up</strong></li>
                  <li>• Psychological readiness for lifestyle changes</li>
                  <li>• No active substance abuse</li>
                  <li>• Understanding of risks and benefits</li>
                </ul>
              </div>
            </div>

            {/* India Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-green-200 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">20,000+</div>
                <p className="text-slate-900 font-medium">Annual Surgeries</p>
                <p className="text-sm text-slate-800">Performed in India (2025-26)</p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-blue-200 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">254M</div>
                <p className="text-slate-900 font-medium">Adults with Obesity</p>
                <p className="text-sm text-slate-800">ICMR-INDIAB 2025</p>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-purple-200 text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">60-80%</div>
                <p className="text-slate-900 font-medium">Diabetes Remission</p>
                <p className="text-sm text-slate-800">In Indian patients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Images */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=85&w=800&auto=format&fit=crop" 
                alt="Modern surgical suite" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/90 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Advanced Facilities</h3>
                  <p className="text-white">State-of-the-art laparoscopic equipment</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=85&w=800&auto=format&fit=crop" 
                alt="Surgical team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/90 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Expert Care</h3>
                  <p className="text-white">Multidisciplinary team approach</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Procedures Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy text-center mb-4">
            All Available Options in India
          </h2>
          <p className="text-center text-lg text-slate-800 mb-12">2026 Update - From Non-Surgical to Advanced Surgery</p>
          
          <div className="space-y-6">
            {procedures.map((proc) => (
              <div 
                key={proc.id}
                className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedProcedure(proc.id)}
                style={{ borderLeft: `6px solid ${proc.color}` }}
              >
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-manrope font-semibold text-slate-navy mb-2">{proc.name}</h3>
                    <p className="text-slate-800 mb-4"><span className="font-semibold">Type:</span> {proc.type}</p>
                    <p className="text-slate-800 mb-4"><span className="font-semibold">Best For:</span> {proc.bestFor}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-700 mb-1">Weight Loss</p>
                        <p className="text-2xl font-bold" style={{color: proc.color}}>{proc.weightLoss}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-700 mb-1">Duration</p>
                        <p className="text-xl font-bold text-slate-navy">{proc.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Advantages
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-900">
                      {proc.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Considerations
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-900">
                      {proc.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-soft-blue rounded-lg">
                      <p className="text-sm text-slate-900"><strong>Cost:</strong> {proc.cost}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weight Loss Comparison Chart */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8 text-center">
              Weight Loss Comparison
            </h2>
            
            <div className="grid md:grid-cols-5 gap-6 items-end">
              <div className="text-center">
                <div className="w-full h-32 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-2xl flex items-end justify-center pb-3">
                  <span className="text-white font-bold text-lg">12%</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-purple-500">
                  <p className="font-semibold text-slate-navy text-sm">Allurion Balloon</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-full h-40 bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-2xl flex items-end justify-center pb-3">
                  <span className="text-white font-bold text-lg">15%</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-amber-500">
                  <p className="font-semibold text-slate-navy text-sm">Orbera Balloon</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-full h-56 bg-gradient-to-t from-green-500 to-green-300 rounded-t-2xl flex items-end justify-center pb-3">
                  <span className="text-white font-bold text-lg">27%</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-green-500">
                  <p className="font-semibold text-slate-navy text-sm">Sleeve (LSG)</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-full h-64 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-2xl flex items-end justify-center pb-3">
                  <span className="text-white font-bold text-lg">30%</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-blue-500">
                  <p className="font-semibold text-slate-navy text-sm">RYGB</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-full h-80 bg-gradient-to-t from-red-500 to-red-300 rounded-t-2xl flex items-end justify-center pb-3">
                  <span className="text-white font-bold text-lg">40%</span>
                </div>
                <div className="bg-white p-4 rounded-b-2xl border-2 border-red-500">
                  <p className="font-semibold text-slate-navy text-sm">OAGB</p>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-slate-800 mt-8 italic">
              *Average sustained weight loss at 5-10 years. OAGB shows highest results in Indian multicentre studies (Baig et al., 2025).
            </p>
          </div>
        </section>

        {/* India-Specific Outcomes */}
        <section className="mb-20">
          <div className="bg-slate-navy text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-white mb-8 text-center">
              India-Specific Outcomes (2024-2025 Studies)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Higher Diabetes Remission</h3>
                <p className="text-white">
                  Indian patients often achieve <strong>60-80% T2DM remission</strong>, higher than global averages due to earlier intervention and Asian metabolic phenotype.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">OAGB Excellence</h3>
                <p className="text-white">
                  <strong>36.9% total weight loss</strong> with OAGB in Indian multicentre data (Musella et al., 2025) - best long-term results among all procedures.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Balloon Success</h3>
                <p className="text-white">
                  Allurion Balloon shows <strong>95% weight maintenance at 1 year</strong> when combined with Indian diet + yoga/walking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Circular Charts */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal text-slate-navy text-center mb-12">
            Benefits Especially for Indians
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="65" stroke="#E5E7EB" strokeWidth="15" fill="transparent" />
                  <circle cx="80" cy="80" r="65" stroke="#10B981" strokeWidth="15" fill="transparent"
                    strokeDasharray="408.4" strokeDashoffset="81.68" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">80%</span>
                </div>
              </div>
              <h4 className="font-semibold text-slate-navy mb-2">Diabetes Remission</h4>
              <p className="text-sm text-slate-800">Type 2 reversal in Indian patients</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="65" stroke="#E5E7EB" strokeWidth="15" fill="transparent" />
                  <circle cx="80" cy="80" r="65" stroke="#0EA5E9" strokeWidth="15" fill="transparent"
                    strokeDasharray="408.4" strokeDashoffset="122.52" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">70%</span>
                </div>
              </div>
              <h4 className="font-semibold text-slate-navy mb-2">BP Control</h4>
              <p className="text-sm text-slate-800">Hypertension improvement</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="65" stroke="#E5E7EB" strokeWidth="15" fill="transparent" />
                  <circle cx="80" cy="80" r="65" stroke="#F59E0B" strokeWidth="15" fill="transparent"
                    strokeDasharray="408.4" strokeDashoffset="163.36" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-amber-600">60%</span>
                </div>
              </div>
              <h4 className="font-semibold text-slate-navy mb-2">Sleep Apnea</h4>
              <p className="text-sm text-slate-800">OSA resolution</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle cx="80" cy="80" r="65" stroke="#E5E7EB" strokeWidth="15" fill="transparent" />
                  <circle cx="80" cy="80" r="65" stroke="#EF4444" strokeWidth="15" fill="transparent"
                    strokeDasharray="408.4" strokeDashoffset="40.84" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-600">90%</span>
                </div>
              </div>
              <h4 className="font-semibold text-slate-navy mb-2">Fatty Liver</h4>
              <p className="text-sm text-slate-800">MASLD improvement</p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-navy mb-4 text-center">Additional Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-slate-900">Reduces risk of heart attack, stroke, and cancer</p>
              </div>
              <div>
                <Activity className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-slate-900">Better quality of life – more energy for family and work</p>
              </div>
              <div>
                <IndianRupee className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <p className="text-slate-900">Lifelong health savings (partially covered by insurance after IRDAI mandate)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Risks & Safety */}
        <section className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8">
              Risks & Safety (Very Low in Good Centres)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">&lt;0.5%</div>
                <p className="text-slate-900 font-medium">Overall Mortality</p>
                <p className="text-sm text-slate-800">Extremely safe in accredited centres</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">&lt;5%</div>
                <p className="text-slate-900 font-medium">Major Complications</p>
                <p className="text-sm text-slate-800">Leak, infection, etc.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <p className="text-slate-900 font-medium">Multidisciplinary Care</p>
                <p className="text-sm text-slate-800">Nutritionist + Psychologist + Surgeon</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Common (Temporary):</h3>
                <ul className="space-y-2 text-slate-900">
                  <li>• Nausea (especially with balloons)</li>
                  <li>• Fatigue during initial weight loss</li>
                  <li>• Loose stools (temporary)</li>
                  <li>• Hair thinning (recovers with protein)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-4">Rare (Preventable):</h3>
                <ul className="space-y-2 text-slate-900">
                  <li>• Nutritional deficiencies (prevented with vitamins)</li>
                  <li>• Leak or infection (&lt;1%)</li>
                  <li>• Bile reflux with OAGB (1-10%)</li>
                  <li>• Stricture (very rare)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Lifelong Aftercare */}
        <section className="mb-20">
          <div className="bg-warm-sand rounded-2xl p-8 md:p-12 border-2 border-orange-200">
            <h2 className="text-3xl font-manrope font-normal text-slate-navy mb-8 text-center">
              Lifelong Aftercare is Must
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🥗</span>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">High-Protein Diet</h4>
                <p className="text-sm text-slate-800">Dal, paneer, eggs, soya - Indian options</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧘</span>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Regular Exercise</h4>
                <p className="text-sm text-slate-800">Yoga + walking daily</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💊</span>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Vitamin Supplements</h4>
                <p className="text-sm text-slate-800">Forever (especially after bypass)</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📅</span>
                </div>
                <h4 className="font-semibold text-slate-navy mb-2">Regular Follow-up</h4>
                <p className="text-sm text-slate-800">Every 3-6 months</p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Images */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=85&w=600&auto=format&fit=crop" 
                alt="Surgical instruments" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-slate-navy/80 p-4">
                <p className="text-white font-semibold">Advanced Technology</p>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=85&w=600&auto=format&fit=crop" 
                alt="Patient care" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-slate-navy/80 p-4">
                <p className="text-white font-semibold">Comprehensive Care</p>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=85&w=600&auto=format&fit=crop" 
                alt="Recovery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-slate-navy/80 p-4">
                <p className="text-white font-semibold">Post-Surgery Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-slate-navy mb-3">Medical Disclaimer</h3>
                <p className="text-slate-900 leading-relaxed mb-3">
                  This information is educational and based on OSSI 2024 guidelines, Indian multicentre studies (Baig et al., 2025), OAGB meta-analysis (Musella et al., 2025), ICMR-INDIAB 2025, Allurion India outcomes, and CDSCO approvals. It is <strong>not medical advice</strong>. Individual results vary.
                </p>
                <p className="text-slate-900 font-semibold">
                  Surgery or balloon placement should only be done after full medical evaluation. Consult your bariatric surgeon. Data current as of March 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-soft-blue rounded-2xl p-12 border-2 border-blue-300">
            <h2 className="text-3xl font-manrope font-medium text-slate-navy mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg text-slate-900 mb-8 max-w-2xl mx-auto">
              Take our comprehensive health assessment to understand if surgical weight loss could be right for you.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-slate-navy text-white hover:bg-slate-800 px-8 py-6 text-lg"
            >
              Start Your Free Assessment
            </Button>
            <p className="text-sm text-slate-800 mt-4">
              *Assessment for informational purposes only. Medical evaluation by bariatric surgeon required.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SurgicalPage;
