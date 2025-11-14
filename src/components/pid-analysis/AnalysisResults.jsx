/**
 * Analysis Results Component
 * Displays P&ID analysis results with filtering and actions
 */

import React, { useState, useEffect } from 'react';
import { 
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import usePIDAnalysisStore from '../../stores/pidAnalysisStore';
import { utils } from '../../services/pidAnalysis';
import LoadingSpinner from '../ui/LoadingSpinner';

const AnalysisResults = ({ projectId, diagramId }) => {
  const [filters, setFilters] = useState({
    severity: '',
    category: '',
    status: '',
    search: ''
  });
  const [selectedResults, setSelectedResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const {
    analysisResults,
    errorCategories,
    loading,
    error,
    fetchAnalysisResults,
    fetchErrorCategories,
    updateAnalysisResult,
    bulkUpdateResults,
    exportAnalysisResults
  } = usePIDAnalysisStore();

  useEffect(() => {
    if (projectId && diagramId) {
      fetchAnalysisResults(projectId, diagramId);
      fetchErrorCategories();
    }
  }, [projectId, diagramId, fetchAnalysisResults, fetchErrorCategories]);

  // Filter results based on current filters
  const filteredResults = analysisResults.filter(result => {
    if (filters.severity && result.severity_level !== filters.severity) return false;
    if (filters.category && result.category?.id !== parseInt(filters.category)) return false;
    if (filters.status && result.status !== filters.status) return false;
    if (filters.search && !result.error_title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !result.error_description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Group results by severity
  const resultsBySeverity = filteredResults.reduce((groups, result) => {
    const severity = result.severity_level;
    if (!groups[severity]) groups[severity] = [];
    groups[severity].push(result);
    return groups;
  }, {});

  const handleResultStatusUpdate = async (resultId, newStatus) => {
    try {
      await updateAnalysisResult(projectId, diagramId, resultId, { status: newStatus });
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedResults.length === 0) return;
    
    try {
      const updates = selectedResults.map(id => ({ id, status }));
      await bulkUpdateResults(projectId, diagramId, updates);
      setSelectedResults([]);
    } catch (error) {
      console.error('Error bulk updating results:', error);
    }
  };

  const handleExport = async (format = 'pdf') => {
    try {
      await exportAnalysisResults(projectId, diagramId, format);
    } catch (error) {
      console.error('Error exporting results:', error);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      resolved: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status] || badges.pending}`}>
        {status?.replace('_', ' ') || 'pending'}
      </span>
    );
  };

  if (loading.results) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Analysis Results</h2>
          <p className="text-sm text-gray-500">
            {filteredResults.length} of {analysisResults.length} results
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search errors..."
                />
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity
              </label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Categories</option>
                {errorCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedResults.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              {selectedResults.length} result{selectedResults.length > 1 ? 's' : ''} selected
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkStatusUpdate('reviewed')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Mark as Reviewed
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('approved')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
              >
                Approve
              </button>
              <button
                onClick={() => setSelectedResults([])}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results List */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {analysisResults.length === 0 
              ? 'No analysis has been performed on this diagram yet.'
              : 'Try adjusting your filters to see more results.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(resultsBySeverity).map(([severity, results]) => (
            <div key={severity} className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center">
                  {getSeverityIcon(severity)}
                  <h3 className="ml-2 text-sm font-medium text-gray-900 capitalize">
                    {severity} Priority ({results.length})
                  </h3>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {results.map((result) => (
                  <div key={result.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedResults.includes(result.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedResults([...selectedResults, result.id]);
                          } else {
                            setSelectedResults(selectedResults.filter(id => id !== result.id));
                          }
                        }}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {result.error_title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-600">
                              {result.error_description}
                            </p>
                            {result.element_tag && (
                              <p className="mt-1 text-xs text-gray-500">
                                Element: {result.element_tag} 
                                {result.coordinates_x && result.coordinates_y && 
                                  ` @ (${result.coordinates_x}, ${result.coordinates_y})`
                                }
                              </p>
                            )}
                            {result.recommended_fix && (
                              <div className="mt-2 bg-green-50 border border-green-200 rounded-md p-2">
                                <p className="text-xs text-green-800">
                                  <strong>Recommended Fix:</strong> {result.recommended_fix}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex flex-col items-end space-y-2">
                            {getStatusBadge(result.status)}
                            <div className="text-xs text-gray-500">
                              Confidence: {Math.round((result.confidence_score || 0) * 100)}%
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                          <button
                            onClick={() => handleResultStatusUpdate(result.id, 'reviewed')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                          >
                            <EyeIcon className="h-3 w-3 mr-1" />
                            Review
                          </button>
                          <button
                            onClick={() => handleResultStatusUpdate(result.id, 'approved')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                          >
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleResultStatusUpdate(result.id, 'rejected')}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                          >
                            <XMarkIcon className="h-3 w-3 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;