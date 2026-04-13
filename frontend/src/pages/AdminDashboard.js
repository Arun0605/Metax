import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const getComorbidityCount = (lead) => {
    let count = 0;
    if (lead.has_diabetes) count++;
    if (lead.has_hypertension) count++;
    if (lead.has_sleep_apnea) count++;
    return count;
  };

  const stats = {
    total: leads.length,
    highRisk: leads.filter(l => l.risk_zone === 'red').length,
    mediumRisk: leads.filter(l => l.risk_zone === 'yellow').length,
  };

  return (
    <div className="min-h-screen bg-warm-sand">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <button
              data-testid="back-to-home-button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-900 hover:text-slate-navy transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-manrope font-light tracking-tight text-slate-navy">
              Patient Leads Dashboard
            </h1>
            <p className="text-slate-900 mt-2 text-lg">Triage and manage consultation requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6" data-testid="total-leads-stat">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-soft-blue flex items-center justify-center">
                <Users className="w-6 h-6 text-slate-navy" />
              </div>
              <div>
                <p className="text-sm text-slate-900">Total Leads</p>
                <p className="text-3xl font-semibold text-slate-navy">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6" data-testid="high-risk-stat">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full" style={{backgroundColor: '#FEE2E2'}}>
                <AlertCircle className="w-6 h-6 m-3" style={{color: '#991B1B'}} />
              </div>
              <div>
                <p className="text-sm text-slate-900">High Risk (Red)</p>
                <p className="text-3xl font-semibold text-slate-navy">{stats.highRisk}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6" data-testid="medium-risk-stat">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full" style={{backgroundColor: '#FEF3C7'}}>
                <TrendingUp className="w-6 h-6 m-3" style={{color: '#92400E'}} />
              </div>
              <div>
                <p className="text-sm text-slate-900">Medium Risk (Yellow)</p>
                <p className="text-3xl font-semibold text-slate-navy">{stats.mediumRisk}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="glass-card rounded-2xl p-8" data-testid="leads-table-container">
          <h2 className="text-2xl font-manrope font-normal text-slate-navy mb-6">All Consultation Requests</h2>
          
          {loading ? (
            <div className="text-center py-12 text-slate-900">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12 text-slate-900">No leads captured yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Preferred Time</th>
                    <th>BMI</th>
                    <th>Risk Zone</th>
                    <th>Comorbidities</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} data-testid={`lead-row-${lead.id}`}>
                      <td className="font-medium text-slate-navy">{lead.name}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.preferred_callback_time}</td>
                      <td className="font-semibold">{lead.bmi}</td>
                      <td>
                        <span className={`risk-badge ${lead.risk_zone}`} data-testid={`risk-badge-${lead.risk_zone}`}>
                          {lead.risk_zone.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-col gap-1 text-sm">
                          {lead.has_diabetes && <span>• Type 2 Diabetes</span>}
                          {lead.has_hypertension && <span>• Hypertension</span>}
                          {lead.has_sleep_apnea && <span>• Sleep Apnea</span>}
                          {getComorbidityCount(lead) === 0 && <span className="text-slate-400">None</span>}
                        </div>
                      </td>
                      <td className="text-sm text-slate-900">
                        {new Date(lead.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;