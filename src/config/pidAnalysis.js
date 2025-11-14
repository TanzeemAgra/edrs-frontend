/**
 * P&ID Analysis Configuration
 * Centralized configuration for P&ID analysis features and settings
 * Implements soft coding approach for flexible analysis parameters
 */

const PIDAnalysisConfig = {
  // Analysis Types and Categories
  analysisTypes: {
    PROCESS_FLOW: {
      id: 'process_flow',
      name: 'Process Flow Analysis',
      description: 'Analyze process flow diagrams, streams, and connections',
      icon: 'flow-chart',
      color: 'blue',
      enabled: true,
      algorithms: ['flow_detection', 'stream_tracing', 'connectivity_analysis'],
      parameters: {
        minStreamWidth: 2,
        maxGapTolerance: 10,
        confidenceThreshold: 0.85
      }
    },
    INSTRUMENTATION: {
      id: 'instrumentation',
      name: 'Instrumentation Analysis',
      description: 'Identify and analyze instruments, control systems, and loops',
      icon: 'cog',
      color: 'emerald',
      enabled: true,
      algorithms: ['symbol_recognition', 'tag_extraction', 'loop_analysis'],
      parameters: {
        symbolMatchThreshold: 0.90,
        tagValidationPattern: '^[A-Z]{2,3}[0-9]{3,4}[A-Z]?$',
        loopDetectionRadius: 50
      }
    },
    EQUIPMENT: {
      id: 'equipment',
      name: 'Equipment Analysis',
      description: 'Analyze equipment symbols, specifications, and connections',
      icon: 'cpu-chip',
      color: 'purple',
      enabled: true,
      algorithms: ['equipment_detection', 'spec_extraction', 'sizing_analysis'],
      parameters: {
        equipmentMinSize: 20,
        specTextThreshold: 0.80,
        connectionTolerance: 15
      }
    },
    SAFETY_SYSTEMS: {
      id: 'safety_systems',
      name: 'Safety Systems Analysis',
      description: 'Analyze safety instrumented systems and protective devices',
      icon: 'shield-check',
      color: 'red',
      enabled: true,
      algorithms: ['safety_loop_detection', 'sil_analysis', 'interlock_mapping'],
      parameters: {
        silLevelDetection: true,
        interlockRadius: 30,
        safetyLoopValidation: 0.95
      }
    },
    COMPLIANCE_CHECK: {
      id: 'compliance_check',
      name: 'Standards Compliance',
      description: 'Check compliance with industry standards (ISA, IEC, ANSI)',
      icon: 'check-circle',
      color: 'green',
      enabled: true,
      algorithms: ['standard_validation', 'symbol_compliance', 'drawing_standards'],
      parameters: {
        standards: ['ISA-5.1', 'IEC-62424', 'ANSI-Y32.11'],
        strictMode: false,
        reportNonCompliance: true
      }
    }
  },

  // Default Analysis Settings
  defaultAnalysisSettings: {
    enabledTypes: ['process_flow', 'instrumentation', 'equipment', 'safety_systems', 'compliance_check'],
    outputFormats: ['json', 'xml', 'pdf'],
    qualityLevel: 'high', // low, medium, high, ultra
    processingOptions: {
      useAI: true,
      useMachineLearning: true,
      usePatternRecognition: true,
      useOCR: true,
      preprocessImage: true,
      enhanceQuality: true,
      removeNoise: true,
      correctSkew: true
    },
    validationOptions: {
      crossReferenceCheck: true,
      consistencyValidation: true,
      completenessCheck: true,
      accuracyVerification: true
    },
    reportingOptions: {
      generateSummary: true,
      includeVisualizations: true,
      includeRecommendations: true,
      includeComplianceReport: true,
      detailLevel: 'comprehensive' // basic, standard, comprehensive
    }
  },

  // Analysis Algorithms Configuration
  algorithms: {
    COMPUTER_VISION: {
      name: 'Computer Vision Engine',
      models: {
        symbolRecognition: {
          modelPath: '/models/symbol_recognition_v2.1.onnx',
          confidence: 0.85,
          nmsThreshold: 0.4,
          classes: ['valve', 'pump', 'tank', 'vessel', 'instrument', 'pipe', 'fitting']
        },
        textExtraction: {
          ocrEngine: 'tesseract',
          languages: ['eng'],
          confidence: 0.70,
          preprocessing: ['denoise', 'enhance_contrast', 'deskew']
        },
        lineDetection: {
          algorithm: 'hough_transform',
          minLineLength: 10,
          maxLineGap: 5,
          threshold: 50
        }
      }
    },
    MACHINE_LEARNING: {
      name: 'ML Classification Engine',
      models: {
        equipmentClassifier: {
          modelType: 'random_forest',
          features: ['shape', 'size', 'context', 'text_content'],
          accuracy: 0.92,
          version: '1.3.0'
        },
        processFlowPredictor: {
          modelType: 'neural_network',
          architecture: 'CNN-LSTM',
          accuracy: 0.89,
          version: '2.1.0'
        }
      }
    },
    RULE_BASED: {
      name: 'Rule-Based Analysis',
      rules: {
        standardsCompliance: '/rules/standards_compliance.json',
        safetyValidation: '/rules/safety_validation.json',
        connectivityRules: '/rules/connectivity_rules.json'
      }
    }
  },

  // Error Categories and Severity Levels
  errorCategories: {
    CRITICAL: {
      level: 'critical',
      color: 'red',
      priority: 1,
      autoReport: true,
      categories: [
        'Safety system malfunction',
        'Critical equipment missing',
        'Dangerous process conditions',
        'Regulatory non-compliance'
      ]
    },
    HIGH: {
      level: 'high',
      color: 'orange',
      priority: 2,
      autoReport: true,
      categories: [
        'Equipment specification errors',
        'Instrumentation inconsistencies',
        'Process flow irregularities',
        'Standard violations'
      ]
    },
    MEDIUM: {
      level: 'medium',
      color: 'yellow',
      priority: 3,
      autoReport: false,
      categories: [
        'Drawing inconsistencies',
        'Symbol placement issues',
        'Text readability problems',
        'Minor standard deviations'
      ]
    },
    LOW: {
      level: 'low',
      color: 'blue',
      priority: 4,
      autoReport: false,
      categories: [
        'Cosmetic issues',
        'Recommended improvements',
        'Optimization suggestions',
        'Best practice recommendations'
      ]
    },
    INFO: {
      level: 'info',
      color: 'gray',
      priority: 5,
      autoReport: false,
      categories: [
        'General information',
        'Statistics',
        'Analysis metadata',
        'Processing notes'
      ]
    }
  },

  // Industry Standards Configuration
  industryStandards: {
    ISA: {
      'ISA-5.1': {
        name: 'Instrumentation Symbols and Identification',
        version: '2009',
        scope: 'instrumentation',
        rules: '/standards/isa-5.1.json',
        enabled: true
      },
      'ISA-5.2': {
        name: 'Binary Logic Diagrams for Process Operations',
        version: '1976',
        scope: 'logic_diagrams',
        rules: '/standards/isa-5.2.json',
        enabled: true
      },
      'ISA-5.3': {
        name: 'Computer Control System Graphics',
        version: '1983',
        scope: 'control_systems',
        rules: '/standards/isa-5.3.json',
        enabled: true
      }
    },
    IEC: {
      'IEC-62424': {
        name: 'Representation of process control engineering',
        version: '2016',
        scope: 'process_control',
        rules: '/standards/iec-62424.json',
        enabled: true
      }
    },
    ANSI: {
      'ANSI-Y32.11': {
        name: 'Graphic Symbols for Process Flow Diagrams',
        version: '1961',
        scope: 'process_flow',
        rules: '/standards/ansi-y32.11.json',
        enabled: true
      }
    },
    API: {
      'API-RP-551': {
        name: 'Process Measurement Instrumentation',
        version: '2019',
        scope: 'measurement',
        rules: '/standards/api-rp-551.json',
        enabled: true
      }
    }
  },

  // Default Filter Settings
  defaultFilters: {
    errorLevels: ['critical', 'high', 'medium'],
    analysisTypes: ['process_flow', 'instrumentation', 'equipment'],
    showOnlyIssues: false,
    includeRecommendations: true,
    groupByCategory: true,
    sortBy: 'severity', // severity, location, type, timestamp
    sortOrder: 'desc'
  },

  // Export Configuration
  exportOptions: {
    formats: {
      PDF: {
        extension: 'pdf',
        mimeType: 'application/pdf',
        template: 'comprehensive_report',
        includeImages: true,
        includeCharts: true,
        pageSize: 'A4',
        orientation: 'portrait'
      },
      EXCEL: {
        extension: 'xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        includeCharts: true,
        multipleSheets: true,
        formatting: true
      },
      JSON: {
        extension: 'json',
        mimeType: 'application/json',
        pretty: true,
        includeMetadata: true
      },
      XML: {
        extension: 'xml',
        mimeType: 'application/xml',
        schema: 'pid_analysis_v1.0',
        validation: true
      },
      CSV: {
        extension: 'csv',
        mimeType: 'text/csv',
        delimiter: ',',
        includeHeaders: true
      }
    },
    templates: {
      executive_summary: 'Executive Summary Report',
      technical_detailed: 'Technical Detailed Report',
      compliance_report: 'Compliance Assessment Report',
      safety_analysis: 'Safety Analysis Report',
      custom: 'Custom Report Template'
    }
  },

  // Performance and Quality Settings
  performance: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxResolution: 8000, // pixels
    timeoutSettings: {
      analysis: 300000, // 5 minutes
      upload: 120000, // 2 minutes
      export: 180000 // 3 minutes
    },
    qualitySettings: {
      minDpi: 150,
      recommendedDpi: 300,
      maxDpi: 600,
      imageEnhancement: true,
      noiseReduction: true
    },
    parallelProcessing: {
      enabled: true,
      maxWorkers: 4,
      chunkSize: 1024
    }
  },

  // AI and ML Model Configuration
  aiModels: {
    symbolDetection: {
      model: 'yolo_v8_custom',
      version: '2.1.0',
      accuracy: 0.94,
      inferenceTime: '150ms',
      supportedFormats: ['pdf', 'jpg', 'png', 'tiff']
    },
    textExtraction: {
      model: 'paddle_ocr_v3',
      version: '3.0.1',
      accuracy: 0.91,
      languages: ['en', 'fr', 'de', 'es'],
      confidence: 0.75
    },
    classificationModel: {
      model: 'resnet_101_custom',
      version: '1.5.2',
      categories: 150,
      accuracy: 0.89,
      preprocessing: ['normalize', 'resize', 'augment']
    }
  },

  // User Interface Configuration
  uiConfig: {
    theme: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'indigo',
      success: 'green',
      warning: 'yellow',
      error: 'red'
    },
    animations: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out'
    },
    responsiveBreakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },

  // Notification and Alert Settings
  notifications: {
    analysisComplete: {
      enabled: true,
      sound: true,
      desktop: true,
      email: false
    },
    criticalErrors: {
      enabled: true,
      sound: true,
      desktop: true,
      email: true,
      sms: false
    },
    progressUpdates: {
      enabled: true,
      interval: 10, // percentage points
      sound: false
    }
  },

  // Integration Settings
  integrations: {
    cloudStorage: {
      enabled: false,
      providers: ['aws_s3', 'azure_blob', 'google_cloud'],
      syncResults: true,
      autoBackup: true
    },
    externalSystems: {
      enabled: false,
      apis: ['plant_3d', 'autocad', 'microstation'],
      authentication: 'oauth2'
    }
  }
}

export default PIDAnalysisConfig