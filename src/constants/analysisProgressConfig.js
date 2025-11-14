/**
 * Analysis Progress Configuration
 * Centralized configuration for P&ID analysis progress tracking
 */

export const ANALYSIS_STEPS = [
  {
    id: 'preprocessing',
    label: 'Image Preprocessing',
    minProgress: 0,
    maxProgress: 20,
    description: 'Preparing diagram for analysis',
    icon: 'preprocessing'
  },
  {
    id: 'ocr',
    label: 'Text Extraction (OCR)',
    minProgress: 20,
    maxProgress: 40,
    description: 'Extracting text and symbols',
    icon: 'text'
  },
  {
    id: 'element_detection',
    label: 'Element Detection',
    minProgress: 40,
    maxProgress: 60,
    description: 'Identifying P&ID elements',
    icon: 'detection'
  },
  {
    id: 'ai_analysis',
    label: 'AI Analysis',
    minProgress: 60,
    maxProgress: 80,
    description: 'AI-powered error detection',
    icon: 'ai'
  },
  {
    id: 'results_compilation',
    label: 'Results Compilation',
    minProgress: 80,
    maxProgress: 100,
    description: 'Finalizing analysis results',
    icon: 'results'
  }
];

export const STATUS_TYPES = {
  PENDING: 'pending',
  CURRENT: 'current',
  COMPLETED: 'completed',
  ERROR: 'error'
};

export const ANALYSIS_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  COMPLETED: 'completed',
  ERROR: 'error'
};

export const PROGRESS_THRESHOLDS = {
  COMPLETE: 100,
  ERROR_THRESHOLD: 5, // Minimum progress before considering it stuck
  UPDATE_INTERVAL: 1000 // Progress update interval in ms
};

export const MESSAGES = {
  ANALYSIS_FAILED: 'Analysis Failed',
  ANALYSIS_COMPLETE: 'Analysis Complete',
  ANALYSIS_IN_PROGRESS: 'Analysis in Progress',
  ANALYSIS_STEPS_TITLE: 'Analysis Steps',
  SESSION_INFO_TITLE: 'Session Information',
  OVERALL_PROGRESS: 'Overall Progress',
  DEFAULT_AI_MODEL: 'AI Model',
  SUCCESS_MESSAGE: 'P&ID analysis completed successfully.',
  ERROR_COUNT_MESSAGE: (count) => ` Found ${count} issues for review.`,
  STATUS_LABELS: {
    [STATUS_TYPES.COMPLETED]: 'Done',
    [STATUS_TYPES.CURRENT]: 'In Progress',
    [STATUS_TYPES.PENDING]: 'Pending',
    [STATUS_TYPES.ERROR]: 'Error'
  }
};

export const STYLING = {
  CONTAINERS: {
    error: 'bg-red-50 border border-red-200 rounded-lg p-6',
    success: 'bg-green-50 border border-green-200 rounded-lg p-6',
    progress: 'bg-white border border-gray-200 rounded-lg p-6',
    currentStep: 'bg-blue-50 border border-blue-200 rounded-md p-4',
    sessionInfo: 'mt-6 pt-4 border-t border-gray-200'
  },
  TEXT: {
    title: 'text-lg font-medium',
    subtitle: 'text-sm font-medium mb-3',
    description: 'text-xs mt-1',
    label: 'text-sm font-medium',
    info: 'text-sm',
    smallInfo: 'text-xs',
    progress: 'text-gray-600',
    progressValue: 'text-gray-900 font-medium'
  },
  COLORS: {
    error: {
      icon: 'text-red-500',
      title: 'text-red-800',
      text: 'text-red-600'
    },
    success: {
      icon: 'text-green-500',
      title: 'text-green-800',
      text: 'text-green-600'
    },
    status: {
      completed: 'text-green-700',
      current: 'text-blue-700',
      pending: 'text-gray-500',
      error: 'text-red-700'
    },
    stepInfo: {
      title: 'text-blue-900',
      description: 'text-blue-600'
    }
  },
  PROGRESS_BAR: {
    container: 'bg-gray-200 rounded-full h-3',
    fill: 'bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out'
  },
  ICONS: {
    size: {
      small: 'h-4 w-4',
      medium: 'h-5 w-5',
      large: 'h-6 w-6'
    },
    spacing: {
      right1: 'mr-1',
      right3: 'mr-3'
    }
  },
  LAYOUT: {
    flex: 'flex items-center',
    flexBetween: 'flex items-center justify-between',
    grid: 'grid grid-cols-2 gap-4',
    spacing: {
      mb1: 'mb-1',
      mb2: 'mb-2',
      mb3: 'mb-3',
      mb4: 'mb-4',
      mb6: 'mb-6',
      mt1: 'mt-1',
      mt6: 'mt-6',
      ml2: 'ml-2'
    }
  }
};

export const TIME_FORMAT = {
  SECONDS_IN_MINUTE: 60,
  DECIMAL_PLACES: 0
};

export const SESSION_DISPLAY = {
  ID_SLICE_LENGTH: 8,
  GRID_COLUMNS: 2,
  FIELDS: [
    {
      key: 'id',
      label: 'Session ID',
      formatter: (value) => value?.toString().slice(0, SESSION_DISPLAY.ID_SLICE_LENGTH) + '...',
      className: 'font-mono'
    },
    {
      key: 'started_at',
      label: 'Started',
      formatter: (value) => new Date(value).toLocaleTimeString()
    },
    {
      key: 'processing_time_seconds',
      label: 'Duration',
      formatter: (value) => {
        if (value < TIME_FORMAT.SECONDS_IN_MINUTE) return `${value}s`;
        const minutes = Math.floor(value / TIME_FORMAT.SECONDS_IN_MINUTE);
        const seconds = value % TIME_FORMAT.SECONDS_IN_MINUTE;
        return `${minutes}m ${seconds}s`;
      }
    },
    {
      key: 'total_elements_detected',
      label: 'Elements Detected'
    }
  ]
};