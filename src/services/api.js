const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api';

// Fetch all diseases from MongoDB
export const fetchAllDiseases = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/disease/all`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch diseases');
  } catch (error) {
    console.error('Error fetching diseases:', error);
    return [];
  }
};

// Fetch disease by ID
export const fetchDiseaseById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/disease/${id}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch disease');
  } catch (error) {
    console.error('Error fetching disease:', error);
    return null;
  }
};

// Search diseases
export const searchDiseases = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/disease/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to search diseases');
  } catch (error) {
    console.error('Error searching diseases:', error);
    return [];
  }
};

// Add new disease (with image upload)
export const addDisease = async (diseaseData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('plantName', diseaseData.plantName);
    formData.append('diseaseName', diseaseData.diseaseName);
    formData.append('symptoms', diseaseData.symptoms);
    formData.append('prevention', diseaseData.prevention);
    formData.append('treatment', diseaseData.treatment);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/disease/add`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to add disease');
  } catch (error) {
    console.error('Error adding disease:', error);
    throw error;
  }
};

export const checkDiagnosis = async (answers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/diagnosis/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answers)
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to diagnose disease');
      error.status = response.status;
      throw error;
    }

    return data.data;
  } catch (error) {
    console.error('Error during diagnosis:', error);
    throw error;
  }
};

