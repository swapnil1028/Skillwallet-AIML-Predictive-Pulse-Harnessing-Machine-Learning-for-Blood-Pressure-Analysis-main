// Mock API to simulate the Predictive Pulse ML Model Backend

export const analyzePulse = async (patientData) => {
  try {
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error connecting to backend API:", error);
    // Fallback to error state
    return {
      stage: 'API ERROR',
      level: 0,
      confidence: 0,
      color: 'var(--status-crisis)'
    };
  }
};
