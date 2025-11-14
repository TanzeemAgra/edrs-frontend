/**
 * Analysis Progress Utilities
 * Business logic for P&ID analysis progress tracking
 */

import {
  ANALYSIS_STEPS,
  STATUS_TYPES,
  ANALYSIS_STATES,
  PROGRESS_THRESHOLDS,
  TIME_FORMAT,
  SESSION_DISPLAY
} from '../constants/analysisProgressConfig';

/**
 * Get all progress steps configuration
 * @returns {Array} Array of step configurations
 */
export const getProgressSteps = () => ANALYSIS_STEPS;

/**
 * Find current step based on progress percentage
 * @param {number} progress - Current progress percentage (0-100)
 * @returns {Object} Current step configuration
 */
export const getCurrentStep = (progress = 0) => {
  const steps = getProgressSteps();
  return steps.find(step => 
    progress >= step.minProgress && progress < step.maxProgress
  ) || steps[steps.length - 1];
};

/**
 * Determine step status based on current progress
 * @param {Object} step - Step configuration object
 * @param {number} progress - Current progress percentage
 * @returns {string} Step status ('completed', 'current', 'pending')
 */
export const getStepStatus = (step, progress = 0) => {
  if (progress > step.maxProgress) return STATUS_TYPES.COMPLETED;
  if (progress >= step.minProgress) return STATUS_TYPES.CURRENT;
  return STATUS_TYPES.PENDING;
};

/**
 * Get analysis state based on loading, progress, and error conditions
 * @param {boolean} isLoading - Whether analysis is currently loading
 * @param {number} progress - Current progress percentage
 * @param {string|null} error - Error message if any
 * @returns {string} Analysis state
 */
export const getAnalysisState = (isLoading, progress = 0, error = null) => {
  if (error) return ANALYSIS_STATES.ERROR;
  if (!isLoading && progress === PROGRESS_THRESHOLDS.COMPLETE) {
    return ANALYSIS_STATES.COMPLETED;
  }
  if (isLoading || progress > 0) return ANALYSIS_STATES.RUNNING;
  return ANALYSIS_STATES.IDLE;
};

/**
 * Format duration in seconds to human-readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';
  
  if (seconds < TIME_FORMAT.SECONDS_IN_MINUTE) {
    return `${Math.round(seconds)}s`;
  }
  
  const minutes = Math.floor(seconds / TIME_FORMAT.SECONDS_IN_MINUTE);
  const remainingSeconds = Math.round(seconds % TIME_FORMAT.SECONDS_IN_MINUTE);
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Format session ID for display
 * @param {string|number} sessionId - Full session ID
 * @returns {string} Truncated session ID
 */
export const formatSessionId = (sessionId) => {
  if (!sessionId) return 'N/A';
  return sessionId.toString().slice(0, SESSION_DISPLAY.ID_SLICE_LENGTH) + '...';
};

/**
 * Get session field configuration for display
 * @returns {Array} Array of session field configurations
 */
export const getSessionFields = () => SESSION_DISPLAY.FIELDS;

/**
 * Format session field value using configured formatter
 * @param {Object} field - Field configuration
 * @param {*} value - Raw field value
 * @returns {string} Formatted field value
 */
export const formatSessionFieldValue = (field, value) => {
  if (!value) return 'N/A';
  
  if (field.formatter) {
    return field.formatter(value);
  }
  
  return value.toString();
};

/**
 * Calculate progress bar width percentage
 * @param {number} progress - Current progress (0-100)
 * @returns {number} Clamped progress percentage
 */
export const calculateProgressWidth = (progress = 0) => {
  return Math.max(0, Math.min(100, progress));
};

/**
 * Generate step progress indicator data
 * @param {Array} steps - Array of step configurations
 * @param {number} currentProgress - Current progress percentage
 * @returns {Array} Array of step data with status
 */
export const generateStepsData = (steps, currentProgress = 0) => {
  return steps.map((step, index) => ({
    ...step,
    status: getStepStatus(step, currentProgress),
    index: index + 1
  }));
};

/**
 * Check if analysis is complete
 * @param {number} progress - Current progress percentage
 * @param {boolean} isLoading - Whether still loading
 * @returns {boolean} True if analysis is complete
 */
export const isAnalysisComplete = (progress = 0, isLoading = false) => {
  return !isLoading && progress === PROGRESS_THRESHOLDS.COMPLETE;
};

/**
 * Check if analysis has error
 * @param {string|null} error - Error message
 * @returns {boolean} True if there's an error
 */
export const hasAnalysisError = (error) => {
  return Boolean(error);
};

/**
 * Get display data for analysis session
 * @param {Object} session - Analysis session data
 * @returns {Object} Processed session display data
 */
export const getSessionDisplayData = (session) => {
  if (!session) return null;

  const fields = getSessionFields();
  const displayData = {};

  fields.forEach(field => {
    const value = session[field.key];
    if (value !== undefined && value !== null) {
      displayData[field.key] = {
        label: field.label,
        value: formatSessionFieldValue(field, value),
        className: field.className || ''
      };
    }
  });

  return displayData;
};

/**
 * Validate progress value
 * @param {number} progress - Progress value to validate
 * @returns {number} Valid progress value (0-100)
 */
export const validateProgress = (progress) => {
  const numProgress = Number(progress);
  if (isNaN(numProgress)) return 0;
  return Math.max(0, Math.min(100, numProgress));
};