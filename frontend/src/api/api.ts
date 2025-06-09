import axios from 'axios';
import { Assignment, AssignmentCreate } from '../types/Assignment';
import { config } from '../config';

// Use configuration
const API_BASE_URL = config.apiUrl;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      baseURL: config.baseURL,
      method: config.method
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const assignmentApi = {
  getAll: async (): Promise<Assignment[]> => {
    const response = await api.get('/api/assignments/');
    return response.data;
  },

  create: async (assignment: AssignmentCreate): Promise<Assignment> => {
    const response = await api.post('/api/assignments/', assignment);
    return response.data;
  },

  complete: async (id: number): Promise<Assignment> => {
    const response = await api.patch(`/api/assignments/${id}/complete`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/assignments/${id}`);
  },
};
