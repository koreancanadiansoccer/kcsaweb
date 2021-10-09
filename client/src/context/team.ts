import { createContext } from 'react';

import { Team } from '../types/team';

export interface TeamContextType {
  team: Team;
  setTeam: (team: Team) => void;
}

// Context used in admin - teams page.
export const TeamContext = createContext<TeamContextType>({
  // Initial value - will get overwritten from data fetch.
  team: {
    id: 0,
    name: '',
    teamAgeType: '',
    teamColor: '',
    teamLogoURL: '',
    played: 0,
    win: 0,
    loss: 0,
    goalScored: 0,
    goalConceded: 0,
    isActive: false,
  },
  setTeam: () => undefined,
});
