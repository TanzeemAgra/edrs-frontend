/**
 * P&ID Analysis Zustand Store
 * Global state management for Oil & Gas diagram analysis
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { 
  projectsAPI, 
  diagramsAPI, 
  resultsAPI, 
  sessionsAPI,
  categoriesAPI 
} from '../services/pidAnalysis';

const usePIDAnalysisStore = create(
  devtools(
    (set, get) => ({
      // State
      projects: [],
      currentProject: null,
      diagrams: [],
      currentDiagram: null,
      analysisResults: [],
      analysisSession: null,
      errorCategories: [],
      loading: {
        projects: false,
        diagrams: false,
        results: false,
        analysis: false,
        upload: false,
      },
      error: null,
      uploadProgress: 0,
      analysisProgress: 0,

      // Projects Actions
      fetchProjects: async (params = {}) => {
        set((state) => ({ loading: { ...state.loading, projects: true } }));
        try {
          const response = await projectsAPI.getProjects(params);
          set({ projects: response.data.results || response.data, error: null });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set((state) => ({ loading: { ...state.loading, projects: false } }));
        }
      },

      fetchProject: async (projectId) => {
        set((state) => ({ loading: { ...state.loading, projects: true } }));
        try {
          const response = await projectsAPI.getProject(projectId);
          set({ currentProject: response.data, error: null });
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        } finally {
          set((state) => ({ loading: { ...state.loading, projects: false } }));
        }
      },

      createProject: async (projectData) => {
        set((state) => ({ loading: { ...state.loading, projects: true } }));
        try {
          const response = await projectsAPI.createProject(projectData);
          const newProject = response.data;
          
          set((state) => ({
            projects: [newProject, ...state.projects],
            currentProject: newProject,
            error: null,
          }));
          
          toast.success('Project created successfully!');
          return newProject;
        } catch (error) {
          set({ error: error.message });
          throw error;
        } finally {
          set((state) => ({ loading: { ...state.loading, projects: false } }));
        }
      },

      updateProject: async (projectId, projectData) => {
        try {
          const response = await projectsAPI.updateProject(projectId, projectData);
          const updatedProject = response.data;
          
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === projectId ? updatedProject : p
            ),
            currentProject: state.currentProject?.id === projectId 
              ? updatedProject 
              : state.currentProject,
            error: null,
          }));
          
          toast.success('Project updated successfully!');
          return updatedProject;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      deleteProject: async (projectId) => {
        try {
          await projectsAPI.deleteProject(projectId);
          
          set((state) => ({
            projects: state.projects.filter(p => p.id !== projectId),
            currentProject: state.currentProject?.id === projectId 
              ? null 
              : state.currentProject,
            error: null,
          }));
          
          toast.success('Project deleted successfully!');
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      // Diagrams Actions
      fetchDiagrams: async (projectId, params = {}) => {
        set((state) => ({ loading: { ...state.loading, diagrams: true } }));
        try {
          const response = await diagramsAPI.getDiagrams(projectId, params);
          set({ diagrams: response.data.results || response.data, error: null });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set((state) => ({ loading: { ...state.loading, diagrams: false } }));
        }
      },

      fetchDiagram: async (projectId, diagramId) => {
        set((state) => ({ loading: { ...state.loading, diagrams: true } }));
        try {
          const response = await diagramsAPI.getDiagram(projectId, diagramId);
          set({ currentDiagram: response.data, error: null });
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        } finally {
          set((state) => ({ loading: { ...state.loading, diagrams: false } }));
        }
      },

      uploadDiagram: async (projectId, diagramData, file) => {
        set((state) => ({ 
          loading: { ...state.loading, upload: true },
          uploadProgress: 0 
        }));
        
        try {
          const formData = new FormData();
          Object.keys(diagramData).forEach(key => {
            if (diagramData[key] !== null && diagramData[key] !== undefined) {
              formData.append(key, diagramData[key]);
            }
          });
          if (file) {
            formData.append('original_file', file);
          }

          const response = await diagramsAPI.uploadDiagram(
            projectId, 
            formData,
            (progress) => set({ uploadProgress: progress })
          );
          
          const newDiagram = response.data;
          
          set((state) => ({
            diagrams: [newDiagram, ...state.diagrams],
            currentDiagram: newDiagram,
            error: null,
            uploadProgress: 100,
          }));
          
          toast.success('Diagram uploaded successfully!');
          return newDiagram;
        } catch (error) {
          set({ error: error.message });
          throw error;
        } finally {
          set((state) => ({ 
            loading: { ...state.loading, upload: false },
            uploadProgress: 0 
          }));
        }
      },

      startAnalysis: async (projectId, diagramId, analysisConfig = {}) => {
        set((state) => ({ 
          loading: { ...state.loading, analysis: true },
          analysisProgress: 0 
        }));
        
        try {
          const response = await diagramsAPI.startAnalysis(projectId, diagramId, analysisConfig);
          const session = response.data;
          
          set({ 
            analysisSession: session, 
            error: null,
            analysisProgress: 10 
          });
          
          toast.success('Analysis started successfully!');
          
          // Start polling for progress
          get().pollAnalysisProgress(session.id);
          
          return session;
        } catch (error) {
          set({ 
            error: error.message,
            loading: { ...get().loading, analysis: false },
            analysisProgress: 0 
          });
          throw error;
        }
      },

      pollAnalysisProgress: async (sessionId) => {
        const pollInterval = setInterval(async () => {
          try {
            const response = await sessionsAPI.getSessionProgress(sessionId);
            const progress = response.data;
            
            set({ 
              analysisProgress: progress.progress_percentage || 0,
              analysisSession: { ...get().analysisSession, ...progress }
            });
            
            if (progress.status === 'completed' || progress.status === 'failed') {
              clearInterval(pollInterval);
              
              set((state) => ({ 
                loading: { ...state.loading, analysis: false },
                analysisProgress: progress.status === 'completed' ? 100 : 0
              }));
              
              if (progress.status === 'completed') {
                toast.success('Analysis completed successfully!');
                // Refresh results
                const { currentProject, currentDiagram } = get();
                if (currentProject && currentDiagram) {
                  get().fetchAnalysisResults(currentProject.id, currentDiagram.id);
                }
              } else {
                toast.error('Analysis failed. Please try again.');
              }
            }
          } catch (error) {
            console.error('Error polling analysis progress:', error);
            clearInterval(pollInterval);
            set((state) => ({ 
              loading: { ...state.loading, analysis: false },
              analysisProgress: 0
            }));
          }
        }, 2000); // Poll every 2 seconds
      },

      // Analysis Results Actions
      fetchAnalysisResults: async (projectId, diagramId, params = {}) => {
        set((state) => ({ loading: { ...state.loading, results: true } }));
        try {
          const response = await resultsAPI.getResults(projectId, diagramId, params);
          set({ analysisResults: response.data.results || response.data, error: null });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set((state) => ({ loading: { ...state.loading, results: false } }));
        }
      },

      updateAnalysisResult: async (projectId, diagramId, resultId, resultData) => {
        try {
          const response = await resultsAPI.updateResult(projectId, diagramId, resultId, resultData);
          const updatedResult = response.data;
          
          set((state) => ({
            analysisResults: state.analysisResults.map(r => 
              r.id === resultId ? updatedResult : r
            ),
            error: null,
          }));
          
          toast.success('Result updated successfully!');
          return updatedResult;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      bulkUpdateResults: async (projectId, diagramId, updates) => {
        try {
          const response = await resultsAPI.bulkUpdateResults(projectId, diagramId, updates);
          
          // Refresh results after bulk update
          get().fetchAnalysisResults(projectId, diagramId);
          
          toast.success(`${updates.length} results updated successfully!`);
          return response.data;
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      exportAnalysisResults: async (projectId, diagramId, format = 'pdf') => {
        try {
          const response = await resultsAPI.exportResults(projectId, diagramId, format);
          
          // Download file
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `analysis_results_${diagramId}.${format}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          
          toast.success('Results exported successfully!');
        } catch (error) {
          set({ error: error.message });
          throw error;
        }
      },

      // Error Categories Actions
      fetchErrorCategories: async () => {
        try {
          const response = await categoriesAPI.getCategories();
          set({ errorCategories: response.data.results || response.data, error: null });
        } catch (error) {
          set({ error: error.message });
        }
      },

      // Utility Actions
      clearError: () => set({ error: null }),
      
      resetState: () => set({
        projects: [],
        currentProject: null,
        diagrams: [],
        currentDiagram: null,
        analysisResults: [],
        analysisSession: null,
        error: null,
        uploadProgress: 0,
        analysisProgress: 0,
      }),

      setCurrentProject: (project) => set({ currentProject: project }),
      setCurrentDiagram: (diagram) => set({ currentDiagram: diagram }),
    }),
    {
      name: 'pid-analysis-store',
    }
  )
);

export default usePIDAnalysisStore;