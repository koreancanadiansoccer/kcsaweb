/* Home page Data */
export const HomeStandingHeader = ['Pos', 'Club', 'Pl', 'GD', 'Pts'];

export interface HomeStanding {
  name: JSX.Element;
  played: number;
  GD: number;
  points: number;
}

export const HomeScorerHeader = ['Pos', 'Player', 'Club', 'Goals'];

export interface HomeScorer {
  pos: number;
  name: string;
  club: JSX.Element;
  goals: number;
}

/* League page Data */
export const LeaguePageStandingHeader = [
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

export const LeaguePageScheduleHeader = [
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

/* Announcement page Data */
export const AnnouncementPageStandingHeader = [
  'No.',
  'Title',
  'Date',
];

export type TableRow =
  | HomeScorer
  | HomeStanding
  | LeaguePageStanding
  | LeaguePageSchedule;
