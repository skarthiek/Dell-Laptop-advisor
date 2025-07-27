import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecommendation = async (userPreferences) => {
    try {
        const response = await api.post('/api/recommend', {
            preferences: userPreferences
        });
        return response.data;
    } catch (error) {
        console.error('Error getting recommendation:', error);
        throw error;
    }
};

export const getAllLaptops = async () => {
    try {
        const response = await api.get('/api/laptops');
        return response.data.laptops;
    } catch (error) {
        console.error('Error fetching laptops:', error);
        throw error;
    }
};

export const generateMarketingContent = async (laptop, userPreferences) => {
    try {
        const response = await api.post('/api/generate-marketing', {
            laptop,
            user_preferences: userPreferences
        });
        return response.data.marketing_text;
    } catch (error) {
        console.error('Error generating marketing content:', error);
        throw error;
    }
};

export const healthCheck = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};

export default api; 