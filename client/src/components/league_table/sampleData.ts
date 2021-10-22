export const standingHeader = ['Pos', 'Club', 'Pl', 'GD', 'Pts'];

export interface Standing {
  name: JSX.Element;
  played: number;
  GD: number;
  points: number;
}

export const scorerHeader = ['Pos', 'Player', 'Club', 'Goals'];

export interface Scorer {
  pos: number;
  name: string;
  club: JSX.Element;
  goals: number;
}

export type TableRow = Scorer | Standing;
