import { AgeEnums } from './age.enum';
import { Player, LeaguePlayer, MatchPlayer } from './player';
import { User } from './user';
export interface TeamInput {
  name: string;
  teamAgeType: string;
  teamColor?: string;
  foundedDate?: string;
}

export interface Team {
  id: number;
  name: string;
  captain?: User;
  foundedDate: string;
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

export enum LEAGUE_TEAM_STATUS {
  INVITED = 'INVITED',
  CLUBCONFIRMED = 'CLUB CONFIRMED',
  REGISTERED = 'REGISTERED',
}

export interface LeagueTeam {
  id: number;
  played: number;
  win: number;
  loss: number;
  tie: number;
  goalScored: number;
  goalConceded: number;
  status: string;
  captainId: string;
  team: Team;
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
  captainId: string;
  teamId: number;
  team: Team;
  leagueId: number;
  createdAt: string;
  matchPlayers: MatchPlayer[];
}
