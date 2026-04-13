import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LifestylePage from './pages/LifestylePage';
import MedicalPage from './pages/MedicalPage';
import SurgicalPage from './pages/SurgicalPage';
// 1. We import your new page here!
import DigitalTwinPage from './pages/DigitalTwinPage'; 
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/medical" element={<MedicalPage />} />
          <Route path="/surgical" element={<SurgicalPage />} />
          {/* 2. We add the official route here! */}
          <Route path="/digital-twin" element={<DigitalTwinPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;