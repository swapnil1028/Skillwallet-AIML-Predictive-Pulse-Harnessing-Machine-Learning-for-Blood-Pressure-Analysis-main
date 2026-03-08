/**
 * Service to handle persistence of prediction history using localStorage.
 */

const HISTORY_KEY = 'predictive_pulse_history';

/**
 * Saves a new prediction result to history.
 * @param {Object} formData - The input data from the user.
 * @param {Object} result - The prediction result from the API.
 */
export const savePrediction = (formData, result) => {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    
    const newEntry = {
      id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      gender: formData.gender,
      age: formData.age,
      systolic: formData.systolic,
      diastolic: formData.diastolic,
      stage: result.stage || result.prediction || 'Unknown',
      confidence: `${Math.round(result.confidence * 100)}%`,
      timestamp: new Date().toLocaleString(),
      isReal: true // Flag to distinguish from mock data
    };
    
    // Add to the beginning of the list
    const updatedHistory = [newEntry, ...history];
    
    // Limit to last 50 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory.slice(0, 50)));
    return newEntry;
  } catch (error) {
    console.error('Failed to save prediction to history:', error);
    return null;
  }
};

/**
 * Retrieves the full prediction history.
 * @returns {Array} - List of prediction history entries.
 */
export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (error) {
    console.error('Failed to retrieve history:', error);
    return [];
  }
};

/**
 * Clears the prediction history.
 */
export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
