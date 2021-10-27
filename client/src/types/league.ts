import map from 'lodash/map';

import { LeagueTeam, Team } from './team';
import { Match } from './match';
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
  leagueType: LeagueType | string;
  leagueAgeType: AgeEnums | string;
  year: string;
  maxYellowCard: number;
  leagueTeams: LeagueTeam[];
  matches: Match[];
}

export interface LeagueInput {
  name: string;
  isActive?: boolean;
  leagueAgeType?: AgeEnums | string;
  leagueType?: LeagueType | string;
  year?: string;
  maxYellowCard?: number;
  leagueTeams?: LeagueTeam[];
  matches?: Match[];
}

export interface LeagueActive {
  id: number;
  name: string;
}
