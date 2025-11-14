/**
 * Analysis Progress UI Components
 * Reusable UI components for analysis progress display
 */

import React from 'react';
import { 
  ClockIcon, 
  CpuChipIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../ui/LoadingSpinner';
import { STYLING, STATUS_TYPES } from '../../constants/analysisProgressConfig';

/**
 * Status Icon Component
 */
export const StatusIcon = ({ status, className = '' }) => {
  const iconClass = `${STYLING.ICONS.size.medium} ${className}`;
  
  switch (status) {
    case STATUS_TYPES.COMPLETED:
      return <CheckCircleIcon className={`${iconClass} ${STYLING.COLORS.success.icon}`} />;
    case STATUS_TYPES.CURRENT:
      return <LoadingSpinner size="sm" />;
    case STATUS_TYPES.ERROR:
      return <ExclamationTriangleIcon className={`${iconClass} ${STYLING.COLORS.error.icon}`} />;
    default:
      return <ClockIcon className={`${iconClass} text-gray-400`} />;
  }
};

/**
 * Progress Bar Component
 */
export const ProgressBar = ({ progress = 0, className = '' }) => {
  return (
    <div className={`${STYLING.PROGRESS_BAR.container} ${className}`}>
      <div 
        className={STYLING.PROGRESS_BAR.fill}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
};

/**
 * Analysis Header Component
 */
export const AnalysisHeader = ({ title, model, className = '' }) => {
  return (
    <div className={`${STYLING.LAYOUT.flexBetween} ${STYLING.LAYOUT.spacing.mb2} ${className}`}>
      <h3 className={`${STYLING.TEXT.title} text-gray-900`}>{title}</h3>
      <div className={`${STYLING.LAYOUT.flex} ${STYLING.TEXT.info} text-gray-600`}>
        <CpuChipIcon className={`${STYLING.ICONS.size.small} ${STYLING.ICONS.spacing.right1}`} />
        {model}
      </div>
    </div>
  );
};

/**
 * Progress Summary Component
 */
export const ProgressSummary = ({ progress, label, className = '' }) => {
  return (
    <div className={`${STYLING.LAYOUT.spacing.mb4} ${className}`}>
      <div className={`${STYLING.LAYOUT.flexBetween} ${STYLING.TEXT.info} ${STYLING.LAYOUT.spacing.mb1}`}>
        <span className={STYLING.COLORS.status.pending}>{label}</span>
        <span className={STYLING.TEXT.progressValue}>{Math.round(progress)}%</span>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

/**
 * Current Step Display Component
 */
export const CurrentStepDisplay = ({ step, className = '' }) => {
  if (!step) return null;
  
  return (
    <div className={`${STYLING.CONTAINERS.currentStep} ${className}`}>
      <div className={STYLING.LAYOUT.flex}>
        <LoadingSpinner size="sm" className={STYLING.ICONS.spacing.right3} />
        <div>
          <p className={`${STYLING.TEXT.label} ${STYLING.COLORS.stepInfo.title}`}>
            {step.label}
          </p>
          <p className={`${STYLING.TEXT.description} ${STYLING.COLORS.stepInfo.description}`}>
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Step List Item Component
 */
export const StepListItem = ({ step, status, className = '' }) => {
  const statusColorClass = STYLING.COLORS.status[status] || STYLING.COLORS.status.pending;
  const statusLabel = getStatusLabel(status);
  
  return (
    <div className={`${STYLING.LAYOUT.flex} ${className}`}>
      <div className={`flex-shrink-0 ${STYLING.ICONS.spacing.right3}`}>
        <StatusIcon status={status} />
      </div>
      <div className="flex-1">
        <div className={STYLING.LAYOUT.flexBetween}>
          <span className={`${STYLING.TEXT.label} ${statusColorClass}`}>
            {step.label}
          </span>
          <span className={`${STYLING.TEXT.smallInfo} text-gray-500`}>
            {statusLabel}
          </span>
        </div>
        <p className={`${STYLING.TEXT.description} text-gray-500 ${STYLING.LAYOUT.spacing.mt1}`}>
          {step.description}
        </p>
      </div>
    </div>
  );
};

/**
 * Session Info Field Component
 */
export const SessionInfoField = ({ label, value, className = '' }) => {
  return (
    <div className={className}>
      <span className="text-gray-500">{label}:</span>
      <span className={`${STYLING.LAYOUT.spacing.ml2} text-gray-900 ${className}`}>
        {value}
      </span>
    </div>
  );
};

/**
 * Error Display Component
 */
export const ErrorDisplay = ({ error, title = 'Analysis Failed', className = '' }) => {
  return (
    <div className={`${STYLING.CONTAINERS.error} ${className}`}>
      <div className={STYLING.LAYOUT.flex}>
        <ExclamationTriangleIcon 
          className={`${STYLING.ICONS.size.large} ${STYLING.COLORS.error.icon} ${STYLING.ICONS.spacing.right3}`} 
        />
        <div>
          <h3 className={`${STYLING.TEXT.title} ${STYLING.COLORS.error.title}`}>{title}</h3>
          <p className={`${STYLING.TEXT.info} ${STYLING.COLORS.error.text} ${STYLING.LAYOUT.spacing.mt1}`}>
            {error}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Success Display Component
 */
export const SuccessDisplay = ({ 
  title = 'Analysis Complete', 
  message, 
  errorCount, 
  className = '' 
}) => {
  return (
    <div className={`${STYLING.CONTAINERS.success} ${className}`}>
      <div className={STYLING.LAYOUT.flex}>
        <CheckCircleIcon 
          className={`${STYLING.ICONS.size.large} ${STYLING.COLORS.success.icon} ${STYLING.ICONS.spacing.right3}`} 
        />
        <div>
          <h3 className={`${STYLING.TEXT.title} ${STYLING.COLORS.success.title}`}>{title}</h3>
          <p className={`${STYLING.TEXT.info} ${STYLING.COLORS.success.text} ${STYLING.LAYOUT.spacing.mt1}`}>
            {message}
            {errorCount && ` Found ${errorCount} issues for review.`}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get status label
const getStatusLabel = (status) => {
  const labels = {
    [STATUS_TYPES.COMPLETED]: 'Done',
    [STATUS_TYPES.CURRENT]: 'In Progress',
    [STATUS_TYPES.PENDING]: 'Pending',
    [STATUS_TYPES.ERROR]: 'Error'
  };
  return labels[status] || 'Unknown';
};