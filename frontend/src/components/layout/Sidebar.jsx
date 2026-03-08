import React from 'react';
import { Activity, LayoutDashboard, Settings, HelpCircle } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prediction', label: 'New Prediction', icon: Activity },
    { id: 'howitworks', label: 'How It Works', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar global-glass">
      <div className="sidebar-header">
        <div className="logo-container">
          <Activity className="logo-icon" size={28} />
          <h1 className="logo-text text-gradient">Predictive Pulse</h1>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">MD</div>
          <div className="user-info">
            <span className="user-name">Dr. Swapnil</span>
            <span className="user-role">Cardiologist</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
