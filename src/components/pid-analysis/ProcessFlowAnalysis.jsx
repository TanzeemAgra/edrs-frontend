/**
 * Process Flow Analysis Component
 * Analyzes process flows, streams, and connections in P&ID diagrams
 */

import React, { useState, useMemo } from 'react'
import {
  ArrowRightIcon,
  BeakerIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const ProcessFlowAnalysis = ({ diagram, results, config, loading }) => {
  const [selectedStream, setSelectedStream] = useState(null)
  const [analysisFilter, setAnalysisFilter] = useState('all')

  // Process flow analysis data
  const flowAnalysis = useMemo(() => {
    if (!results) return null

    const processResults = results.filter(r => 
      r.category === 'process_flow' || r.type === 'flow_analysis'
    )

    return {
      totalStreams: 24,
      analyzedStreams: 22,
      flowConnections: 156,
      processUnits: 18,
      issues: processResults.length,
      criticalPaths: 3,
      flowDirection: 'Forward',
      massBalance: 98.5,
      energyBalance: 97.2
    }
  }, [results])

  const processStreams = [
    {
      id: 'S-001',
      name: 'Feed Stream',
      type: 'Liquid',
      temperature: '25°C',
      pressure: '150 psig',
      flowRate: '1500 kg/h',
      composition: 'Water 95%, Impurities 5%',
      status: 'normal'
    },
    {
      id: 'S-002', 
      name: 'Product Stream',
      type: 'Liquid',
      temperature: '85°C',
      pressure: '120 psig',
      flowRate: '1425 kg/h',
      composition: 'Purified Water 99.5%',
      status: 'normal'
    },
    {
      id: 'S-003',
      name: 'Waste Stream',
      type: 'Liquid',
      temperature: '45°C',
      pressure: '15 psig',
      flowRate: '75 kg/h',
      composition: 'Concentrated Impurities',
      status: 'warning'
    }
  ]

  const processUnits = [
    {
      id: 'R-001',
      name: 'Main Reactor',
      type: 'CSTR',
      efficiency: 95.2,
      status: 'operational',
      lastMaintenance: '2024-10-15',
      issues: []
    },
    {
      id: 'E-001',
      name: 'Heat Exchanger',
      type: 'Shell & Tube',
      efficiency: 88.7,
      status: 'warning',
      lastMaintenance: '2024-09-20',
      issues: ['Fouling detected', 'Pressure drop increase']
    },
    {
      id: 'P-001',
      name: 'Feed Pump',
      type: 'Centrifugal',
      efficiency: 92.1,
      status: 'operational',
      lastMaintenance: '2024-11-01',
      issues: []
    }
  ]

  const StatusIndicator = ({ status }) => {
    const config = {
      normal: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircleIcon },
      warning: { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: ExclamationTriangleIcon },
      critical: { color: 'text-red-600', bg: 'bg-red-100', icon: ExclamationTriangleIcon },
      operational: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircleIcon }
    }[status] || { color: 'text-gray-600', bg: 'bg-gray-100', icon: InformationCircleIcon }

    const Icon = config.icon

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </div>
    )
  }

  if (loading?.results) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing process flows...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Process Flow Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Process Flow Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <BeakerIcon className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{flowAnalysis?.totalStreams || 0}</span>
            </div>
            <p className="text-sm font-medium text-blue-800">Total Streams</p>
            <p className="text-xs text-blue-600">{flowAnalysis?.analyzedStreams || 0} analyzed</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <ArrowRightIcon className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-900">{flowAnalysis?.flowConnections || 0}</span>
            </div>
            <p className="text-sm font-medium text-green-800">Flow Connections</p>
            <p className="text-xs text-green-600">All validated</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <WrenchScrewdriverIcon className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">{flowAnalysis?.processUnits || 0}</span>
            </div>
            <p className="text-sm font-medium text-purple-800">Process Units</p>
            <p className="text-xs text-purple-600">Equipment identified</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <FireIcon className="w-5 h-5 text-red-600" />
              <span className="text-2xl font-bold text-red-900">{flowAnalysis?.criticalPaths || 0}</span>
            </div>
            <p className="text-sm font-medium text-red-800">Critical Paths</p>
            <p className="text-xs text-red-600">Require attention</p>
          </div>
        </div>
      </div>

      {/* Process Streams Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Streams</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flow Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processStreams.map((stream) => (
                <tr key={stream.id} className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedStream(stream)}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stream.id}</div>
                      <div className="text-sm text-gray-500">{stream.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stream.type}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{stream.temperature}</div>
                    <div className="text-xs text-gray-500">{stream.pressure}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{stream.flowRate}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusIndicator status={stream.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Units */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Units Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {processUnits.map((unit) => (
            <div key={unit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{unit.name}</h4>
                <StatusIndicator status={unit.status} />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{unit.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className="font-medium">{unit.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Maintenance:</span>
                  <span className="font-medium">{unit.lastMaintenance}</span>
                </div>
              </div>
              
              {unit.issues.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Issues:</p>
                  {unit.issues.map((issue, index) => (
                    <p key={index} className="text-xs text-red-600">• {issue}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mass & Energy Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mass Balance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Balance</span>
              <span className="text-2xl font-bold text-green-600">{flowAnalysis?.massBalance || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${flowAnalysis?.massBalance || 0}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Input: 1500 kg/h</p>
              <p>Output: 1500 kg/h</p>
              <p>Accumulation: 0 kg/h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Balance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Balance</span>
              <span className="text-2xl font-bold text-blue-600">{flowAnalysis?.energyBalance || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${flowAnalysis?.energyBalance || 0}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Heat Input: 2500 kW</p>
              <p>Heat Output: 2430 kW</p>
              <p>Heat Loss: 70 kW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessFlowAnalysis