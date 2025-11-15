/**
 * Document Upload Modal Component
 * Professional document upload interface for EDRS platform
 */

import React, { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  FolderIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import usePIDAnalysisStore from '../../stores/pidAnalysisStore'
import { utils } from '../../services/pidAnalysis'
import LoadingSpinner from '../ui/LoadingSpinner'

const DocumentUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadError, setUploadError] = useState(null)
  const [uploadStep, setUploadStep] = useState(1) // 1: Select Files, 2: Metadata, 3: Upload
  const fileInputRef = useRef(null)
  
  const {
    createProject,
    uploadDiagram,
    loading,
    uploadProgress,
    error
  } = usePIDAnalysisStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setUploadError(null)
    
    if (rejectedFiles.length > 0) {
      setUploadError(`Some files were rejected. Supported formats: PDF, DWG, PNG, JPEG, TIFF (max 50MB each)`)
      return
    }

    if (acceptedFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...acceptedFiles])
      if (uploadStep === 1) {
        setUploadStep(2)
      }
    }
  }, [uploadStep])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/tiff': ['.tif', '.tiff'],
      'application/acad': ['.dwg'],
      'application/x-autocad': ['.dwg'],
      'application/x-dwg': ['.dwg']
    },
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024, // 50MB per file
  })

  const removeFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove))
    if (selectedFiles.length === 1) {
      setUploadStep(1)
    }
  }

  const handleFormSubmit = async (data) => {
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file to upload.')
      return
    }

    try {
      setUploadError(null)
      setUploadStep(3)
      
      // Create new project
      const projectData = {
        name: data.project_name,
        description: data.project_description,
        project_type: data.project_type,
        location: data.location,
        client_name: data.client_name,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
      }
      
      const newProject = await createProject(projectData)
      
      // Upload each file to the project
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const diagramData = {
          drawing_number: data.drawing_number ? `${data.drawing_number}-${index + 1}` : `DOC-${Date.now()}-${index + 1}`,
          drawing_title: data.drawing_title || file.name.replace(/\.[^/.]+$/, ""),
          diagram_type: data.diagram_type || 'process',
          design_phase: data.design_phase || 'detailed',
          revision: data.revision || 'A',
          process_area: data.process_area,
          operating_pressure: data.operating_pressure
        }
        
        return uploadDiagram(newProject.id, diagramData, file)
      })
      
      await Promise.all(uploadPromises)
      
      // Success callback
      if (onUploadSuccess) {
        onUploadSuccess(newProject, selectedFiles.length)
      }
      
      // Reset and close
      handleClose()
      
    } catch (error) {
      setUploadError(error.message || 'Upload failed. Please try again.')
      setUploadStep(2)
    }
  }

  const handleClose = () => {
    setSelectedFiles([])
    setUploadError(null)
    setUploadStep(1)
    reset()
    onClose()
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      onDrop(files, [])
    }
  }

  const projectTypes = [
    { value: 'oil_gas', label: 'Oil & Gas' },
    { value: 'chemical', label: 'Chemical Processing' },
    { value: 'power', label: 'Power Generation' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'mining', label: 'Mining & Metals' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'other', label: 'Other' }
  ]

  const diagramTypes = [
    { value: 'process', label: 'Process Flow Diagram (PFD)' },
    { value: 'piping', label: 'Piping & Instrumentation Diagram (P&ID)' },
    { value: 'utility', label: 'Utility Flow Diagram' },
    { value: 'safety', label: 'Safety System Diagram' },
    { value: 'control', label: 'Control System Diagram' },
    { value: 'electrical', label: 'Electrical Diagram' },
    { value: 'isometric', label: 'Isometric Drawing' }
  ]

  const designPhases = [
    { value: 'conceptual', label: 'Conceptual Design' },
    { value: 'basic', label: 'Basic Engineering (FEED)' },
    { value: 'detailed', label: 'Detailed Engineering' },
    { value: 'construction', label: 'Construction' },
    { value: 'commissioning', label: 'Commissioning' },
    { value: 'operation', label: 'Operation' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />
        
        {/* Modal content */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ArrowUpTrayIcon className="w-6 h-6 mr-2 text-blue-600" />
                Upload Engineering Documents
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-gray-50 px-6 py-3">
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    uploadStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {uploadStep > step ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      uploadStep > step ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Select Files</span>
              <span>Project Details</span>
              <span>Upload & Process</span>
            </div>
          </div>

          {/* Error Display */}
          {(uploadError || error) && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-md p-4">
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

          {/* Content based on step */}
          <div className="px-6 py-6">
            {/* Step 1: File Selection */}
            {uploadStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Select Engineering Documents
                  </h4>
                  <p className="text-sm text-gray-600">
                    Upload P&ID diagrams, process flows, and other engineering documents for AI-powered analysis
                  </p>
                </div>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    isDragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <CloudArrowUpIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 mb-2">
                    {isDragActive ? (
                      'Drop the files here...'
                    ) : (
                      'Drag & drop documents here, or click to browse'
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: PDF, DWG, PNG, JPEG, TIFF • Max 50MB per file • Up to 10 files
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleFileSelect}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FolderIcon className="w-5 h-5 mr-2" />
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.png,.jpg,.jpeg,.tif,.tiff"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Project Details & File List */}
            {uploadStep === 2 && (
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Selected Files */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Selected Files ({selectedFiles.length})
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <DocumentIcon className="h-6 w-6 text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{utils.formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Information */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Project Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        {...register('project_name', { required: 'Project name is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Offshore Platform Alpha - Process Unit 1"
                      />
                      {errors.project_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.project_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Type
                      </label>
                      <select
                        {...register('project_type')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        {...register('location')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., North Sea, Norway"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        {...register('client_name')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Equinor ASA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Drawing Number Prefix
                      </label>
                      <input
                        type="text"
                        {...register('drawing_number')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., P&ID-100"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Description
                      </label>
                      <textarea
                        {...register('project_description')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of the project..."
                      />
                    </div>
                  </div>
                </div>

                {/* Document Defaults */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Document Defaults</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Diagram Type
                      </label>
                      <select
                        {...register('diagram_type')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select type</option>
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
                        <option value="">Select phase</option>
                        {designPhases.map((phase) => (
                          <option key={phase.value} value={phase.value}>
                            {phase.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Revision
                      </label>
                      <input
                        type="text"
                        {...register('revision')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., A, 1"
                        defaultValue="A"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setUploadStep(1)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Back to Files
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Upload & Create Project
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Upload Progress */}
            {uploadStep === 3 && (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <LoadingSpinner size="lg" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Processing Documents...
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Creating project and uploading {selectedFiles.length} document(s)
                    </p>
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="max-w-md mx-auto">
                      <div className="bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentUploadModal