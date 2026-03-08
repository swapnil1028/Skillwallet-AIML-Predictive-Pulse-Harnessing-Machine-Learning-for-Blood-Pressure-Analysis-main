import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Switch';
import { analyzePulse } from '../services/api';
import { savePrediction } from '../services/historyService';
import { Activity, User, Heart, AlertCircle, Clock, Stethoscope, FileText, Pill, Eye, Droplet, Coffee } from 'lucide-react';
import './PredictionDashboard.css';

export const PredictionDashboard = () => {
  const [formData, setFormData] = useState({
    // Demographics
    age: '18-34',
    gender: 'Male',
    
    // Clinical Vitals (Categorical)
    systolic: '100 - 110',
    diastolic: '70 - 80',
    
    // Clinical Details
    severity: 'Mild',
    whenDiagnosed: '<1 Year',
    
    // Medical History (Booleans)
    history: false,
    takeMedication: false,
    breathShortness: false,
    visualChanges: false,
    noseBleeding: false,
    controlledDiet: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const prediction = await analyzePulse(formData);
      setResult(prediction);
      
      // Save to history
      savePrediction(formData, prediction);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Helper for Switch toggles
  const handleToggle = (name) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>New Patient Analysis</h2>
        <p className="subtitle">Enter comprehensive vital statistics for precision ML modeling.</p>
      </header>

      <div className="dashboard-grid">
        {/* Input Form Column */}
        <div className="form-column">
          <Card glass>
            
            <form onSubmit={handleSubmit} className="prediction-form">
              {/* Section 1: Demographics */}
              <h3 className="section-title"><User size={18}/> Demographics</h3>
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Age Range</label>
                  <select className="premium-input premium-select" name="age" value={formData.age} onChange={handleChange}>
                    <option value="18-34">18-34</option>
                    <option value="35-50">35-50</option>
                    <option value="51-64">51-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Gender</label>
                  <select className="premium-input premium-select" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Clinical Vitals */}
              <h3 className="section-title mt-4"><Stethoscope size={18}/> Clinical Readings</h3>
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Systolic (mmHg)</label>
                  <select className="premium-input premium-select" name="systolic" value={formData.systolic} onChange={handleChange}>
                    <option value="100 - 110">100 - 110</option>
                    <option value="111 - 120">111 - 120</option>
                    <option value="121 - 130">121 - 130</option>
                    <option value="130+">130+</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Diastolic (mmHg)</label>
                  <select className="premium-input premium-select" name="diastolic" value={formData.diastolic} onChange={handleChange}>
                    <option value="70 - 80">70 - 80</option>
                    <option value="81 - 90">81 - 90</option>
                    <option value="91 - 100">91 - 100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Severity Assessment</label>
                  <select className="premium-input premium-select" name="severity" value={formData.severity} onChange={handleChange}>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Sever">Severe</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Time Since Diagnosis</label>
                  <select className="premium-input premium-select" name="whenDiagnosed" value={formData.whenDiagnosed} onChange={handleChange}>
                    <option value="<1 Year">&lt;1 Year</option>
                    <option value="1 - 5 Years">1 - 5 Years</option>
                    <option value=">5 Years">&gt;5 Years</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Medical History Switches */}
              <h3 className="section-title mt-4"><Activity size={18}/> Symptoms & History</h3>
              <div className="switches-grid">
                <Switch 
                  label="Family History of Hypertension" 
                  name="history" 
                  checked={formData.history} 
                  onChange={() => handleToggle('history')} 
                />
                <Switch 
                  label="Currently taking medication" 
                  name="takeMedication" 
                  checked={formData.takeMedication} 
                  onChange={() => handleToggle('takeMedication')} 
                />
                <Switch 
                  label="Experiencing shortness of breath" 
                  name="breathShortness" 
                  checked={formData.breathShortness} 
                  onChange={() => handleToggle('breathShortness')} 
                />
                <Switch 
                  label="Experiencing visual changes" 
                  name="visualChanges" 
                  checked={formData.visualChanges} 
                  onChange={() => handleToggle('visualChanges')} 
                />
                <Switch 
                  label="History of nose bleeding" 
                  name="noseBleeding" 
                  checked={formData.noseBleeding} 
                  onChange={() => handleToggle('noseBleeding')} 
                />
                <Switch 
                  label="Following controlled diet" 
                  name="controlledDiet" 
                  checked={formData.controlledDiet} 
                  onChange={() => handleToggle('controlledDiet')} 
                />
              </div>

              <div className="form-actions mt-6">
                <Button type="submit" loading={loading} className="w-full analyze-btn">
                  Initialize Neural Analysis
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Results / Visualization Column */}
        <div className="results-column sticky-results">
          <Card 
            glass 
            className={`result-card ${result ? 'has-result' : ''}`}
            style={{ 
              borderColor: result ? result.color : 'var(--border-light)',
              boxShadow: result ? `0 0 30px ${result.color}33` : 'var(--shadow-sm)'
            }}
          >
            {!result && !loading && (
              <div className="empty-state">
                <div className="pulse-ring-idle"></div>
                <p>Awaiting comprehensive patient telemetry...</p>
              </div>
            )}

            {loading && (
              <div className="analyzing-state">
                <div className="scanning-line"></div>
                <Activity size={48} className="analyzing-icon pulse-animation" />
                <p>Running multi-variable neural network analysis...</p>
              </div>
            )}

            {result && !loading && (
              <div className="prediction-result animate-in">
                <div className="result-header">
                  <span className="confidence-badge">
                    {Math.round(result.confidence * 100)}% Consensus
                  </span>
                </div>
                
                <div 
                  className="stage-circle"
                  style={{ 
                    borderColor: result.color,
                    color: result.color,
                    boxShadow: `0 0 40px ${result.color}44 inset, 0 0 20px ${result.color}44`
                  }}
                >
                  <span className="level-number">Lvl {result.level}</span>
                </div>

                <h3 className="stage-name" style={{ color: result.color }}>
                  {result.stage}
                </h3>
                
                {result.level >= 2 && (
                  <div className="alert-box">
                    <AlertCircle size={16} />
                    <span>Immediate medical intervention recommended based on complete profile.</span>
                  </div>
                )}

                {/* Multi-Model Comparison Table */}
                {result.comparison && (
                  <div className="comparison-section mt-8 animate-in" style={{ animationDelay: '0.4s' }}>
                    <h4 className="comparison-title">
                      <Activity size={16} /> Model Comparison Engine
                    </h4>
                    <div className="comparison-table-wrapper">
                      <table className="comparison-table">
                        <thead>
                          <tr>
                            <th>Model Architecture</th>
                            <th>Prediction</th>
                            <th>Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.comparison.map((item, idx) => (
                            <tr key={idx} className={item.level === result.level ? 'row-match' : ''}>
                              <td>{item.model}</td>
                              <td className="prediction-cell">
                                <span 
                                  className="status-dot" 
                                  style={{ backgroundColor: item.level === 0 ? 'var(--status-normal)' : (item.level === 1 ? 'var(--status-stage1)' : (item.level === 2 ? 'var(--status-stage2)' : 'var(--status-crisis)')) }}
                                ></span>
                                {item.prediction}
                              </td>
                              <td className="confidence-cell">
                                <div className="confidence-bar-bg">
                                  <div 
                                    className="confidence-bar-fill" 
                                    style={{ 
                                      width: `${item.confidence * 100}%`,
                                      backgroundColor: item.level === 0 ? 'var(--status-normal)' : (item.level === 1 ? 'var(--status-stage1)' : (item.level === 2 ? 'var(--status-stage2)' : 'var(--status-crisis)'))
                                    }}
                                  ></div>
                                </div>
                                {Math.round(item.confidence * 100)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
