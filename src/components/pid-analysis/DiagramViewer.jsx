/**
 * Diagram Viewer Component
 * Interactive P&ID diagram visualization with zoom, pan, and annotation features
 */

import React, { useState, useRef, useEffect } from 'react'
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

const DiagramViewer = ({ diagram, results, viewSettings, onViewSettingsChange }) => {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [selectedAnnotation, setSelectedAnnotation] = useState(null)
  const canvasRef = useRef(null)

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 300)
    setZoomLevel(newZoom)
    onViewSettingsChange?.({ ...viewSettings, zoomLevel: newZoom })
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 25)
    setZoomLevel(newZoom)
    onViewSettingsChange?.({ ...viewSettings, zoomLevel: newZoom })
  }

  const handleFitToScreen = () => {
    setZoomLevel(100)
    setPanPosition({ x: 0, y: 0 })
    onViewSettingsChange?.({ ...viewSettings, zoomLevel: 100 })
  }

  if (!diagram) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <EyeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Diagram Selected</h3>
          <p className="text-gray-600">Please select a diagram to view and analyze.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Viewer Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">{diagram.name}</h3>
          <span className="text-sm text-gray-500">
            {diagram.file_size ? `${(diagram.file_size / 1024 / 1024).toFixed(1)} MB` : ''}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <MagnifyingGlassMinusIcon className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <MagnifyingGlassPlusIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={handleFitToScreen}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </button>
          
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Diagram Canvas */}
      <div className="relative h-96 md:h-[600px] overflow-hidden bg-gray-50">
        {diagram.processed_image_url || diagram.original_file_url ? (
          <img
            ref={canvasRef}
            src={diagram.processed_image_url || diagram.original_file_url}
            alt={diagram.name}
            className="max-w-none transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel / 100}) translate(${panPosition.x}px, ${panPosition.y}px)`,
              transformOrigin: 'top left'
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Diagram image not available</p>
            </div>
          </div>
        )}
        
        {/* Analysis Annotations Overlay */}
        {viewSettings?.highlightErrors && results && (
          <div className="absolute inset-0 pointer-events-none">
            {results.slice(0, 10).map((result, index) => (
              <div
                key={index}
                className={`absolute w-4 h-4 rounded-full border-2 animate-pulse ${
                  result.severity === 'critical' ? 'bg-red-500 border-red-300' :
                  result.severity === 'high' ? 'bg-orange-500 border-orange-300' :
                  result.severity === 'medium' ? 'bg-yellow-500 border-yellow-300' :
                  'bg-blue-500 border-blue-300'
                }`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  transform: `scale(${zoomLevel / 100})`
                }}
                title={result.title || result.description}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Viewer Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>Resolution: {diagram.resolution || '300 DPI'}</span>
          <span>Format: {diagram.file_format || 'PDF'}</span>
          {results && (
            <span>{results.length} annotations</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="show-grid"
            checked={viewSettings?.showGrid || false}
            onChange={(e) => onViewSettingsChange?.({ 
              ...viewSettings, 
              showGrid: e.target.checked 
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="show-grid">Show Grid</label>
          
          <input
            type="checkbox"
            id="highlight-errors"
            checked={viewSettings?.highlightErrors || false}
            onChange={(e) => onViewSettingsChange?.({ 
              ...viewSettings, 
              highlightErrors: e.target.checked 
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-4"
          />
          <label htmlFor="highlight-errors">Highlight Issues</label>
        </div>
      </div>
    </div>
  )
}

export default DiagramViewer