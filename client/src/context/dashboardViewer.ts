import { createContext } from 'react';

import { DashboardViewer } from '../types/dashboard';

export interface DashboardViewerContextType {
  dashboardViewer: DashboardViewer;
  setDashboardViewer: (dashboardViewer: DashboardViewer) => void;
}

export const DashboardViewerContext = createContext<DashboardViewerContextType>(
  {
    dashboardViewer: {},
    setDashboardViewer: () => undefined,
  }
);
