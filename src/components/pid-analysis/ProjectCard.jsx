/**
 * Project Card Component
 * Displays P&ID project information in card format
 */

import React from 'react';
import { 
  CalendarIcon, 
  BuildingOfficeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { utils } from '../../services/pidAnalysis';

const ProjectCard = ({ project, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'completed':
        return <ChartBarIcon className="h-4 w-4" />;
      case 'on_hold':
        return <ClockIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {project.facility_code || project.field_name}
            </p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span className="ml-1">
              {project.is_active ? 'Active' : 'Inactive'}
            </span>
          </span>
        </div>

        {/* Project Type & Standard */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span>{utils.getProjectTypeLabel(project.project_type)}</span>
          </div>
          {project.engineering_standard && (
            <div className="flex items-center text-sm text-gray-600">
              <ChartBarIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{utils.getStandardLabel(project.engineering_standard)}</span>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {project.total_diagrams || 0}
            </div>
            <div className="text-xs text-gray-500">Diagrams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-red-600">
              {project.critical_errors || 0}
            </div>
            <div className="text-xs text-gray-500">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-orange-600">
              {project.high_priority_errors || 0}
            </div>
            <div className="text-xs text-gray-500">High</div>
          </div>
        </div>

        {/* Client & Date */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
              <span className="truncate">
                {project.client_company || 'No client specified'}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>
                {new Date(project.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar (if analysis in progress) */}
        {project.analysis_in_progress && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Analysis Progress</span>
              <span className="text-gray-900 font-medium">
                {project.analysis_progress || 0}%
              </span>
            </div>
            <div className="mt-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.analysis_progress || 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;