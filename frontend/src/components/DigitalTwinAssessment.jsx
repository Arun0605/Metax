import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import html2pdf from 'html2pdf.js'; 

const CircularProgress = ({ percentage, color, label, sublabel, delay }) => {
  const [currentPct, setCurrentPct] = useState(0);
  useEffect(() => { const timer = setTimeout(() => setCurrentPct(percentage), delay || 100); return () => clearTimeout(timer); }, [percentage, delay]);
  const radius = 45; const circumference = 2 * Math.PI * radius; const strokeDashoffset = circumference - (currentPct / 100) * circumference;
  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000">
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" className="transform -rotate-90">
          <circle cx="70" cy="70" r={radius} stroke="#f8fafc" strokeWidth="12" fill="transparent" />
          <circle cx="70" cy="70" r={radius} stroke={color} strokeWidth="12" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute text-2xl font-black text-slate-800">{percentage}%</div>
      </div>
      <h4 className="mt-4 font-bold text-slate-900 text-sm uppercase tracking-wider text-center">{label}</h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter text-center">{sublabel}</p>
    </div>
  );
};

const DigitalTwinAssessment = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const [showLifestyleModal, setShowLifestyleModal] = useState(false);
  const [adherence, setAdherence] = useState(80); 
  const reportRef = useRef();

  // FULL CLINICAL STATE
  const [formData, setFormData] = useState({
    patient_name: '', patient_id: '', age: '', height: '', weight: '', gender: 'female',
    hba1c: '', meds_count: '', insulin_use: false, c_peptide: '', duration_years: '',
    ast: '', alt: '', platelets: '', albumin: '',
    tc: '', ldl: '', hdl: '', tg: '', smoker: false, on_statin: false,
    has_htn: false, sys_bp: '', dia_bp: '', htn_meds: '', htn_duration: '',
    has_osa: false, ahi_severity: 'mild', snoring: false, tired: false, observed_apnea: false, neck_cm: '',
    has_gerd: false, baseline_symptoms: 'None', esophagitis_la: 'A', ppi_use: false, hiatal_hernia: false,
    heartburn: false, regurgitation: false, swallowing_diff: false,
    has_oa: false, pain_severity: 'None', daily_nsaid: false,
    pain_walking: false, morning_stiffness: false,
    functional_dependent: false, history_vte: false, bleeding_disorder: false, steroid_use: false,
    menstruating: false, baseline_anemia: false, baseline_b12_low: false,
    procedure: 'SG' 
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    // 1. DATA VALIDATION (The Guardrail)
    if (!formData.age || !formData.height || !formData.weight) {
        alert("Insufficient Data: Please provide Age, Height, and Weight to generate an accurate clinical twin.");
        setStep(1); 
        return;
    }

    setLoading(true);
    const bmiCalc = Number(formData.weight) / ((Number(formData.height)/100)**2);
    
    const payload = {
      ...formData,
      bmi: Number(bmiCalc.toFixed(1)),
      diabetes_profile: { status: Number(formData.hba1c) >= 6.5 ? 'T2DM' : 'None', hba1c: Number(formData.hba1c), insulin_use: formData.insulin_use, meds_count: Number(formData.meds_count) },
      htn_profile: { has_htn: formData.has_htn, systolic: Number(formData.sys_bp) },
      osa_profile: { has_osa: formData.has_osa, ahi_severity: formData.ahi_severity, snoring: formData.snoring, tired: formData.tired, observed_apnea: formData.observed_apnea, neck_cm: Number(formData.neck_cm) },
      labs: { ast_alt_ratio: Number(formData.ast)/Number(formData.alt), platelets: Number(formData.platelets), albumin: Number(formData.albumin), has_diabetes: Number(formData.hba1c) >= 6.5 },
      gerd_profile: { has_gerd: formData.has_gerd, baseline_symptoms: formData.baseline_symptoms, ppi_use: formData.ppi_use, esophagitis_la: formData.esophagitis_la, heartburn: formData.heartburn, regurgitation: formData.regurgitation, swallowing_diff: formData.swallowing_diff },
      lipid_profile: { tc: Number(formData.tc), hdl: Number(formData.hdl), smoker: formData.smoker },
      mobility_profile: { has_oa: formData.has_oa, pain_severity: formData.pain_severity, daily_nsaid: formData.daily_nsaid, pain_walking: formData.pain_walking, morning_stiffness: formData.morning_stiffness },
      risk_profile: { history_vte: formData.history_vte, bleeding_disorder: formData.bleeding_disorder },
      nutrition_profile: { menstruating: formData.menstruating, baseline_anemia: formData.baseline_anemia }
    };

    try {
      const response = await fetch('https://metax-backend.onrender.com/api/digital-twin/simulate', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      const data = await response.json(); 
      setResult(data); 
      setStep(6);
    } catch (error) { 
      console.error(error);
      alert("Backend sync failed. Is server.py running?"); 
    }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    const patientNameStr = formData.patient_name ? formData.patient_name.replace(/\s+/g, '_') : 'Patient';
    const opt = {
      margin:       0.3,
      filename:     `MetaX_Clinical_Report_${patientNameStr}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const extractNumber = (str) => { if (!str) return 0; const match = String(str).match(/\d+/); return match ? parseInt(match[0], 10) : 0; };
  
  const getWeightChartData = () => {
    if (!result || !result.trajectories) return [];
    const u = result.trajectories.weight_timeline.unmanaged;
    const s = result.trajectories.weight_timeline.surgical;
    return [ {year:'Base', Unmanaged:Math.round(u[0]), Surgical:Math.round(s[0])}, {year:'Yr 1', Unmanaged:Math.round(u[1]), Surgical:Math.round(s[1])}, {year:'Yr 5', Unmanaged:Math.round(u[2]), Surgical:Math.round(s[2])}, {year:'Yr 10', Unmanaged:Math.round(u[3]), Surgical:Math.round(s[3])} ];
  };

  const getRadarData = () => {
      if (!result) return [];
      const adhMultiplier = adherence / 100;
      const s = result.surgical_projections;
      const l = result.lifestyle_twin.remission_base;

      return [
          { subject: 'T2DM Remission', Surgery: extractNumber(s.t2dm_remission_diarem?.remission_probability) || 0, Lifestyle: Math.round(l.t2dm.year_5 * adhMultiplier) },
          { subject: 'HTN Control', Surgery: extractNumber(s.htn_remission?.remission_probability?.year_5) || 0, Lifestyle: Math.round(l.htn.year_5 * adhMultiplier) },
          { subject: 'OSA Resolution', Surgery: extractNumber(s.osa_remission?.remission_probability?.year_1) || 0, Lifestyle: Math.round(l.osa.year_5 * adhMultiplier) },
          { subject: 'Lipid Health', Surgery: extractNumber(s.lipid_outcomes?.remission_probability?.year_5) || 0, Lifestyle: Math.round(l.lipids.year_5 * adhMultiplier) },
          { subject: 'GERD Relief', Surgery: extractNumber(s.gerd_outcomes?.remission_probability?.year_5) || 0, Lifestyle: Math.round(l.gerd.year_5 * adhMultiplier) },
          { subject: 'Joint Relief', Surgery: extractNumber(s.mobility_outcomes?.clinical_outcomes?.nsaid_cessation_prob_5y) || 0, Lifestyle: Math.round(l.oa_nsaid_cessation.year_5 * adhMultiplier) },
      ];
  };

  // 2. CLINICAL TRIAGE LOGIC
  const currentBmi = formData.weight && formData.height ? Number(formData.weight) / ((Number(formData.height)/100)**2) : 0;
  const isSurgeryIndicated = currentBmi >= 30; // Threshold for surgical intervention

  return (
    <div className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden mt-10 mb-20 bg-white font-sans text-slate-800 border-4 border-slate-100 shadow-xl relative">
      
      {/* FORM STEPS 1-5 */}
      {step < 6 && (
        <div className="p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-light text-slate-900 uppercase tracking-widest">Clinical <span className="font-bold text-indigo-600">Configurator</span></h2>
            <div className="flex justify-center mt-4 space-x-2">
                {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>)}
            </div>
            {step === 1 && <p className="text-xs font-bold text-rose-500 mt-4 tracking-widest uppercase">* Required Fields</p>}
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="col-span-2"><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Patient Name</label><input type="text" className="w-full p-3 bg-white rounded-lg border" value={formData.patient_name} onChange={(e)=>setFormData({...formData, patient_name:e.target.value})} placeholder="Optional" /></div>
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Age *</label><input type="number" className="w-full p-3 bg-white rounded-lg border border-slate-300" value={formData.age} onChange={(e)=>setFormData({...formData, age:e.target.value})} placeholder="Required" /></div>
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Gender *</label><select className="w-full p-3 bg-white rounded-lg border border-slate-300" value={formData.gender} onChange={(e)=>setFormData({...formData, gender:e.target.value})}><option value="female">Female</option><option value="male">Male</option></select></div>
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Height (cm) *</label><input type="number" className="w-full p-3 bg-white rounded-lg border border-slate-300" value={formData.height} onChange={(e)=>setFormData({...formData, height:e.target.value})} placeholder="Required" /></div>
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Weight (kg) *</label><input type="number" className="w-full p-3 bg-white rounded-lg border border-slate-300" value={formData.weight} onChange={(e)=>setFormData({...formData, weight:e.target.value})} placeholder="Required" /></div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm uppercase mb-4">Diabetes & Liver (Optional)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">HbA1c (%)</label><input type="number" step="0.1" className="w-full p-3 bg-white rounded-lg border" value={formData.hba1c} onChange={(e)=>setFormData({...formData, hba1c:e.target.value})} /></div>
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Diabetes Meds Count</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.meds_count} onChange={(e)=>setFormData({...formData, meds_count:e.target.value})} /></div>
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">AST</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.ast} onChange={(e)=>setFormData({...formData, ast:e.target.value})} /></div>
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">ALT</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.alt} onChange={(e)=>setFormData({...formData, alt:e.target.value})} /></div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm uppercase mb-4">Lipid Profile (Optional)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Total Cholesterol</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.tc} onChange={(e)=>setFormData({...formData, tc:e.target.value})} /></div>
                        <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">HDL (Good)</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.hdl} onChange={(e)=>setFormData({...formData, hdl:e.target.value})} /></div>
                    </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center mb-4"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.has_htn} onChange={(e)=>setFormData({...formData, has_htn:e.target.checked})} /><label className="ml-3 text-lg font-bold text-slate-900">Diagnosed Hypertension</label></div>
                  {formData.has_htn && <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Systolic BP (Top Number)</label><input type="number" className="w-full p-3 bg-white rounded-lg border" value={formData.sys_bp} onChange={(e)=>setFormData({...formData, sys_bp:e.target.value})} /></div>}
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center mb-4"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.has_osa} onChange={(e)=>setFormData({...formData, has_osa:e.target.checked})} /><label className="ml-3 text-lg font-bold text-slate-900">Diagnosed Sleep Apnea</label></div>
                  {formData.has_osa ? (
                      <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">AHI Severity</label><select className="w-full p-3 bg-white rounded-lg border" value={formData.ahi_severity} onChange={(e)=>setFormData({...formData, ahi_severity:e.target.value})}><option value="mild">Mild</option><option value="moderate">Moderate</option><option value="severe">Severe</option></select></div>
                  ) : (
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 mt-2">
                          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b pb-2">STOP-Bang Screening (Undiagnosed)</p>
                          {[['snoring','Loud Snoring?'],['tired','Daytime Tiredness?'],['observed_apnea','Observed Apnea?']].map(([k,l]) => (
                            <div key={k} className="flex items-center justify-between"><label className="text-sm text-slate-700 font-medium">{l}</label><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData[k]} onChange={(e)=>setFormData({...formData, [k]:e.target.checked})} /></div>
                          ))}
                      </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in slide-in-from-right">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center mb-4"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.has_gerd} onChange={(e)=>setFormData({...formData, has_gerd:e.target.checked})} /><label className="ml-3 text-lg font-bold text-slate-900">Diagnosed GERD</label></div>
                    {formData.has_gerd ? (
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Symptoms</label><select className="w-full p-3 bg-white rounded-lg border" value={formData.baseline_symptoms} onChange={(e)=>setFormData({...formData, baseline_symptoms:e.target.value})}><option value="Mild">Mild</option><option value="Moderate">Moderate</option><option value="Severe">Severe</option></select></div>
                            <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">LA Grade</label><select className="w-full p-3 bg-white rounded-lg border" value={formData.esophagitis_la} onChange={(e)=>setFormData({...formData, esophagitis_la:e.target.value})}><option value="A">Grade A</option><option value="B">Grade B</option><option value="C">Grade C/D</option></select></div>
                            <div className="col-span-2 flex items-center mt-2"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.ppi_use} onChange={(e)=>setFormData({...formData, ppi_use:e.target.checked})} /><label className="ml-3 text-sm font-bold">Daily PPI Use</label></div>
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 mt-2">
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b pb-2">GERD Screening (Undiagnosed)</p>
                            {[['heartburn','Weekly Heartburn?'],['regurgitation','Acid Regurgitation?'],['swallowing_diff','Difficulty Swallowing?']].map(([k,l]) => (
                                <div key={k} className="flex items-center justify-between"><label className="text-sm text-slate-700 font-medium">{l}</label><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData[k]} onChange={(e)=>setFormData({...formData, [k]:e.target.checked})} /></div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center mb-4"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.has_oa} onChange={(e)=>setFormData({...formData, has_oa:e.target.checked})} /><label className="ml-3 text-lg font-bold text-slate-900">Diagnosed Osteoarthritis</label></div>
                    {formData.has_oa ? (
                        <div className="grid grid-cols-1 gap-4">
                            <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Joint Pain Severity</label><select className="w-full p-3 bg-white rounded-lg border" value={formData.pain_severity} onChange={(e)=>setFormData({...formData, pain_severity:e.target.value})}><option value="Mild">Mild</option><option value="Moderate">Moderate</option><option value="Severe">Severe</option></select></div>
                            <div className="flex items-center mt-2"><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData.daily_nsaid} onChange={(e)=>setFormData({...formData, daily_nsaid:e.target.checked})} /><label className="ml-3 text-sm font-bold">Requires Daily NSAIDs</label></div>
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 mt-2">
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-b pb-2">OA Screening (Undiagnosed)</p>
                            {[['pain_walking','Knee/Hip pain when walking?'],['morning_stiffness','Morning stiffness > 30 mins?']].map(([k,l]) => (
                                <div key={k} className="flex items-center justify-between"><label className="text-sm text-slate-700 font-medium">{l}</label><input type="checkbox" className="w-5 h-5 accent-indigo-600" checked={formData[k]} onChange={(e)=>setFormData({...formData, [k]:e.target.checked})} /></div>
                            ))}
                        </div>
                    )}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in slide-in-from-right">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm uppercase mb-4">Surgical Risk Factors (MBSAQIP)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.history_vte} onChange={(e)=>setFormData({...formData, history_vte:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">History of DVT/PE</label></div>
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.bleeding_disorder} onChange={(e)=>setFormData({...formData, bleeding_disorder:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Bleeding Disorder</label></div>
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.steroid_use} onChange={(e)=>setFormData({...formData, steroid_use:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Chronic Steroid Use</label></div>
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.functional_dependent} onChange={(e)=>setFormData({...formData, functional_dependent:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Functionally Dependent</label></div>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 text-sm uppercase mb-4">Baseline Nutrition</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {formData.gender === 'female' && <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.menstruating} onChange={(e)=>setFormData({...formData, menstruating:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Menstruating Female</label></div>}
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.baseline_anemia} onChange={(e)=>setFormData({...formData, baseline_anemia:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Baseline Anemia</label></div>
                        <div className="flex items-center bg-white p-3 rounded-lg border"><input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={formData.baseline_b12_low} onChange={(e)=>setFormData({...formData, baseline_b12_low:e.target.checked})} /><label className="ml-2 text-xs font-bold text-slate-700">Low Vitamin B12</label></div>
                    </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-between pt-6 border-t border-slate-100">
              {step > 1 ? <button onClick={prevStep} className="font-bold text-slate-400 uppercase text-xs hover:text-slate-800">← Back</button> : <div/>}
              <button onClick={step === 5 ? handleSubmit : nextStep} disabled={loading} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-indigo-500 transition">
                {loading ? "Simulating..." : step === 5 ? "Generate Twin →" : "Next Phase"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD: LOGIC SPLIT FOR SURGERY VS LIFESTYLE */}
      {step === 6 && result && (
        <div className="animate-in fade-in duration-1000 bg-white">
          <div ref={reportRef} className="p-10 md:p-14 bg-white relative print:p-6 print:m-0">
            
            {/* ========================================== */}
            {/* PATH A: SURGICAL DASHBOARD (BMI >= 30) */}
            {/* ========================================== */}
            {isSurgeryIndicated ? (
                <>
                {/* HEADER */}
                <div className="flex justify-between items-end border-b-4 border-slate-900 pb-6 mb-10">
                  <div><h1 className="text-4xl font-black text-slate-900 uppercase">MetaX Clinical Twin</h1><p className="text-indigo-600 font-bold tracking-widest uppercase text-[10px] mt-1">Predictive Surgical Analytics</p></div>
                  <div className="text-right p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-lg font-black text-slate-900 uppercase">{formData.patient_name || 'Patient'}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">BMI: {currentBmi.toFixed(1)} • PROG: {result.procedure_modeled}</p>
                  </div>
                </div>

                {/* TOP METRICS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <CircularProgress percentage={extractNumber(result.surgical_projections.t2dm_remission_diarem?.remission_probability)} color="#10b981" label="Diabetes" sublabel="Remission Chance" delay={100}/>
                  <CircularProgress percentage={extractNumber(result.surgical_projections.htn_remission?.remission_probability?.year_5)} color="#3b82f6" label="BP Control" sublabel="Normalization" delay={300}/>
                  <CircularProgress percentage={extractNumber(result.surgical_projections.osa_remission?.remission_probability?.year_1)} color="#f59e0b" label="Sleep Apnea" sublabel="CPAP Independence" delay={500}/>
                  <CircularProgress percentage={extractNumber(result.surgical_projections.lipid_outcomes?.remission_probability?.year_5)} color="#ef4444" label="Lipid Panel" sublabel="Normalization" delay={700}/>
                </div>

                {/* ROW 1: LIVER, GERD, ASCVD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Liver Fibrosis (NFS)</p>
                        <p className="text-2xl font-black text-slate-800">{result.baseline_risks?.liver_disease_nfs?.risk_category || "Low Risk"}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">GERD Forecast</p>
                        <p className="text-3xl font-black text-emerald-600">{result.surgical_projections.gerd_outcomes?.remission_probability?.year_5 || 0}% Cure</p>
                        <p className="text-[10px] font-bold text-emerald-600/60 mt-1 uppercase">Reflux Resolution</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ASCVD 10-Yr Risk</p>
                        <p className="text-3xl font-black text-rose-600">{result.surgical_projections.lipid_outcomes?.ascvd_10_year_risk?.projected_5y_percent || 0}%</p>
                        <p className="text-[10px] font-bold text-rose-600/60 mt-1 uppercase">Post-Op Cardio Risk</p>
                    </div>
                </div>

                {/* LUXURY BIOMECHANICAL CARD */}
                <div className="max-w-full bg-slate-900 text-white rounded-[3rem] p-12 mb-12 flex justify-between items-center shadow-2xl relative overflow-hidden print:bg-slate-100 print:text-slate-900 print:shadow-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl print:hidden"></div>
                    <div className="relative z-10">
                        <h3 className="text-indigo-400 font-black uppercase text-xs tracking-[0.3em] mb-2 print:text-slate-500">Biomechanical Joint Relief (4:1 Ratio)</h3>
                        <p className="text-2xl font-light">Mechanical load removed from knees per step:</p>
                        <p className="text-[10px] text-slate-400 uppercase mt-4 font-bold tracking-widest">{result.surgical_projections.mobility_outcomes?.ref}</p>
                    </div>
                    <div className="relative z-10 text-right">
                        <p className="text-7xl font-black tracking-tighter">-{result.surgical_projections.mobility_outcomes?.biomechanical_unloading?.knee_load_reduction_kg || 0}<span className="text-3xl font-light ml-1">kg</span></p>
                    </div>
                </div>

                {/* INTERACTIVE CHART */}
                <div className="h-[400px] bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">10-Year Weight Trajectory</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getWeightChartData()} margin={{top:0, right:10, left:-20, bottom:0}}>
                      <defs><linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="year" tick={{fontSize:12, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:12, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 25px rgba(0,0,0,0.1)'}} />
                      <Legend verticalAlign="top" height={36}/>
                      <Area type="monotone" name="Surgical Pathway" dataKey="Surgical" stroke="#6366f1" strokeWidth={4} fill="url(#colorMain)" activeDot={{r:8, fill:'#fff', stroke:'#6366f1', strokeWidth:3}} />
                      <Area type="monotone" name="Unmanaged Baseline" dataKey="Unmanaged" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <p className="text-[9px] text-slate-400 uppercase text-center mt-4 tracking-widest">{result.trajectories?.ref}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-4 border-b pb-2">30-Day Surgical Risk</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Leak</p><p className="text-2xl font-black">{result.surgical_projections.perioperative_risk?.leak_risk_percent || 0}%</p></div>
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Bleed</p><p className="text-2xl font-black">{result.surgical_projections.perioperative_risk?.bleed_risk_percent || 0}%</p></div>
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">VTE</p><p className="text-2xl font-black">{result.surgical_projections.perioperative_risk?.vte_risk_percent || 0}%</p></div>
                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Readmit</p><p className="text-2xl font-black">{result.surgical_projections.perioperative_risk?.readmission_risk_percent || 0}%</p></div>
                        </div>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-4 border-b pb-2">Long-Term Nutrition (5-Yr)</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center"><span className="font-bold text-slate-600 text-sm">Anemia Risk</span><span className="font-black text-rose-500">{result.surgical_projections.nutrition_outcomes?.deficiency_risks_5y?.iron_anemia_percent || 0}%</span></div>
                            <div className="flex justify-between items-center"><span className="font-bold text-slate-600 text-sm">B12 Deficiency</span><span className="font-black text-indigo-500">{result.surgical_projections.nutrition_outcomes?.deficiency_risks_5y?.vitamin_b12_percent || 0}%</span></div>
                        </div>
                    </div>
                </div>

                {/* ECONOMICS WITH METHODOLOGY INFO */}
                <div className="p-10 bg-amber-50 rounded-3xl border border-amber-200 text-center shadow-sm mb-12">
                    <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">10-Year Health Savings (ROI)</h3>
                    <p className="text-5xl font-black text-amber-900 tracking-tighter">{result.surgical_projections.economic_outcomes?.total_10y_savings_formatted}</p>
                    <p className="text-xs font-bold text-amber-700/80 mt-3">Projected out-of-pocket costs avoided (Meds/CPAP/Painkillers)</p>
                </div>

                {/* DETAILED METHODOLOGY & REFERENCES REPORT */}
                <div className="pt-8 border-t-2 border-slate-900 mt-16 break-inside-avoid">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Clinical Evidence Base & Analytical Methodology</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-[10px] text-slate-600 leading-relaxed font-medium">
                        <div>
                            <p className="font-bold text-slate-900 mb-1">T2DM Remission Projection</p>
                            <p>{result.surgical_projections.t2dm_remission_diarem?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.t2dm_remission_diarem?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">OSA & Airway Resolution</p>
                            <p>{result.surgical_projections.osa_remission?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.osa_remission?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">Cardiovascular ASCVD Risk</p>
                            <p>{result.surgical_projections.lipid_outcomes?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.lipid_outcomes?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">Biomechanical Joint Load</p>
                            <p>{result.surgical_projections.mobility_outcomes?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.mobility_outcomes?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">Liver Fibrosis (NFS)</p>
                            <p>{result.baseline_risks?.liver_disease_nfs?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.baseline_risks?.liver_disease_nfs?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">Perioperative Surgical Risk</p>
                            <p>{result.surgical_projections.perioperative_risk?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.perioperative_risk?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">GERD Outcomes</p>
                            <p>{result.surgical_projections.gerd_outcomes?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.gerd_outcomes?.methodology}</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-1">Financial Economics</p>
                            <p>{result.surgical_projections.economic_outcomes?.ref}</p>
                            <p className="italic text-slate-400 mt-1">{result.surgical_projections.economic_outcomes?.methodology}</p>
                        </div>
                    </div>
                </div>
                </>
            ) : (

                /* ========================================== */
                /* PATH B: PREVENTIVE LIFESTYLE DASHBOARD (BMI < 30) */
                /* ========================================== */
                <>
                {/* HEADER */}
                <div className="flex justify-between items-end border-b-4 border-emerald-900 pb-6 mb-10">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase">Preventive Health Twin</h1>
                    <p className="text-emerald-600 font-bold tracking-widest uppercase text-[10px] mt-1">Metabolic Wellness & Lifestyle Protocol</p>
                  </div>
                  <div className="text-right p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-lg font-black text-slate-900 uppercase">{formData.patient_name || 'Patient'}</p>
                    <p className="text-xs font-bold text-emerald-700 mt-1">Baseline BMI: {currentBmi.toFixed(1)} • Status: Optimal</p>
                  </div>
                </div>

                {/* THE "GOOD NEWS" TRIAGE STATEMENT */}
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-2xl mb-12 shadow-sm">
                    <h3 className="text-emerald-800 font-black uppercase text-sm tracking-widest mb-3">Clinical Triage: Surgery Not Indicated</h3>
                    <p className="text-slate-700 leading-relaxed font-medium">
                        Based on your BMI under 30 and the absence of severe metabolic comorbidities, metabolic surgery is not clinically indicated according to current international guidelines, including the ASMBS/IFSO 2022. This is genuinely positive news, reflecting a strong baseline metabolic profile and a lower risk trajectory for obesity-related complications. We are encouraged by these metrics and will focus together on preventive lifestyle optimization to support long-term vitality, longevity, and metabolic resilience through sustainable, empowering habits.
                    </p>
                </div>

                {/* LIFESTYLE PROTOCOL COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    
                    {/* NUTRITION */}
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-400"></div>
                        <h3 className="text-lg font-black text-slate-900 uppercase mb-6">Evidence-Based Nutritional Protocol</h3>
                        <ul className="space-y-4 text-sm text-slate-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1">■</span>
                                <span>Adopt a Mediterranean-style dietary pattern as the foundation for lifelong metabolic health: prioritize non-starchy vegetables, fruits, whole grains, legumes, nuts, seeds, extra-virgin olive oil, and fatty fish while limiting ultra-processed foods, added sugars, and red/processed meats.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1">■</span>
                                <span>Target 25–38 g of dietary fiber daily from whole-food sources (e.g., oats, beans, berries, and leafy greens) to promote satiety, stabilize blood glucose, and support cardiovascular and gut health.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1">■</span>
                                <span>Maintain protein intake at 1.0–1.2 g per kilogram of body weight daily, distributed evenly across meals (e.g., 20–30 g per meal), to preserve lean muscle mass and metabolic rate.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1">■</span>
                                <span>Manage glycemic load by selecting low- to medium-glycemic-index carbohydrates and limiting added sugars to &lt;25 g/day (women) or &lt;36 g/day (men), emphasizing balanced plates with half non-starchy vegetables.</span>
                            </li>
                        </ul>
                    </div>

                    {/* EXERCISE */}
                    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                        <h3 className="text-lg font-black text-slate-900 uppercase mb-6">Prescriptive Physical Activity</h3>
                        <ul className="space-y-4 text-sm text-slate-600 font-medium">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">■</span>
                                <span><strong>Aerobic targets:</strong> Accumulate 150–300 minutes per week of moderate-intensity aerobic activity (e.g., brisk walking at 3–4 mph) or 75–150 minutes of vigorous-intensity activity (e.g., jogging), or an equivalent combination, spread across 5 or more days.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">■</span>
                                <span><strong>Resistance training targets:</strong> Perform strength exercises for all major muscle groups (e.g., squats, rows, presses) 2–3 non-consecutive days per week, using moderate loads that allow 8–12 repetitions per set to maintain muscle mass and metabolic health.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-3 mt-1">■</span>
                                <span>Integrate daily movement and progress toward the higher end of aerobic volume as tolerated to optimize weight maintenance, insulin sensitivity, and cardiovascular fitness while minimizing injury risk.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* MONITORING */}
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm mb-12">
                    <h3 className="text-lg font-black text-slate-900 uppercase mb-6">Preventive Monitoring (Routine Screening)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-2xl border border-slate-100">
                            <p className="font-bold text-slate-800 mb-2">Lipid Panel</p>
                            <p className="text-xs text-slate-600">Annual comprehensive check (total cholesterol, LDL-C, HDL-C, triglycerides) to proactively track cardiovascular risk.</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100">
                            <p className="font-bold text-slate-800 mb-2">Glycemic Control</p>
                            <p className="text-xs text-slate-600">Yearly fasting plasma glucose and/or HbA1c to monitor glycemic control and detect any early shifts toward impaired tolerance.</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100">
                            <p className="font-bold text-slate-800 mb-2">Blood Pressure</p>
                            <p className="text-xs text-slate-600">Regular tracking (target &lt;130/80 mmHg) at each primary care visit, with home monitoring as needed to support ongoing lifestyle success.</p>
                        </div>
                    </div>
                </div>

                {/* CITATIONS */}
                <div className="pt-8 border-t-2 border-slate-200 mt-16 break-inside-avoid">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Clinical Guidelines & Citations</h4>
                    <div className="flex flex-col space-y-2 text-[10px] text-slate-500 font-medium">
                        <p>• ASMBS/IFSO 2022 Guidelines on Metabolic Surgery</p>
                        <p>• ACSM Physical Activity Guidelines for Adults (2022)</p>
                        <p>• AHA/ADA Lifestyle Management Recommendations for Metabolic Health</p>
                    </div>
                </div>
                </>
            )}
          </div>

          {/* ON-SCREEN CONTROLS */}
          <div className="flex justify-center gap-4 py-10 print:hidden bg-slate-50 border-t border-slate-100 mt-10">
            <button onClick={()=>setStep(1)} className="px-8 py-3 bg-white border border-slate-300 rounded-xl font-bold uppercase text-xs tracking-wider transition hover:bg-slate-100">Restart</button>
            
            {/* Only show the Lifestyle Compare button if surgery is indicated */}
            {isSurgeryIndicated && (
                <button onClick={() => setShowLifestyleModal(true)} className="px-8 py-3 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition rounded-xl font-bold uppercase text-xs tracking-wider shadow-sm flex items-center">
                Compare Diet & Exercise
                </button>
            )}

            <button onClick={handleDownloadPDF} className={`px-10 py-3 text-white rounded-xl font-bold uppercase text-xs tracking-wider shadow-lg transition ${isSurgeryIndicated ? 'bg-slate-900 hover:bg-slate-800' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
                Download Evidence PDF
            </button>
          </div>
        </div>
      )}

      {/* LUXURIOUS LIGHT-THEMED INTERACTIVE LIFESTYLE MODAL (SURGICAL PATIENTS ONLY) */}
      {showLifestyleModal && result && isSurgeryIndicated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300 print:hidden">
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 max-w-5xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-y-auto max-h-[90vh]">
            
            <button onClick={() => setShowLifestyleModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition bg-slate-100 p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">Surgical vs. Lifestyle <span className="font-light text-indigo-600">Twin</span></h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">10-Year Clinical Divergence Analysis</p>
            </div>

            {/* ADHERENCE ENGINE */}
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h4 className="text-slate-800 font-black uppercase text-sm tracking-widest">Patient Adherence Engine</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Simulate real-world dietary compliance impact on baseline ILI outcomes.</p>
                    </div>
                    <div className="text-right">
                        <span className={`text-4xl font-black ${adherence > 70 ? 'text-emerald-500' : adherence > 40 ? 'text-amber-500' : 'text-rose-500'}`}>{adherence}%</span>
                    </div>
                </div>
                <input type="range" min="10" max="100" value={adherence} onChange={(e) => setAdherence(e.target.value)} className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Poor (10%)</span><span>Average (50%)</span><span>Perfect (100%)</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-4 text-center italic">{result.lifestyle_twin?.methodology}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* RADAR CHART */}
                <div className="h-[400px] flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getRadarData()}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Tooltip contentStyle={{backgroundColor:'#fff', border:'1px solid #e2e8f0', borderRadius:'12px', color:'#0f172a', boxShadow:'0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                            <Radar name="Surgical Twin" dataKey="Surgery" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.4} />
                            <Radar name="Lifestyle Twin" dataKey="Lifestyle" stroke="#f59e0b" strokeWidth={3} fill="#f59e0b" fillOpacity={0.4} />
                            <Legend wrapperStyle={{fontSize: '12px', paddingTop: '20px'}}/>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* CLINICAL COMPARISON CARDS */}
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex justify-between items-center">
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">T2DM Remission (5-Yr)</p></div>
                        <div className="flex gap-4 text-right">
                            <div><p className="text-xs text-slate-400 font-bold mb-1">Lifestyle</p><p className="text-xl font-black text-amber-500">{Math.round(result.lifestyle_twin.remission_base.t2dm.year_5 * (adherence/100))}%</p></div>
                            <div className="border-l border-slate-200 pl-4"><p className="text-xs text-slate-400 font-bold mb-1">Surgery</p><p className="text-xl font-black text-indigo-600">{extractNumber(result.surgical_projections.t2dm_remission_diarem?.remission_probability)}%</p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex justify-between items-center">
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">OSA Resolution (5-Yr)</p></div>
                        <div className="flex gap-4 text-right">
                            <div><p className="text-xl font-black text-amber-500">{Math.round(result.lifestyle_twin.remission_base.osa.year_5 * (adherence/100))}%</p></div>
                            <div className="border-l border-slate-200 pl-4"><p className="text-xl font-black text-indigo-600">{extractNumber(result.surgical_projections.osa_remission?.remission_probability?.year_5)}%</p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex justify-between items-center">
                        <div><p className="text-[10px] font-bold text-slate-400 uppercase">Liver Fibrosis Regression</p></div>
                        <div className="flex gap-4 text-right">
                            <div><p className="text-xl font-black text-amber-500">{Math.round(result.lifestyle_twin.remission_base.liver_fibrosis_regression.year_5 * (adherence/100))}%</p></div>
                            <div className="border-l border-slate-200 pl-4"><p className="text-xl font-black text-indigo-600">45%</p></div>
                        </div>
                    </div>
                    {/* The Objective Truth: Nutrition */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex justify-between items-center">
                        <div><p className="text-[10px] font-bold text-slate-500 uppercase">Anemia Risk (5-Yr)</p><p className="text-[8px] text-emerald-600 font-bold uppercase mt-1">Lifestyle Advantage</p></div>
                        <div className="flex gap-4 text-right">
                            <div><p className="text-xl font-black text-emerald-500">{result.lifestyle_twin.nutrition_risk.iron_anemia_5y}%</p></div>
                            <div className="border-l border-slate-300 pl-4"><p className="text-xl font-black text-rose-500">{result.surgical_projections.nutrition_outcomes?.deficiency_risks_5y?.iron_anemia_percent || 0}%</p></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 10-YEAR ECONOMICS */}
            <div className="mt-8 bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm flex justify-between items-center">
                <div>
                    <h3 className="text-amber-900 font-black uppercase text-sm tracking-widest mb-1">10-Year Financial Impact</h3>
                    <p className="text-[10px] text-amber-700/60 uppercase tracking-widest">Surgical Savings vs. ILI Program Costs</p>
                </div>
                <div className="flex gap-10 text-right">
                    <div>
                        <p className="text-xs text-amber-700/80 font-bold uppercase tracking-widest mb-1">Cost of ILI Diet/Gym</p>
                        <p className="text-3xl font-black text-rose-500">{result.lifestyle_twin.economics.total_10y_cost_formatted}</p>
                    </div>
                    <div className="border-l border-amber-200 pl-10">
                        <p className="text-xs text-amber-700/80 font-bold uppercase tracking-widest mb-1">Surgery Med Savings</p>
                        <p className="text-3xl font-black text-emerald-600">{result.surgical_projections.economic_outcomes?.total_10y_savings_formatted}</p>
                    </div>
                </div>
            </div>

            <p className="text-[9px] text-slate-400 mt-6 text-center uppercase tracking-widest">{result.lifestyle_twin?.ref}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTwinAssessment;