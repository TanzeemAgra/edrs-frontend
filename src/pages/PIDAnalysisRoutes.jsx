/**
 * P&ID Analysis Routes
 * Routing configuration for P&ID analysis pages
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PIDAnalysisDashboard from '../components/pid-analysis/PIDAnalysisDashboard';
import ProjectDetail from '../components/pid-analysis/ProjectDetail';

const PIDAnalysisRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PIDAnalysisDashboard />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/pid-analysis" replace />} />
    </Routes>
  );
};

export default PIDAnalysisRoutes;