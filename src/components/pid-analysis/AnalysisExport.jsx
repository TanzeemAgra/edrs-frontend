import React from 'react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const AnalysisExport = ({ diagram, results, config, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="text-center">
        <ArrowDownTrayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & Reports</h3>
        <p className="text-gray-600">Export and reporting module in development...</p>
      </div>
    </div>
  )
}

export default AnalysisExport