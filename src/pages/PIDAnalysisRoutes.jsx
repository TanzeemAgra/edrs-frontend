/**
 * P&ID Analysis Routes
 * Routing configuration for P&ID analysis pages
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PIDAnalysisDashboard from '../components/pid-analysis/PIDAnalysisDashboard';
import ProjectDetail from '../components/pid-analysis/ProjectDetail';
import PIDAnalysisDetailed from './PIDAnalysis/PIDAnalysisDetailed';

const PIDAnalysisRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PIDAnalysisDashboard />} />
      <Route path="/detailed" element={<PIDAnalysisDetailed />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/projects/:projectId/diagrams/:diagramId" element={<PIDAnalysisDetailed />} />
      <Route path="*" element={<Navigate to="/pid-analysis" replace />} />
    </Routes>
  );
};

export default PIDAnalysisRoutes;