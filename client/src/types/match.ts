import { MatchTeam } from './team';

export enum MatchStatus {
  PENDING = 'PENDING', // Pending match to be played.
  MISMATCH = 'MISMATCH', // Mismatch happened between teams submission.
  COMPLETE = 'COMPLETE', // No mismatch happened or Admin submitted.
}

export interface Match {
  id: number;
  matchDay: number;
  date: string;
  location: string;
  // Include team, match players
  homeTeam: MatchTeam;
  homeTeamScore: number;
  homeTeamPhysical: boolean;
  homeTeamNoGameSheet: boolean;
  homeTeamNoShow: boolean;
  // Include team, match players
  awayTeam: MatchTeam;
  awayTeamScore: number;
  awayTeamPhysical: boolean;
  awayTeamNoGameSheet: boolean;
  awayTeamNoShow: boolean;
  status: string;
}

export interface MatchInput {
  matchDay?: number;
  date?: string;
  location?: string;
  homeTeamId?: number;
  awayTeamId?: number;
}
