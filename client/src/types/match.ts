export interface Match {
  id: number;
  matchDay: number;
  date: string;
  location: string;
  // Include team, match players
  homeTeam: any;
  homeTeamScore: number;
  homeTeamPhysical: boolean;
  homeTeamNoGameSheet: boolean;
  homeTeamNoShow: boolean;
  // Include team, match players
  awayTeam: any;
  awayTeamScore: number;
  awayTeamPhysical: boolean;
  awayTeamNoGameSheet: boolean;
  awayTeamNoShow: boolean;
}

export interface MatchInput {
  matchDay?: number;
  date?: string;
  location?: string;
  homeTeamId?: number;
  awayTeamId?: number;
}
