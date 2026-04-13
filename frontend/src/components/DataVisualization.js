import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLORS = ['#10B981', '#F59E0B', '#0EA5E9'];

const DataVisualization = () => {
  const [comorbidityData, setComorbidityData] = useState([]);
  const [weightLossData, setWeightLossData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [comorbidityRes, weightLossRes] = await Promise.all([
        axios.get(`${API}/stats/comorbidity`),
        axios.get(`${API}/stats/weight-loss`)
      ]);
      
      setComorbidityData(
        comorbidityRes.data.map(item => ({
          name: item.condition,
          value: item.remission_rate
        }))
      );
      
      setWeightLossData(weightLossRes.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-navy">{payload[0].name}</p>
          <p className="text-sm text-slate-800">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-navy mb-1">Month {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}% EWL
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-24 bg-warm-sand" data-testid="data-visualization">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-manrope font-normal tracking-tight text-slate-navy mb-4">
            Evidence-Based Outcomes
          </h2>
          <p className="text-base md:text-lg text-slate-800 max-w-2xl mx-auto">
            Clinical data demonstrating the effectiveness of bariatric surgery
          </p>
          <p className="text-sm text-slate-800 mt-4 italic">
            *Data represents typical outcomes from peer-reviewed bariatric surgery studies. Individual results may vary. Consult a healthcare professional for personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Comorbidity Resolution Chart */}
          <div className="glass-card rounded-2xl p-8 scroll-reveal" data-testid="comorbidity-chart">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center">
                <Activity className="w-5 h-5 text-slate-navy" />
              </div>
              <h3 className="text-xl font-manrope font-medium text-slate-navy">
                Comorbidity Resolution Post-Surgery
              </h3>
            </div>
            
            {comorbidityData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={comorbidityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {comorbidityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm text-slate-700">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Weight Loss Projection Chart */}
          <div className="glass-card rounded-2xl p-8 scroll-reveal" data-testid="weight-loss-chart">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-slate-navy" />
              </div>
              <h3 className="text-xl font-manrope font-medium text-slate-navy">
                Weight Loss: Surgery vs. Lifestyle
              </h3>
            </div>
            
            {weightLossData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightLossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                    stroke="#64748B"
                  />
                  <YAxis 
                    label={{ value: '% Excess Weight Loss', angle: -90, position: 'insideLeft' }}
                    stroke="#64748B"
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    formatter={(value) => <span className="text-sm text-slate-700">{value === 'surgery' ? 'Bariatric Surgery' : 'Lifestyle Management'}</span>}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="surgery" 
                    stroke="#0F172A" 
                    strokeWidth={3}
                    dot={{ fill: '#0F172A', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lifestyle" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;