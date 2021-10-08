import map from 'lodash/map';

import { LeagueTeam } from './team';
import { AgeEnums } from './age.enum';

export enum LeagueType {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
}

export const leagueTypeOptions = map(LeagueType, (leagueType) => {
  return { label: leagueType, value: leagueType };
});

export interface League {
  id: number;
  name: string;
  isActive: boolean;
  leagueAgeType: AgeEnums | string;
  year: string;
  leagueType: LeagueType | string;
  maxYellowCard: number;
  leagueTeams: LeagueTeam[];
}

export interface LeagueInput {
  name: string;
  isActive?: boolean;
  leagueAgeType?: AgeEnums | string;
  leagueType?: LeagueType | string;
  year?: string;
  maxYellowCard?: number;
  leagueTeams?: LeagueTeam[];
}
