/**
 * P&ID Diagram Upload Component
 * Handles file upload and diagram metadata for P&ID analysis
 */

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import usePIDAnalysisStore from '../../stores/pidAnalysisStore';
import { utils } from '../../services/pidAnalysis';
import LoadingSpinner from '../ui/LoadingSpinner';

const DiagramUpload = ({ projectId, onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  
  const {
    uploadDiagram,
    loading,
    uploadProgress,
    error
  } = usePIDAnalysisStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setUploadError(null);
    
    if (rejectedFiles.length > 0) {
      setUploadError('File type not supported. Please upload PDF, DWG, PNG, JPEG, or TIFF files.');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/tiff': ['.tif', '.tiff'],
      'application/acad': ['.dwg'],
      'application/x-autocad': ['.dwg']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleFormSubmit = async (data) => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    try {
      setUploadError(null);
      const newDiagram = await uploadDiagram(projectId, data, selectedFile);
      
      // Reset form and file selection
      reset();
      setSelectedFile(null);
      
      if (onUploadComplete) {
        onUploadComplete(newDiagram);
      }
    } catch (error) {
      setUploadError(error.message);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadError(null);
  };

  const diagramTypes = [
    { value: 'process', label: 'Process Flow Diagram (PFD)' },
    { value: 'piping', label: 'Piping & Instrumentation Diagram (P&ID)' },
    { value: 'utility', label: 'Utility Flow Diagram' },
    { value: 'safety', label: 'Safety System Diagram' },
    { value: 'control', label: 'Control System Diagram' },
    { value: 'electrical', label: 'Electrical Diagram' },
    { value: 'isometric', label: 'Isometric Drawing' },
  ];

  const designPhases = [
    { value: 'conceptual', label: 'Conceptual Design' },
    { value: 'basic', label: 'Basic Engineering (FEED)' },
    { value: 'detailed', label: 'Detailed Engineering' },
    { value: 'construction', label: 'Construction' },
    { value: 'commissioning', label: 'Commissioning' },
    { value: 'operation', label: 'Operation' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Upload P&ID Diagram
        </h2>
        <p className="text-sm text-gray-500">
          Upload engineering diagrams for AI-powered analysis and error detection.
        </p>
      </div>

      {/* Error Display */}
      {(uploadError || error) && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {uploadError || error}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diagram File *
          </label>
          
          {!selectedFile ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isDragActive ? (
                  'Drop the file here...'
                ) : (
                  'Drag & drop a diagram file here, or click to select'
                )}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports: PDF, DWG, PNG, JPEG, TIFF (max 50MB)
              </p>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {utils.formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {loading.upload && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <div className="ml-3 flex-1">
                <p className="text-sm text-blue-800">Uploading diagram...</p>
                <div className="mt-2 bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-blue-600">
                  {uploadProgress}% complete
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Diagram Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drawing Number *
            </label>
            <input
              type="text"
              {...register('drawing_number', { required: 'Drawing number is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., P&ID-100-001"
            />
            {errors.drawing_number && (
              <p className="mt-1 text-sm text-red-600">{errors.drawing_number.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Revision
            </label>
            <input
              type="text"
              {...register('revision')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Rev A, Rev 1, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Drawing Title *
          </label>
          <input
            type="text"
            {...register('drawing_title', { required: 'Drawing title is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Process Unit 1 - Main Flow"
          />
          {errors.drawing_title && (
            <p className="mt-1 text-sm text-red-600">{errors.drawing_title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagram Type
            </label>
            <select
              {...register('diagram_type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select diagram type</option>
              {diagramTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Design Phase
            </label>
            <select
              {...register('design_phase')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select design phase</option>
              {designPhases.map((phase) => (
                <option key={phase.value} value={phase.value}>
                  {phase.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sheet Number
            </label>
            <input
              type="text"
              {...register('sheet_number')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1 of 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Process Area
            </label>
            <input
              type="text"
              {...register('process_area')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Unit 100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operating Pressure (bar)
            </label>
            <input
              type="number"
              step="0.1"
              {...register('operating_pressure')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 10.5"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedFile(null);
              setUploadError(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={loading.upload || !selectedFile}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading.upload ? 'Uploading...' : 'Upload Diagram'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagramUpload;