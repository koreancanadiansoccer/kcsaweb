import { createContext } from 'react';

import { HomeViewer } from '../types/home_viewer';

export interface ViewerContextType {
  viewer: HomeViewer;
  setViewer: (home: HomeViewer) => void;
}

export const ViewerContext = createContext<ViewerContextType>({
  viewer: {},
  setViewer: () => undefined,
});
