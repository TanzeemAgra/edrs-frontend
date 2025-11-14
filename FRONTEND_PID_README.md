# EDRS Frontend - P&ID Analysis System

## Overview

The **EDRS P&ID Analysis Frontend** is a modern React application built for Oil & Gas engineering consultancy. It provides a comprehensive interface for uploading, analyzing, and reviewing Piping & Instrumentation Diagrams (P&IDs) using advanced AI technology.

## Features

### 🎯 **P&ID Analysis Dashboard**
- **Project Management**: Create and manage Oil & Gas engineering projects
- **Real-time Statistics**: Live dashboard showing project metrics and analysis progress
- **Interactive Project Cards**: Visual representation of project status and error counts
- **Activity Timeline**: Recent analysis activities and project updates

### 📊 **Advanced Analysis Interface**
- **Drag & Drop Upload**: Intuitive file upload with support for multiple formats (PDF, DWG, PNG, JPEG, TIFF)
- **Real-time Progress**: Live analysis progress tracking with detailed step information
- **AI-Powered Results**: Comprehensive error detection and classification system
- **Interactive Results**: Filter, sort, and manage analysis findings with bulk operations

### 🔍 **Professional Error Management**
- **Severity Classification**: Critical, High, Medium, Low priority error categorization
- **Industry Standards**: Compliance checking against ISA-5.1, ISO 10628, IEC 62424
- **Review Workflow**: Multi-stage review process with approval/rejection capabilities
- **Export Functionality**: Generate professional reports in multiple formats

### 🏭 **Oil & Gas Industry Focus**
- **Project Types**: Support for Upstream, Midstream, Downstream operations
- **Engineering Standards**: Pre-configured industry standard templates
- **Equipment Recognition**: Specialized P&ID element detection and validation
- **Field-Specific Workflows**: Tailored for oil & gas engineering processes

## Technology Stack

### **Core Technologies**
```json
{
  "framework": "React 18.2.0",
  "router": "React Router 6.8.0",
  "stateManagement": "Zustand 4.4.7",
  "styling": "Tailwind CSS 3.3.6",
  "forms": "React Hook Form 7.48.2",
  "icons": "Heroicons 2.0.18"
}
```

### **UI/UX Libraries**
```json
{
  "animations": "Framer Motion 10.16.0",
  "notifications": "React Hot Toast 2.4.1",
  "fileUpload": "React Dropzone 14.2.3",
  "dateHandling": "Date-fns 2.30.0",
  "utilities": "clsx 2.0.0, tailwind-merge 2.0.0"
}
```

### **Development Tools**
```json
{
  "bundler": "Vite 5.0.0",
  "linting": "ESLint 8.55.0",
  "formatting": "Prettier 3.1.0",
  "testing": "Jest 29.7.0, Testing Library",
  "typescript": "TypeScript 5.2.0"
}
```

## Component Architecture

### **Main Components**

#### 1. **PIDAnalysisDashboard**
```jsx
// Main dashboard for P&ID analysis projects
<PIDAnalysisDashboard>
  ├── Project Statistics Cards
  ├── Project Grid/List View
  ├── Recent Activity Timeline
  └── Create Project Modal
</PIDAnalysisDashboard>
```

#### 2. **ProjectDetail**
```jsx
// Detailed project management interface
<ProjectDetail>
  ├── Project Header & Statistics
  ├── Tabbed Interface (Diagrams/Analysis/Settings)
  ├── Diagram Upload Component
  ├── Analysis Progress Tracker
  └── Results Management
</ProjectDetail>
```

#### 3. **DiagramUpload**
```jsx
// Advanced file upload with metadata
<DiagramUpload>
  ├── Drag & Drop Zone
  ├── File Validation & Preview
  ├── Progress Tracking
  └── Diagram Metadata Form
</DiagramUpload>
```

#### 4. **AnalysisResults**
```jsx
// Comprehensive results management
<AnalysisResults>
  ├── Filter & Search Interface
  ├── Severity-based Grouping
  ├── Bulk Operations Panel
  └── Individual Result Cards
</AnalysisResults>
```

### **Store Management (Zustand)**

```javascript
// Global state management for P&ID analysis
const usePIDAnalysisStore = {
  // State
  projects: [],
  currentProject: null,
  diagrams: [],
  analysisResults: [],
  loading: { projects, diagrams, analysis, upload },
  
  // Actions
  fetchProjects,
  createProject,
  uploadDiagram,
  startAnalysis,
  fetchAnalysisResults,
  exportResults
}
```

## Installation & Setup

### **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### **Installation**
```bash
# Clone repository
git clone <repository-url>
cd edrs-frontend

# Install dependencies
npm install

# Install P&ID analysis specific packages
npm install react-dropzone

# Start development server
npm run dev
```

### **Environment Configuration**
```bash
# .env file configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=EDRS
VITE_ENABLE_DEBUG=true
```

## Usage Guide

### **1. Creating a New P&ID Project**

```jsx
// Navigate to P&ID Analysis Dashboard
http://localhost:3000/pid-analysis

// Click "New Project" button
// Fill in project details:
{
  name: "Offshore Platform Alpha",
  projectType: "upstream",
  engineeringStandard: "isa_5_1",
  fieldName: "North Sea Field 1",
  clientCompany: "Global Energy Corp"
}
```

