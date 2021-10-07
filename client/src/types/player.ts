export interface Player {
  id: string;
  name: string;
  goalScored: number;
  yellowCard: number;
}

export interface PlayerInput {
  name: string;
  teamId?: string;
}
