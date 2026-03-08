import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { PredictionDashboard } from './pages/PredictionDashboard';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { HowItWorks } from './pages/HowItWorks';

function App() {
  const [activeTab, setActiveTab] = useState('prediction');

  return (
    <div className="App">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content" style={{ marginLeft: '280px' }}>
        {activeTab === 'prediction' && <PredictionDashboard />}
        
        {activeTab === 'dashboard' && <AnalyticsDashboard />}
        
        {activeTab === 'howitworks' && <HowItWorks />}

        {activeTab === 'settings' && (
          <div className="placeholder-view">
            <h2>System Settings</h2>
            <p className="subtitle">Configure ML endpoints and user preferences.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
