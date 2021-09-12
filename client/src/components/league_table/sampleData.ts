export const standingHeader = ["Pos", "Club", "PL", "W", "L", "Pts"];

export interface Standing {
  pos: number;
  name: string;
  played: number;
  w: number;
  l: number;
  points: number;
}

export const standingOpen: Standing[] = [
  {
    pos: 1,
    name: "Gunners",
    played: 16,
    w: 9,
    l: 1,
    points: 10,
  },

  {
    pos: 2,
    name: "Red Force",
    played: 16,
    w: 9,
    l: 1,
    points: 10,
  },
  {
    pos: 3,
    name: "Outliers",
    played: 16,
    w: 9,
    l: 1,
    points: 10,
  },

  {
    pos: 4,
    name: "HANWOORI",
    played: 16,
    w: 9,
    l: 1,
    points: 10,
  },

  {
    pos: 5,
    name: "CICC",
    played: 16,
    w: 9,
    l: 1,
    points: 10,
  },
];

export const standingSenior: Standing[] = [
  {
    pos: 1,
    name: "태극FC",
    played: 20,
    w: 6,
    l: 2,
    points: 20,
  },

  {
    pos: 2,
    name: "HTOP",
    played: 19,
    w: 6,
    l: 1,
    points: 15,
  },
  {
    pos: 3,
    name: "에수성심",
    played: 12,
    w: 7,
    l: 3,
    points: 5,
  },

  {
    pos: 4,
    name: "메이플 FC",
    played: 6,
    w: 4,
    l: 2,
    points: 1,
  },

  {
    pos: 5,
    name: "영락 FC",
    played: 4,
    w: 1,
    l: 3,
    points: 4,
  },
];

export const scorerHeader = ["Pos", "Player", "Club", "Goals"];

export interface Scorer {
  pos: number;
  name: string;
  club: string;
  G: number;
}

export type TableRow = Scorer | Standing;

export const scorerOpen: Scorer[] = [
  {
    pos: 1,
    name: "Philip Shin",
    club: "Gunners",
    G: 20,
  },

  {
    pos: 2,
    name: "Gian",
    club: "CICC",
    G: 15,
  },

  {
    pos: 3,
    name: "Gyeong Mun",
    club: "HANWOORI",
    G: 16,
  },
  {
    pos: 4,
    name: "Philip Shin",
    club: "Gunners",
    G: 16,
  },

  {
    pos: 5,
    name: "Gian",
    club: "CICC",
    G: 12,
  },

  {
    pos: 6,
    name: "Gyeong Mun",
    club: "HANWOORI",
    G: 16,
  },
];

export const scorerSenior: Scorer[] = [
  {
    pos: 1,
    name: "Sangjin Lee",
    club: "HTOP",
    G: 16,
  },

  {
    pos: 2,
    name: "Benji Joo",
    club: "Taeguk",
    G: 12,
  },

  {
    pos: 3,
    name: "Manyoung Oh",
    club: "예수성심",
    G: 13,
  },
  {
    pos: 4,
    name: "Yoonsik Kim",
    club: "예수성심",
    G: 16,
  },

  {
    pos: 5,
    name: "Edward Liu",
    club: "Taeguk",
    G: 12,
  },

  {
    pos: 6,
    name: "Bobby Yung",
    club: "HTOP",
    G: 16,
  },
];
