/**
 * P&ID Analysis Detailed Platform
 * Comprehensive study and analysis interface for Engineering Document Review System
 */

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import usePIDAnalysisStore from '../../stores/pidAnalysisStore'
import PIDAnalysisConfig from '../../config/pidAnalysis'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CpuChipIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

// Import specialized components
import AnalysisOverview from '../../components/pid-analysis/AnalysisOverview'
import DiagramViewer from '../../components/pid-analysis/DiagramViewer'
import AnalysisResults from '../../components/pid-analysis/AnalysisResults'
import ProcessFlowAnalysis from '../../components/pid-analysis/ProcessFlowAnalysis'
import InstrumentationAnalysis from '../../components/pid-analysis/InstrumentationAnalysis'
import EquipmentAnalysis from '../../components/pid-analysis/EquipmentAnalysis'
import SafetyAnalysis from '../../components/pid-analysis/SafetyAnalysis'
import ComplianceCheck from '../../components/pid-analysis/ComplianceCheck'
import AnalysisExport from '../../components/pid-analysis/AnalysisExport'

const PIDAnalysisDetailed = () => {
  const { projectId, diagramId } = useParams()
  const navigate = useNavigate()
  
  // Store state
  const {
    currentProject,
    currentDiagram,
    analysisResults,
    analysisSession,
    loading,
    error,
    analysisProgress,
    fetchProject,
    fetchDiagram,
    fetchAnalysisResults,
    startAnalysis,
    exportAnalysisResults,
    clearError
  } = usePIDAnalysisStore()

  // Local state
  const [activeTab, setActiveTab] = useState('overview')
  const [analysisConfig, setAnalysisConfig] = useState(PIDAnalysisConfig.defaultAnalysisSettings)
  const [filterSettings, setFilterSettings] = useState(PIDAnalysisConfig.defaultFilters)
  const [viewSettings, setViewSettings] = useState({
    showGrid: true,
    showAnnotations: true,
    highlightErrors: true,
    zoomLevel: 100
  })

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        if (projectId && !currentProject) {
          await fetchProject(projectId)
        }
        if (projectId && diagramId && !currentDiagram) {
          await fetchDiagram(projectId, diagramId)
        }
        if (projectId && diagramId) {
          await fetchAnalysisResults(projectId, diagramId)
        }
      } catch (error) {
        console.error('Failed to initialize P&ID analysis data:', error)
        toast.error('Failed to load analysis data')
      }
    }

    initializeData()
  }, [projectId, diagramId])

  // Clear errors on mount
  useEffect(() => {
    return () => clearError()
  }, [])

  // Analysis tabs configuration with soft coding
  const analysisTabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon: ChartBarIcon,
      component: AnalysisOverview,
      description: 'General analysis summary and metrics'
    },
    {
      id: 'diagram',
      name: 'Diagram Viewer',
      icon: EyeIcon,
      component: DiagramViewer,
      description: 'Interactive diagram visualization'
    },
    {
      id: 'process-flow',
      name: 'Process Flow',
      icon: DocumentTextIcon,
      component: ProcessFlowAnalysis,
      description: 'Process flow analysis and optimization'
    },
    {
      id: 'instrumentation',
      name: 'Instrumentation',
      icon: Cog6ToothIcon,
      component: InstrumentationAnalysis,
      description: 'Instrument identification and validation'
    },
    {
      id: 'equipment',
      name: 'Equipment',
      icon: CpuChipIcon,
      component: EquipmentAnalysis,
      description: 'Equipment analysis and specifications'
    },
    {
      id: 'safety',
      name: 'Safety Analysis',
      icon: ExclamationTriangleIcon,
      component: SafetyAnalysis,
      description: 'Safety systems and compliance checks'
    },
    {
      id: 'compliance',
      name: 'Compliance',
      icon: CheckCircleIcon,
      component: ComplianceCheck,
      description: 'Industry standards compliance verification'
    },
    {
      id: 'results',
      name: 'Results',
      icon: DocumentTextIcon,
      component: AnalysisResults,
      description: 'Detailed analysis results and findings'
    },
    {
      id: 'export',
      name: 'Export',
      icon: ArrowDownTrayIcon,
      component: AnalysisExport,
      description: 'Export and report generation'
    }
  ]

  const currentTab = analysisTabs.find(tab => tab.id === activeTab)
  const CurrentTabComponent = currentTab?.component

  const handleStartAnalysis = async () => {
    if (!projectId || !diagramId) return
    
    try {
      await startAnalysis(projectId, diagramId, analysisConfig)
    } catch (error) {
      console.error('Failed to start analysis:', error)
    }
  }

  const handleExportResults = async (format = 'pdf') => {
    if (!projectId || !diagramId) return
    
    try {
      await exportAnalysisResults(projectId, diagramId, format)
    } catch (error) {
      console.error('Failed to export results:', error)
    }
  }

  const getAnalysisStatusColor = () => {
    if (!analysisSession) return 'gray'
    switch (analysisSession.status) {
      case 'completed': return 'green'
      case 'running': return 'blue'
      case 'failed': return 'red'
      default: return 'gray'
    }
  }

  const isAnalysisRunning = analysisSession?.status === 'running'
  const hasResults = analysisResults && analysisResults.length > 0

  return (
    <>
      <Helmet>
        <title>P&ID Analysis - {currentDiagram?.name || 'Detailed Analysis'} - EDRS</title>
        <meta name="description" content="Comprehensive P&ID analysis platform for engineering document review" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {currentDiagram?.name || 'P&ID Analysis'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {currentProject?.name} • Detailed Analysis Platform
                  </p>
                </div>
              </div>

              {/* Right Section - Analysis Controls */}
              <div className="flex items-center space-x-3">
                {/* Analysis Status */}
                {analysisSession && (
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    getAnalysisStatusColor() === 'green' ? 'bg-green-100 text-green-700' :
                    getAnalysisStatusColor() === 'blue' ? 'bg-blue-100 text-blue-700' :
                    getAnalysisStatusColor() === 'red' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      getAnalysisStatusColor() === 'green' ? 'bg-green-500' :
                      getAnalysisStatusColor() === 'blue' ? 'bg-blue-500 animate-pulse' :
                      getAnalysisStatusColor() === 'red' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`} />
                    <span>{analysisSession.status}</span>
                    {isAnalysisRunning && <span>({analysisProgress}%)</span>}
                  </div>
                )}

                {/* Analysis Progress Bar */}
                {isAnalysisRunning && (
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Start/Stop Analysis */}
                  <button
                    onClick={handleStartAnalysis}
                    disabled={isAnalysisRunning || loading.analysis}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg transition-colors ${
                      isAnalysisRunning 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isAnalysisRunning ? (
                      <>
                        <PauseIcon className="w-4 h-4 mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </button>

                  {/* Export Button */}
                  {hasResults && (
                    <button
                      onClick={() => handleExportResults('pdf')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  )}

                  {/* Settings Button */}
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Analysis Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {analysisTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`mr-2 w-5 h-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Analysis Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Description */}
          {currentTab && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <currentTab.icon className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900">{currentTab.name}</h3>
                  <p className="text-sm text-blue-700">{currentTab.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Content Based on Active Tab */}
          {CurrentTabComponent ? (
            <CurrentTabComponent
              project={currentProject}
              diagram={currentDiagram}
              results={analysisResults}
              session={analysisSession}
              config={analysisConfig}
              filters={filterSettings}
              viewSettings={viewSettings}
              onConfigChange={setAnalysisConfig}
              onFilterChange={setFilterSettings}
              onViewSettingsChange={setViewSettings}
              loading={loading}
            />
          ) : (
            <div className="text-center py-12">
              <CpuChipIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Component Loading</h3>
              <p className="text-gray-600">Please wait while the analysis component loads...</p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default PIDAnalysisDetailed