import { createContext } from 'react';

import { League } from '../types/league';

export interface LeagueContextType {
  league: League;
  setLeague: (league: League) => void;
}

// Context used in admin - teams page.
export const LeagueContext = createContext<LeagueContextType>({
  // Initial value - will get overwritten from data fetch.
  league: {
    id: 0,
    name: '',
    isActive: false,
    leagueAgeType: '',
    year: '',
    leagueType: '',
    maxYellowCard: 0,
    leagueTeams: [],
    matches: [],
  },

  setLeague: () => undefined,
});
