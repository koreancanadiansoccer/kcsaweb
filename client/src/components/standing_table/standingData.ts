/* Home page Data */
export const homeStandingHeader = ['Pos', 'Club', 'Pl', 'GD', 'Pts'];

export interface HomeStanding {
  name: JSX.Element;
  played: number;
  GD: number;
  points: number;
}

export const homeScorerHeader = ['Pos', 'Player', 'Club', 'Goals'];

export interface HomeScorer {
  pos: number;
  name: string;
  club: JSX.Element;
  goals: number;
}

/* League page Data */
export const leaguePageStandHeader = [
  'Position',
  'Club',
  'Played',
  'Won',
  'Drawn',
  'Lost',
  'Point',
];

export interface LeaguePageStanding {
  Position: number;
  club: JSX.Element;
  Played: number;
  Won: number;
  Drawn: number;
  Lost: number;
  Point: number;
}

export const leaguePageScheduleHeader = [
  'HOME',
  'VS',
  'AWAY',
  'LOCATION',
  'TIME',
];

export interface LeaguePageSchedule {
  HOME: JSX.Element;
  VS: string;
  AWAY: JSX.Element;
  LOCATION: string;
  TIME: string;
}

export type TableRow =
  | HomeScorer
  | HomeStanding
  | LeaguePageStanding
  | LeaguePageSchedule;
