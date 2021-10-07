import { AgeEnums } from './age.enum';
import { Player } from './player';
export interface TeamInput {
  name: string;
  teamAgeType: string;
  teamColor?: string;
}

export interface Team {
  id: string;
  name: string;
  teamLogoURL?: string;
  teamAgeType: AgeEnums | string;
  teamColor?: string;
  played: number;
  win: number;
  loss: number;
  goalScored: number;
  goalConceded: number;
  isActive: boolean;
  players?: Player[];
}

export interface LeagueTeam {
  id: string;
  name: string;
  played: number;
  win: number;
  loss: number;
  goalScored: number;
  goalConceded: number;
  teamAgeType: AgeEnums | string;
  isActive: boolean;
  captainId: string;
  teamId: string;
  leagueId: number;
  createdAt: string;
  players: Player[];
}
