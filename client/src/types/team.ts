import { AgeEnums } from './age.enum';
import { Player, LeaguePlayer, MatchPlayer } from './player';
export interface TeamInput {
  name: string;
  teamAgeType: string;
  teamColor?: string;
}

export interface Team {
  id: number;
  name: string;
  teamLogoURL?: string;
  teamAgeType: AgeEnums | string;
  teamColor?: string;
  played: number;
  win: number;
  loss: number;
  tie: number;
  goalScored: number;
  goalConceded: number;
  isActive: boolean;
  players?: Player[];
}

export interface LeagueTeam {
  id: number;
  name: string;
  played: number;
  win: number;
  loss: number;
  tie: number;
  goalScored: number;
  goalConceded: number;
  teamAgeType: AgeEnums | string;
  isActive: boolean;
  captainId: string;
  teamId: number;
  leagueId: number;
  createdAt: string;
  leaguePlayers: LeaguePlayer[];
}

export interface MatchTeam {
  id: number;
  name: string;
  played: number;
  win: number;
  loss: number;
  tie: number;
  goalScored: number;
  goalConceded: number;
  teamAgeType: AgeEnums | string;
  isActive: boolean;
  captainId: string;
  teamId: number;
  leagueId: number;
  createdAt: string;
  matchPlayers: MatchPlayer[];
}
