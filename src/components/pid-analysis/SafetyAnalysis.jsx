import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const SafetyAnalysis = ({ diagram, results, config, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="text-center">
        <ExclamationTriangleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Analysis</h3>
        <p className="text-gray-600">Safety systems analysis module in development...</p>
      </div>
    </div>
  )
}

export default SafetyAnalysis