/**
 * Analysis Progress Component
 * Shows real-time progress of P&ID diagram analysis
 * Refactored with soft coding techniques for maintainability and flexibility
 */

import React, { useMemo } from 'react';
import usePIDAnalysisStore from '../../stores/pidAnalysisStore';
import {
  getProgressSteps,
  getCurrentStep,
  getStepStatus,
  getAnalysisState,
  generateStepsData,
  getSessionDisplayData,
  validateProgress
} from '../../utils/analysisProgressUtils';
import {
  MESSAGES,
  STYLING,
  ANALYSIS_STATES
} from '../../constants/analysisProgressConfig';
import {
  ErrorDisplay,
  SuccessDisplay,
  AnalysisHeader,
  ProgressSummary,
  CurrentStepDisplay,
  StepListItem,
  SessionInfoField
} from './AnalysisProgressComponents';

const AnalysisProgress = ({ sessionId }) => {
  const {
    analysisSession,
    analysisProgress: rawProgress,
    loading,
    error
  } = usePIDAnalysisStore();

  // Memoized computed values using soft-coded utilities
  const analysisProgress = useMemo(() => validateProgress(rawProgress), [rawProgress]);
  const analysisState = useMemo(() => getAnalysisState(loading?.analysis, analysisProgress, error), [loading?.analysis, analysisProgress, error]);
  const currentStep = useMemo(() => getCurrentStep(analysisProgress), [analysisProgress]);
  const steps = useMemo(() => getProgressSteps(), []);
  const stepsData = useMemo(() => generateStepsData(steps, analysisProgress), [steps, analysisProgress]);
  const sessionDisplayData = useMemo(() => getSessionDisplayData(analysisSession), [analysisSession]);

  // Early returns for different states using configuration
  if (analysisState === ANALYSIS_STATES.ERROR) {
    return (
      <ErrorDisplay 
        error={error} 
        title={MESSAGES.ANALYSIS_FAILED}
      />
    );
  }

  if (analysisState === ANALYSIS_STATES.COMPLETED) {
    return (
      <SuccessDisplay
        title={MESSAGES.ANALYSIS_COMPLETE}
        message={MESSAGES.SUCCESS_MESSAGE}
        errorCount={analysisSession?.total_errors_found}
      />
    );
  }

  // Main progress display
  return (
    <div className={STYLING.CONTAINERS.progress}>
      {/* Header Section */}
      <div className={STYLING.LAYOUT.spacing.mb6}>
        <AnalysisHeader
          title={MESSAGES.ANALYSIS_IN_PROGRESS}
          model={analysisSession?.llm_model || MESSAGES.DEFAULT_AI_MODEL}
        />
        
        {/* Progress Summary */}
        <ProgressSummary
          progress={analysisProgress}
          label={MESSAGES.OVERALL_PROGRESS}
        />

        {/* Current Step Display */}
        {currentStep && (
          <CurrentStepDisplay step={currentStep} />
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        <h4 className={`${STYLING.TEXT.subtitle} text-gray-900`}>
          {MESSAGES.ANALYSIS_STEPS_TITLE}
        </h4>
        {stepsData.map((stepData) => (
          <StepListItem
            key={stepData.id}
            step={stepData}
            status={stepData.status}
          />
        ))}
      </div>

      {/* Session Information */}
      {sessionDisplayData && (
        <div className={STYLING.CONTAINERS.sessionInfo}>
          <div className={STYLING.LAYOUT.grid}>
            {Object.entries(sessionDisplayData).map(([key, fieldData]) => (
              <SessionInfoField
                key={key}
                label={fieldData.label}
                value={fieldData.value}
                className={fieldData.className}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;