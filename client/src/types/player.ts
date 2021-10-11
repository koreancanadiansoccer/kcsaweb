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
  name: string;
}
export interface LeaguePlayer extends Player {
  name: string;
  goalScored: number;
  yellowCard: number;
  leagueTeamId: number;
}
