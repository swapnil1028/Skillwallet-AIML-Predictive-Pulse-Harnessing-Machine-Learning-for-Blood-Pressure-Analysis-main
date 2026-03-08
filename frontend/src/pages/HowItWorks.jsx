import React from 'react';
import { Card } from '../components/ui/Card';
import { Database, Brain, Server, ShieldCheck, Activity } from 'lucide-react';
import projectFlow from '../assets/project-flow.png';
import './HowItWorks.css';

export const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <header className="how-it-works-header">
        <h2>How It Works</h2>
        <p className="subtitle">Understanding the technology behind Predictive Pulse.</p>
      </header>

      <Card glass className="info-card">
        <div className="card-header">
          <div className="icon-wrapper">
            <Database size={24} />
          </div>
          <h3>1. The Patient Database</h3>
        </div>
        <div className="content-block">
          <p>
            The foundation of our model is built upon a comprehensive dataset of medical records (`patient_data.csv`). This specific dataset was curated to capture the multifaceted nature of hypertension.
          </p>
          <div className="detail-sub-grid">
            <div className="detail-item">
              <strong>Clinical Features:</strong>
              <p>We analyze Systolic (100-180+ mmHg) and Diastolic (70-120+ mmHg) ranges alongside patient age and gender to establish baseline risk profiles.</p>
            </div>
            <div className="detail-item">
              <strong>Symptom Analytics:</strong>
              <p>The model incorporates critical secondary indicators: Nose Bleeding, Shortness of Breath, and Visual Changes, which are often markers of Stage-2 or Crisis levels.</p>
            </div>
          </div>
          <p>
            <strong>Preprocessing Pipeline:</strong> Prior to training, categorical clinical variables (like symptoms and gender) are transformed via <em>Label Encoding</em>. All continuous variables are then <em>Normalized</em> to ensure the machine learning models can identify patterns without being skewed by the scale of raw medical units.
          </p>
        </div>
      </Card>

      <Card glass className="info-card">
        <div className="card-header">
          <div className="icon-wrapper">
            <Brain size={24} />
          </div>
          <h3>2. Machine Learning Models Evaluated</h3>
        </div>
        <div className="content-block">
          <p>
            To determine the most accurate predictor for Hypertension Severity (categorizing into Normal, Stage-1, Stage-2, and Crisis), robust experimentation was conducted across multiple algorithms. The performance of each model was rigorously compared.
          </p>
          
          <div className="model-grid">
            <div className="model-item">
              <div className="model-header">
                <h4>Random Forest</h4>
                <span className="accuracy-badge">100% Accuracy</span>
              </div>
              <p>An ensemble learning method utilizing multiple decision trees to improve predictive accuracy and control over-fitting.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Decision Tree</h4>
                <span className="accuracy-badge">100% Accuracy</span>
              </div>
              <p>Creates a model that predicts the value of a target variable by learning simple decision rules inferred from the patient data.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Support Vector Machines (RBF)</h4>
                <span className="accuracy-badge">100% Accuracy</span>
              </div>
              <p>Evaluated using an RBF kernel. Highly effective in high dimensional spaces for separating clinical severity classes.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>K-Nearest Neighbors (KNN)</h4>
                <span className="accuracy-badge">99.45% Accuracy</span>
              </div>
              <p>A non-parametric classification algorithm that predicts the stage based on the closest matching historical patient profiles.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Logistic Regression</h4>
                <span className="accuracy-badge">97.26% Accuracy</span>
              </div>
              <p>Provides a strong baseline by estimating probabilities using a logistic function, excellent for binary and multi-class clinical classification.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Linear SVM</h4>
                <span className="accuracy-badge">97.26% Accuracy</span>
              </div>
              <p>Utilizes a linear kernel to efficiently separate data points with clear margins, showing strong performance.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Ridge Classifier</h4>
                <span className="accuracy-badge">95.34% Accuracy</span>
              </div>
              <p>A classifier variant of Ridge Regression that converts the label data into {'{-1, 1}'} and solves using linear regression.</p>
            </div>
            <div className="model-item">
              <div className="model-header">
                <h4>Gaussian Naive Bayes</h4>
                <span className="accuracy-badge">88.49% Accuracy</span>
              </div>
              <p>A probabilistic classifier based on applying Bayes' theorem with strong independence assumptions between the clinical features.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card glass className="info-card">
        <div className="card-header">
          <div className="icon-wrapper">
            <Server size={24} />
          </div>
          <h3>3. Overall Architecture</h3>
        </div>
        <div className="content-block">
          <p>
            Predictive Pulse operates on a modern, decoupled architecture designed for scale and clinical precision. This separation ensures the analytical "brain" remains independent of the presentation layer.
          </p>
          <div className="architecture-details">
            <div className="arch-node">
              <strong>1. React Frontend Layer:</strong>
              <p>Captures real-time patient telemetry through a premium Dashboard. It handles initial input validation and initiates asynchronous communication with the server.</p>
            </div>
            <div className="arch-node">
              <strong>2. Flask API Gateway:</strong>
              <p>The backend serves as a secure RESTful gateway. Upon receiving a POST request at `/api/predict`, it handles JSON parsing and routes the data to the logical processing engine.</p>
            </div>
            <div className="arch-node">
              <strong>3. Logical Processing Engine:</strong>
              <p>Utilizes the derived rules from our Random Forest and SVM research to interpret incoming vitals. It calculates the exact Hypertension Stage based on the JNC standard (Normal, Stage 1/2, or Crisis).</p>
            </div>
            <div className="arch-node">
              <strong>4. Asynchronous Response:</strong>
              <p>Results are pushed back to the UI, triggering a dynamic state update that visualizes the risk level and confidence score without a full page reload.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card glass className="info-card diagram-section">
        <div className="card-header">
          <div className="icon-wrapper">
            <Activity size={24} />
          </div>
          <h3>4. System Flow Diagram</h3>
        </div>
        <div className="content-block center">
          <p className="diagram-desc">
            This comprehensive technical roadmap illustrates the end-to-end data lifecycle. It traces the journey from raw clinical records in the <strong>Patient Dataset</strong> through the <strong>Intelligence Engine</strong>, finally manifesting as precision analysis on your <strong>Frontend Dashboard</strong>.
          </p>
          <div className="diagram-container vertical-flow">
            <img src={projectFlow} alt="Project Technical Flow" className="flow-diagram vertical" />
            <div className="diagram-overlay">
              <span>Detailed System Architecture v1.0</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
