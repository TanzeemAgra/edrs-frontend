/**
 * EDRS P&ID Analysis API Service
 * Oil & Gas Engineering Diagram Analysis
 */

import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// P&ID Projects API
export const projectsAPI = {
  // Get all projects
  getProjects: (params = {}) => {
    return api.get('/projects/', { params });
  },

  // Get single project
  getProject: (projectId) => {
    return api.get(`/projects/${projectId}/`);
  },

  // Create new project
  createProject: (projectData) => {
    return api.post('/projects/', projectData);
  },

  // Update project
  updateProject: (projectId, projectData) => {
    return api.put(`/projects/${projectId}/`, projectData);
  },

  // Delete project
  deleteProject: (projectId) => {
    return api.delete(`/projects/${projectId}/`);
  },

  // Get project statistics
  getProjectStats: (projectId) => {
    return api.get(`/projects/${projectId}/stats/`);
  },
};

// P&ID Diagrams API
export const diagramsAPI = {
  // Get diagrams for a project
  getDiagrams: (projectId, params = {}) => {
    return api.get(`/projects/${projectId}/diagrams/`, { params });
  },

  // Get single diagram
  getDiagram: (projectId, diagramId) => {
    return api.get(`/projects/${projectId}/diagrams/${diagramId}/`);
  },

  // Upload new diagram
  uploadDiagram: (projectId, formData, onProgress) => {
    return api.post(`/projects/${projectId}/diagrams/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  // Update diagram
  updateDiagram: (projectId, diagramId, diagramData) => {
    return api.put(`/projects/${projectId}/diagrams/${diagramId}/`, diagramData);
  },

  // Delete diagram
  deleteDiagram: (projectId, diagramId) => {
    return api.delete(`/projects/${projectId}/diagrams/${diagramId}/`);
  },

  // Start analysis
  startAnalysis: (projectId, diagramId, analysisConfig = {}) => {
    return api.post(`/projects/${projectId}/diagrams/${diagramId}/analyze/`, analysisConfig);
  },
};

// Analysis Results API
export const resultsAPI = {
  // Get analysis results
  getResults: (projectId, diagramId, params = {}) => {
    return api.get(`/projects/${projectId}/diagrams/${diagramId}/results/`, { params });
  },

  // Get single result
  getResult: (projectId, diagramId, resultId) => {
    return api.get(`/projects/${projectId}/diagrams/${diagramId}/results/${resultId}/`);
  },

  // Update result (review, approve, etc.)
  updateResult: (projectId, diagramId, resultId, resultData) => {
    return api.put(`/projects/${projectId}/diagrams/${diagramId}/results/${resultId}/`, resultData);
  },

  // Bulk update results
  bulkUpdateResults: (projectId, diagramId, updates) => {
    return api.post(`/projects/${projectId}/diagrams/${diagramId}/results/bulk-update/`, updates);
  },

  // Export results
  exportResults: (projectId, diagramId, format = 'pdf') => {
    return api.get(`/projects/${projectId}/diagrams/${diagramId}/results/export/`, {
      params: { format },
      responseType: 'blob',
    });
  },
};

// Analysis Sessions API
export const sessionsAPI = {
  // Get analysis sessions
  getSessions: (params = {}) => {
    return api.get('/sessions/', { params });
  },

  // Get session details
  getSession: (sessionId) => {
    return api.get(`/sessions/${sessionId}/`);
  },

  // Get session progress
  getSessionProgress: (sessionId) => {
    return api.get(`/sessions/${sessionId}/progress/`);
  },

  // Cancel session
  cancelSession: (sessionId) => {
    return api.post(`/sessions/${sessionId}/cancel/`);
  },
};

// Error Categories API
export const categoriesAPI = {
  // Get error categories
  getCategories: () => {
    return api.get('/error-categories/');
  },

  // Create custom category
  createCategory: (categoryData) => {
    return api.post('/error-categories/', categoryData);
  },
};

// Utility functions
export const utils = {
  // File upload helper
  createDiagramFormData: (diagramData, file) => {
    const formData = new FormData();
    
    Object.keys(diagramData).forEach(key => {
      if (diagramData[key] !== null && diagramData[key] !== undefined) {
        formData.append(key, diagramData[key]);
      }
    });
    
    if (file) {
      formData.append('original_file', file);
    }
    
    return formData;
  },

  // Download file helper
  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Get severity color
  getSeverityColor: (severity) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return colors[severity] || colors.low;
  },

  // Get project type label
  getProjectTypeLabel: (type) => {
    const labels = {
      upstream: 'Upstream (E&P)',
      midstream: 'Midstream (Transportation)',
      downstream: 'Downstream (Refining)',
      petrochemical: 'Petrochemical',
      lng: 'LNG Processing',
      offshore: 'Offshore Platform',
      onshore: 'Onshore Facility',
    };
    return labels[type] || type;
  },

  // Get engineering standard label
  getStandardLabel: (standard) => {
    const labels = {
      isa_5_1: 'ISA-5.1 (Instrumentation)',
      iso_10628: 'ISO 10628 (Process Diagrams)',
      iec_62424: 'IEC 62424 (Process Control)',
      api_14c: 'API 14C (Subsurface Safety)',
      asme_y14: 'ASME Y14 (Engineering Drawing)',
    };
    return labels[standard] || standard;
  },
};

export default api;