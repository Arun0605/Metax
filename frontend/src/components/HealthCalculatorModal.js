import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { AlertCircle, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import LeadCaptureForm from './LeadCaptureForm';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HealthCalculatorModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    biological_sex: '',
    height_cm: '',
    weight_kg: '',
    waist_circumference_cm: '',
    has_diabetes: false,
    has_hypertension: false,
    has_sleep_apnea: false
  });
  const [result, setResult] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleClose = () => {
    setStep(1);
    setFormData({
      age: '',
      biological_sex: '',
      height_cm: '',
      weight_kg: '',
      waist_circumference_cm: '',
      has_diabetes: false,
      has_hypertension: false,
      has_sleep_apnea: false
    });
    setResult(null);
    setAssessmentId(null);
    setShowLeadForm(false);
    onClose();
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const calculateAssessment = async () => {
    try {
      // Prepare data with proper type conversions
      const payload = {
        age: parseInt(formData.age),
        biological_sex: formData.biological_sex,
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        waist_circumference_cm: formData.waist_circumference_cm ? parseFloat(formData.waist_circumference_cm) : null,
        has_diabetes: formData.has_diabetes,
        has_hypertension: formData.has_hypertension,
        has_sleep_apnea: formData.has_sleep_apnea
      };
      
      const response = await axios.post(`${API}/assessment/calculate`, payload);
      setResult(response.data);
      // Use assessment ID from response for lead capture
      setAssessmentId(response.data.assessment_id);
      setStep(4);
    } catch (error) {
      console.error('Error calculating assessment:', error);
      if (error.response?.data?.detail) {
        toast.error(`Validation error: ${JSON.stringify(error.response.data.detail)}`);
      } else {
        toast.error('Failed to calculate assessment. Please try again.');
      }
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.age || !formData.biological_sex || !formData.height_cm || !formData.weight_kg) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (formData.age < 18 || formData.age > 120) {
        toast.error('Please enter a valid age between 18 and 120');
        return;
      }
      if (formData.height_cm < 100 || formData.height_cm > 250) {
        toast.error('Please enter a valid height between 100 and 250 cm');
        return;
      }
      if (formData.weight_kg < 30 || formData.weight_kg > 300) {
        toast.error('Please enter a valid weight between 30 and 300 kg');
        return;
      }
    }
    
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      calculateAssessment();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  const getRiskIcon = () => {
    if (!result) return null;
    if (result.risk_zone === 'green') return <CheckCircle className="w-16 h-16" style={{color: '#10B981'}} />;
    if (result.risk_zone === 'yellow') return <AlertTriangle className="w-16 h-16" style={{color: '#F59E0B'}} />;
    return <AlertCircle className="w-16 h-16" style={{color: '#F43F5E'}} />;
  };

  const getRiskColor = () => {
    if (!result) return '#64748B';
    if (result.risk_zone === 'green') return '#10B981';
    if (result.risk_zone === 'yellow') return '#F59E0B';
    return '#F43F5E';
  };

  const progress = (step / 4) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="health-calculator-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-manrope text-slate-navy">
            Health Risk Assessment
          </DialogTitle>
        </DialogHeader>

        {step < 4 && (
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-slate-800 mt-2">Step {step} of 3</p>
          </div>
        )}

        {/* Step 1: Basic Metrics */}
        {step === 1 && (
          <div className="space-y-6" data-testid="step-basic-metrics">
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                data-testid="input-age"
                value={formData.age}
                onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                placeholder="Enter your age"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Biological Sex *</Label>
              <RadioGroup
                value={formData.biological_sex}
                onValueChange={(value) => updateFormData('biological_sex', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" data-testid="radio-male" />
                  <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" data-testid="radio-female" />
                  <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="height">Height (cm) *</Label>
              <Input
                id="height"
                type="number"
                data-testid="input-height"
                value={formData.height_cm}
                onChange={(e) => updateFormData('height_cm', parseFloat(e.target.value))}
                placeholder="e.g., 170"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                data-testid="input-weight"
                value={formData.weight_kg}
                onChange={(e) => updateFormData('weight_kg', parseFloat(e.target.value))}
                placeholder="e.g., 75"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="waist">Waist Circumference (cm)</Label>
              <Input
                id="waist"
                type="number"
                data-testid="input-waist"
                value={formData.waist_circumference_cm}
                onChange={(e) => updateFormData('waist_circumference_cm', parseFloat(e.target.value))}
                placeholder="Optional"
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Step 2: Comorbidities */}
        {step === 2 && (
          <div className="space-y-6" data-testid="step-comorbidities">
            <p className="text-slate-800">Do you have any of the following conditions?</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="diabetes" className="font-normal cursor-pointer">
                  Type 2 Diabetes
                </Label>
                <input
                  id="diabetes"
                  type="checkbox"
                  data-testid="checkbox-diabetes"
                  checked={formData.has_diabetes}
                  onChange={(e) => updateFormData('has_diabetes', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="hypertension" className="font-normal cursor-pointer">
                  Hypertension (High Blood Pressure)
                </Label>
                <input
                  id="hypertension"
                  type="checkbox"
                  data-testid="checkbox-hypertension"
                  checked={formData.has_hypertension}
                  onChange={(e) => updateFormData('has_hypertension', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="sleep_apnea" className="font-normal cursor-pointer">
                  Obstructive Sleep Apnea
                </Label>
                <input
                  id="sleep_apnea"
                  type="checkbox"
                  data-testid="checkbox-sleep-apnea"
                  checked={formData.has_sleep_apnea}
                  onChange={(e) => updateFormData('has_sleep_apnea', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6" data-testid="step-confirmation">
            <p className="text-slate-800">Please review your information:</p>
            
            <div className="bg-warm-sand p-6 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-800">Age:</span>
                <span className="font-medium text-slate-navy">{formData.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-800">Sex:</span>
                <span className="font-medium text-slate-navy capitalize">{formData.biological_sex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-800">Height:</span>
                <span className="font-medium text-slate-navy">{formData.height_cm} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-800">Weight:</span>
                <span className="font-medium text-slate-navy">{formData.weight_kg} kg</span>
              </div>
              {formData.waist_circumference_cm && (
                <div className="flex justify-between">
                  <span className="text-slate-800">Waist:</span>
                  <span className="font-medium text-slate-navy">{formData.waist_circumference_cm} cm</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-300">
                <span className="text-slate-800">Health Conditions:</span>
                <div className="mt-2 space-y-1">
                  {formData.has_diabetes && <p className="text-sm">• Type 2 Diabetes</p>}
                  {formData.has_hypertension && <p className="text-sm">• Hypertension</p>}
                  {formData.has_sleep_apnea && <p className="text-sm">• Sleep Apnea</p>}
                  {!formData.has_diabetes && !formData.has_hypertension && !formData.has_sleep_apnea && (
                    <p className="text-sm text-slate-500">None selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && result && !showLeadForm && (
          <div className="space-y-6" data-testid="step-results">
            <div className="flex flex-col items-center text-center py-6">
              {getRiskIcon()}
              <h3 className="text-2xl font-manrope font-medium mt-4" style={{color: getRiskColor()}}>
                {result.risk_zone.toUpperCase()} ZONE
              </h3>
              <p className="text-3xl font-bold text-slate-navy mt-2">BMI: {result.bmi}</p>
            </div>

            <div className="bg-warm-sand p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-slate-navy mb-2">Assessment:</h4>
                <p className="text-slate-700">{result.risk_message}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-navy mb-2">Recommendation:</h4>
                <p className="text-slate-700 leading-relaxed">{result.recommendation}</p>
              </div>
            </div>

            {result.show_lead_form && (
              <div className="bg-soft-blue p-6 rounded-lg">
                <p className="text-slate-700 mb-4">
                  Based on your assessment, we recommend scheduling a consultation with our surgical team. 
                  Would you like us to contact you?
                </p>
                <Button
                  data-testid="show-lead-form-button"
                  onClick={() => setShowLeadForm(true)}
                  className="w-full bg-slate-navy text-white hover:bg-slate-800"
                >
                  Yes, Schedule a Consultation
                </Button>
              </div>
            )}

            <p className="text-xs text-slate-500 text-center italic">
              *This assessment is for informational purposes only and does not constitute medical advice. 
              Please consult with a qualified healthcare provider for proper evaluation and treatment.
            </p>
          </div>
        )}

        {/* Lead Capture Form */}
        {step === 4 && showLeadForm && (
          <LeadCaptureForm
            assessmentId={assessmentId}
            onSuccess={handleClose}
            onBack={() => setShowLeadForm(false)}
          />
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex gap-4 mt-6">
            {step > 1 && (
              <Button
                data-testid="prev-button"
                onClick={prevStep}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <Button
              data-testid="next-button"
              onClick={nextStep}
              className="flex-1 bg-slate-navy text-white hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              {step === 3 ? 'Calculate Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {step === 4 && !result?.show_lead_form && (
          <Button
            data-testid="close-button"
            onClick={handleClose}
            className="w-full bg-slate-navy text-white hover:bg-slate-800"
          >
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HealthCalculatorModal;