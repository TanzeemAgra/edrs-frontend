import React from 'react'
import { CpuChipIcon } from '@heroicons/react/24/outline'

const EquipmentAnalysis = ({ diagram, results, config, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="text-center">
        <CpuChipIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipment Analysis</h3>
        <p className="text-gray-600">Equipment analysis module in development...</p>
      </div>
    </div>
  )
}

export default EquipmentAnalysis