### **2. Uploading P&ID Diagrams**

```jsx
// From Project Detail page
// Click "Upload Diagram" button
// Drag & drop files or browse:

// Supported formats:
- PDF (up to 50MB)
- DWG (AutoCAD)
- PNG, JPEG, TIFF (images)

// Required metadata:
{
  drawingNumber: "P&ID-100-001",
  drawingTitle: "Process Unit 1 - Main Flow",
  revision: "Rev A",
  diagramType: "piping"
}
```

### **3. Starting Analysis**

```jsx
// From diagram card, click "Analyze" button
// Analysis configuration:
{
  llmModel: "gpt-4",
  analysisDepth: "comprehensive",
  includeRecommendations: true
}

// Real-time progress tracking:
- Image Preprocessing (0-20%)
- Text Extraction OCR (20-40%)
- Element Detection (40-60%)
- AI Analysis (60-80%)
- Results Compilation (80-100%)
```

### **4. Managing Results**

```jsx
// Filter results by:
- Severity: Critical, High, Medium, Low
- Category: Equipment, Instrumentation, Safety
- Status: Pending, Reviewed, Approved, Rejected

// Bulk operations:
- Mark as Reviewed
- Approve/Reject multiple results
- Export filtered results
```

## API Integration

### **Service Layer**
```javascript
// services/pidAnalysis.js
export const projectsAPI = {
  getProjects: (params) => api.get('/projects/', { params }),
  createProject: (data) => api.post('/projects/', data),
  // ... other project endpoints
}

export const diagramsAPI = {
  uploadDiagram: (projectId, formData, onProgress) => 
    api.post(`/projects/${projectId}/diagrams/`, formData, {
      onUploadProgress: onProgress
    }),
  // ... other diagram endpoints
}
```

### **Error Handling**
```javascript
// Automatic error handling with toast notifications
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);
```

## Styling & Design

### **Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {...}, // Custom brand colors
        severity: {
          critical: '#EF4444',
          high: '#F97316', 
          medium: '#EAB308',
          low: '#3B82F6'
        }
      }
    }
  }
}
```

### **Component Styling Patterns**
```jsx
// Consistent styling patterns across components
const severityColors = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200'
};
```

## Performance Optimization

### **Code Splitting**
```jsx
// Lazy loading for P&ID analysis routes
const PIDAnalysisRoutes = React.lazy(() => 
  import('./pages/PIDAnalysisRoutes')
);
```

### **State Management**
```javascript
// Optimized Zustand store with devtools
const usePIDAnalysisStore = create(
  devtools((set, get) => ({
    // Efficient state updates and selectors
  }), { name: 'pid-analysis-store' })
);
```

### **Image Optimization**
```jsx
// Optimized file upload handling
const onDrop = useCallback((acceptedFiles) => {
  // File validation and preprocessing
  const file = acceptedFiles[0];
  if (file.size > MAX_FILE_SIZE) {
    setError('File too large');
    return;
  }
  // Process file...
}, []);
```

## Testing

### **Component Testing**
```bash
# Run test suite
npm test

# Run with coverage
npm run test:coverage

# Test specific components
npm test -- --testPathPattern=PIDAnalysis
```

### **Example Tests**
```jsx
// __tests__/PIDAnalysisDashboard.test.jsx
describe('PIDAnalysisDashboard', () => {
  test('renders project statistics correctly', () => {
    render(<PIDAnalysisDashboard />);
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
  });
  
  test('creates new project successfully', async () => {
    // Test project creation workflow
  });
});
```

## Deployment

### **Build Process**
```bash
# Production build
npm run build

# Build analysis
npm run build:analyze

# Preview production build
npm run preview
```

### **Environment Variables**
```bash
# Production environment
VITE_API_BASE_URL=https://edrs-backend-production.up.railway.app
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
```

## Troubleshooting

### **Common Issues**

#### 1. **File Upload Problems**
```javascript
// Check file size and format validation
const SUPPORTED_FORMATS = {
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  // ... other formats
};
```

#### 2. **API Connection Issues**
```javascript
// Verify environment variables
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Check network requests in browser dev tools
// Ensure backend CORS is properly configured
```

#### 3. **State Management Issues**
```javascript
// Check Zustand devtools for state changes
// Verify store subscriptions and updates
const projects = usePIDAnalysisStore(state => state.projects);
```

## Contributing

### **Development Workflow**
1. Create feature branch from main
2. Implement component with tests
3. Update documentation
4. Submit pull request
5. Code review and merge

### **Code Standards**
- Follow ESLint configuration
- Use Prettier for formatting
- Write comprehensive tests
- Document complex components
- Follow accessibility guidelines

## Future Enhancements

### **Planned Features**
- **3D Visualization**: Interactive 3D P&ID rendering
- **Mobile App**: React Native mobile application
- **Offline Mode**: Progressive Web App capabilities
- **Advanced AI**: Custom ML model integration
- **Collaboration**: Real-time multi-user editing

### **Performance Improvements**
- **Virtual Scrolling**: For large result sets
- **Image Optimization**: WebP format support
- **Caching Strategy**: Improved data caching
- **Bundle Optimization**: Further code splitting

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Compatibility**: React 18+, Node.js 18+  
**License**: MIT

For technical support and feature requests, please create an issue in the project repository.