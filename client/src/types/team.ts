// TODO merge into one 'AgeType'.
export enum TeamAgeType {
  OPEN = "OPEN",
  SENIOR = "SENIOR",
}

export interface TeamInput {
  name: string;
  teamAgeType: string;
}
export interface Team {
  id: string;
  name: string;
  teamLogoURL?: string;
  teamAgeType: string;
  played: number;
  win: number;
  loss: number;
  goalScored: number;
  goalConceded: number;
  isActive: boolean;
}

export interface LeagueTeam {
  id: string;
  name: string;
  played: number;
  win: number;
  loss: number;
  goalScored: number;
  goalConceded: number;
  teamAgeType: string;
  isActive: boolean;
  captainId: string;
  teamId: string;
  leagueId: number;
  createdAt: string;
}
