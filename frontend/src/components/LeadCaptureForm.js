import React, { useState } from 'react';
import axios from 'axios';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LeadCaptureForm = ({ assessmentId, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferred_callback_time: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.preferred_callback_time) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API}/leads`, {
        assessment_id: assessmentId,
        ...formData
      });
      
      toast.success('Thank you! We will contact you soon.');
      onSuccess();
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="lead-capture-form">
      <div className="bg-soft-blue p-6 rounded-lg mb-6">
        <h3 className="font-manrope font-medium text-slate-navy mb-2">
          Schedule Your Consultation
        </h3>
        <p className="text-sm text-slate-600">
          Please provide your contact information and our team will reach out to schedule a comprehensive consultation.
        </p>
      </div>

      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          data-testid="lead-input-name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your full name"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          data-testid="lead-input-phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter your phone number"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor="callback_time">Preferred Callback Time *</Label>
        <Input
          id="callback_time"
          type="text"
          data-testid="lead-input-callback-time"
          value={formData.preferred_callback_time}
          onChange={(e) => setFormData(prev => ({ ...prev, preferred_callback_time: e.target.value }))}
          placeholder="e.g., Weekday mornings, Afternoons"
          className="mt-1"
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          data-testid="lead-back-button"
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          type="submit"
          data-testid="lead-submit-button"
          disabled={submitting}
          className="flex-1 bg-slate-navy text-white hover:bg-slate-800 flex items-center justify-center gap-2"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default LeadCaptureForm;