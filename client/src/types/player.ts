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
  leagueTeamId: number;
  signedWaiver: boolean;
  playerId: number;
  player: Player;
}

export interface MatchPlayer {
  name: string;
  dob?: string;
  goalScored: number;
  yellowCard: number;
  player: Player;
}
