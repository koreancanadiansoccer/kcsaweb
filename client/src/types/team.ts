export interface Team {
  id: string;
  name: string;
  played: number;
  win: number;
  loss: number;
  goalScored: number;
  goalConceded: number;
  isActive: boolean;
  leagueId: number;
}
