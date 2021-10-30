export interface Player {
  id: number;
  name: string;
  goalScored: number;
  yellowCard: number;
}

export interface PlayerInput {
  name: string;
  teamId?: number;
  dob?: string;
}

export interface LeaguePlayerInput {
  id?: number;
  name?: string;
  dob?: string;
}
export interface LeaguePlayer extends Player {
  name: string;
  goalScored: number;
  yellowCard: number;
  leagueTeamId: number;
  playerId: number;
}

export interface MatchPlayer {
  name: string;
  dob?: string;
  goalScored: number;
  yellowCard: number;
}
