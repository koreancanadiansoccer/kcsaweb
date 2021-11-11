export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  goalScored: number;
  yellowCard: number;
}

export interface PlayerInput {
  id?: number;
  firstName: string;
  lastName: string;
  teamId?: number;
  dob?: string;
}

export interface LeaguePlayerInput {
  id?: number;
  firstName?: string;
  lastName?: string;
  signedWaiver?: boolean;
  dob?: string;
}
export interface LeaguePlayer {
  id: string;
  name: string; // to be removed.
  goalScored: number;
  yellowCard: number;
  redCard: number;
  leagueTeamId: number;
  signedWaiver: boolean;
  playerId: number;
  player: Player;
}

export interface MatchPlayer {
  dob?: string;
  goalScored: number;
  yellowCard: number;
  redCard: number;
  player: Player;
}

export interface MatchSubmissionPlayer {
  goalScored: number;
  yellowCard: number;
  redCard: number;
  player: Player;
  homeTeamId: number;
  id: number;
  leaguePlayerId: number;
}
