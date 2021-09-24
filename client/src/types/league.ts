import { Team } from "./team";

export enum LeagueType {
  OPEN = "OPEN",
  SENIOR = "SENIOR",
}

export interface League {
  name: string;
  isActive: boolean;
  leagueType: LeagueType;
  teams?: Team[];
}

export interface LeagueInput {
  name: string;
  isActive?: boolean;
  leagueType?: LeagueType | string;
  teams?: Team[];
}
