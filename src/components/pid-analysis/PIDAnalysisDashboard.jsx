/**
 * P&ID Analysis Dashboard
 * Main dashboard for Oil & Gas P&ID diagram analysis
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  FolderIcon, 
  DocumentIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import usePIDAnalysisStore from '../../stores/pidAnalysisStore';
import { utils } from '../../services/pidAnalysis';
import LoadingSpinner from '../ui/LoadingSpinner';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import AnalysisStatsCard from './AnalysisStatsCard';

const PIDAnalysisDashboard = () => {
  const navigate = useNavigate();
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    clearError
  } = usePIDAnalysisStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setShowCreateProject(false);
      navigate(`/pid-analysis/projects/${newProject.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const getProjectStats = () => {
    const totalProjects = projects.length;
    const totalDiagrams = projects.reduce((sum, project) => sum + (project.total_diagrams || 0), 0);
    const totalErrors = projects.reduce((sum, project) => sum + (project.total_errors || 0), 0);
    const activeProjects = projects.filter(project => project.is_active).length;
    
    return { totalProjects, totalDiagrams, totalErrors, activeProjects };
  };

  const stats = getProjectStats();

  if (loading.projects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                P&ID Analysis Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Oil & Gas Engineering Diagram Analysis System
              </p>
            </div>
            <button
              onClick={() => setShowCreateProject(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalysisStatsCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={FolderIcon}
            color="blue"
            description={`${stats.activeProjects} active projects`}
          />
          <AnalysisStatsCard
            title="P&ID Diagrams"
            value={stats.totalDiagrams}
            icon={DocumentIcon}
            color="green"
            description="Engineering diagrams uploaded"
          />
          <AnalysisStatsCard
            title="Issues Detected"
            value={stats.totalErrors}
            icon={ExclamationTriangleIcon}
            color="red"
            description="Across all projects"
          />
          <AnalysisStatsCard
            title="Analysis Sessions"
            value="--"
            icon={ChartBarIcon}
            color="purple"
            description="AI analysis completed"
          />
        </div>

        {/* Projects Grid */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
              <div className="text-sm text-gray-500">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new Oil & Gas P&ID analysis project.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowCreateProject(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => navigate(`/pid-analysis/projects/${project.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">
                    Analysis completed for <span className="font-medium">P&ID-100-001</span>
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">
                    New diagram uploaded to <span className="font-medium">Offshore Platform Alpha</span>
                  </p>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">
                    Analysis in progress for <span className="font-medium">Process Unit 2</span>
                  </p>
                  <p className="text-sm text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateProject && (
        <CreateProjectModal
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
};

export default PIDAnalysisDashboard;