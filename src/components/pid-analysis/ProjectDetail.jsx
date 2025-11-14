/**
 * P&ID Project Detail Page
 * Main page for managing a specific P&ID analysis project
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PlusIcon,
  PlayIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import usePIDAnalysisStore from '../../stores/pidAnalysisStore';
import { utils } from '../../services/pidAnalysis';
import LoadingSpinner from '../ui/LoadingSpinner';
import DiagramUpload from './DiagramUpload';
import AnalysisResults from './AnalysisResults';
import AnalysisProgress from './AnalysisProgress';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('diagrams');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  const {
    currentProject,
    diagrams,
    analysisSession,
    loading,
    error,
    fetchProject,
    fetchDiagrams,
    startAnalysis,
    clearError
  } = usePIDAnalysisStore();

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
      fetchDiagrams(projectId);
    }
  }, [projectId, fetchProject, fetchDiagrams]);

  const handleStartAnalysis = async (diagramId, config = {}) => {
    try {
      const defaultConfig = {
        llm_model: 'gpt-4',
        analysis_depth: 'comprehensive',
        include_recommendations: true
      };
      
      await startAnalysis(projectId, diagramId, { ...defaultConfig, ...config });
      setActiveTab('analysis');
    } catch (error) {
      console.error('Error starting analysis:', error);
    }
  };

  const handleUploadComplete = (newDiagram) => {
    setShowUploadModal(false);
    fetchDiagrams(projectId); // Refresh diagram list
  };

  const tabs = [
    { id: 'diagrams', name: 'Diagrams', icon: DocumentIcon },
    { id: 'analysis', name: 'Analysis', icon: ChartBarIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  if (loading.projects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Project not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The requested project could not be found.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/pid-analysis')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => navigate('/pid-analysis')}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentProject.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {utils.getProjectTypeLabel(currentProject.project_type)} • 
                  {utils.getStandardLabel(currentProject.engineering_standard)}
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Upload Diagram
              </button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-blue-900">
                  {diagrams.length}
                </div>
                <div className="text-sm text-blue-600">Total Diagrams</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-red-900">
                  {currentProject.critical_errors || 0}
                </div>
                <div className="text-sm text-red-600">Critical Issues</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-orange-900">
                  {currentProject.high_priority_errors || 0}
                </div>
                <div className="text-sm text-orange-600">High Priority</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-green-900">
                  {currentProject.total_errors ? 
                    Math.round(((currentProject.total_errors - (currentProject.critical_errors || 0) - (currentProject.high_priority_errors || 0)) / currentProject.total_errors) * 100) : 0
                  }%
                </div>
                <div className="text-sm text-green-600">Low/Medium</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
                <button
                  onClick={clearError}
                  className="mt-2 text-sm text-red-600 underline hover:text-red-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'diagrams' && (
          <div className="space-y-6">
            {/* Diagrams List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  P&ID Diagrams ({diagrams.length})
                </h3>
                
                {diagrams.length === 0 ? (
                  <div className="text-center py-12">
                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No diagrams uploaded</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload your first P&ID diagram to get started with analysis.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Upload Diagram
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {diagrams.map((diagram) => (
                      <div
                        key={diagram.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {diagram.drawing_number}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {diagram.drawing_title}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            diagram.status === 'processed' 
                              ? 'bg-green-100 text-green-800'
                              : diagram.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {diagram.status}
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-500 space-y-1 mb-3">
                          <div>Rev: {diagram.revision || 'N/A'}</div>
                          <div>Size: {utils.formatFileSize(diagram.file_size || 0)}</div>
                          <div>Errors: {diagram.total_errors_found || 0}</div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDiagram(diagram);
                              setActiveTab('analysis');
                            }}
                            className="flex-1 inline-flex items-center justify-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View Results
                          </button>
                          <button
                            onClick={() => handleStartAnalysis(diagram.id)}
                            disabled={loading.analysis}
                            className="flex-1 inline-flex items-center justify-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                          >
                            <PlayIcon className="h-3 w-3 mr-1" />
                            Analyze
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Analysis Progress */}
            {analysisSession && loading.analysis && (
              <AnalysisProgress sessionId={analysisSession.id} />
            )}
            
            {/* Analysis Results */}
            {selectedDiagram && (
              <AnalysisResults 
                projectId={projectId} 
                diagramId={selectedDiagram.id} 
              />
            )}
            
            {!selectedDiagram && !loading.analysis && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No diagram selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a diagram from the Diagrams tab to view analysis results.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  value={currentProject.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Engineering Standard
                </label>
                <input
                  type="text"
                  value={utils.getStandardLabel(currentProject.engineering_standard)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Company
                </label>
                <input
                  type="text"
                  value={currentProject.client_company || 'Not specified'}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <DiagramUpload
              projectId={projectId}
              onUploadComplete={handleUploadComplete}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;