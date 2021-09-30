import { Team } from "./team";

export enum LeagueAgeType {
  OPEN = "OPEN",
  SENIOR = "SENIOR",
}

export enum LeagueType {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
}

export interface League {
  id: string;
  name: string;
  isActive: boolean;
  leagueAgeType: LeagueAgeType | string;
  leagueType: LeagueType | string;
  maxYellowCard: number;
  leagueTeams: Team[];
}

export interface LeagueInput {
  name: string;
  isActive?: boolean;
  leagueAgeType?: LeagueAgeType | string;
  leagueType?: LeagueType | string;
  maxYellowCard?: number;
  leagueTeams?: Team[];
}
