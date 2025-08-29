import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const themeService = {

  getAllThemes: async () => {
    const response = await api.get('/themes');
    return response.data.data; 
  },


  getQuestionsByTheme: async (themeId) => {
    const response = await api.get(`/themes/${themeId}/questions`);
    return response.data.data; 
  },


  getQuestionById: async (questionId) => {
    const response = await api.get(`/themes/${questionId}/question`);
    return response.data.data; 
  },

 
  checkAnswer: async (questionId, userAnswer) => {
    const response = await api.post(`/themes/questions/${questionId}/check`, {
      answer: userAnswer 
    });
    return response.data.data; 
  }
};

export default api;
