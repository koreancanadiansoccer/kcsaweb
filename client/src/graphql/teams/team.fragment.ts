import {
  PLAYER_FRAGMENT,
  LEAGUE_PLAYER_FRAGMENT,
  MATCH_PLAYER_FRAGMENT,
} from '../players/player.fragment';

export const TEAM_FRAGMENT = `
id
name
foundedDate
teamLogoURL
captain {
  firstName,
  lastName,
  id,
  email,
}
played
win
loss
tie
goalScored
goalConceded
teamAgeType
teamColor
players{
  ${PLAYER_FRAGMENT}
  createdAt
}
`;

export const LEAGUE_TEAM_FRAGMENT = `
id
played
win
loss
tie
goalScored
goalConceded
status
leagueId
teamId
team{
  captain{
    firstName,
    lastName,
    id,
    email,
  }
  teamLogoURL
  name
  teamColor
  foundedDate
  teamAgeType
}
leaguePlayers{
  ${LEAGUE_PLAYER_FRAGMENT}
  createdAt
}
createdAt
`;

export const MATCH_TEAM_FRAGMENT = `
id
played
win
loss
tie
goalScored
goalConceded
leagueId
teamId
team {
  name
  foundedDate
  teamAgeType
  teamLogoURL
}
matchPlayers{
  ${MATCH_PLAYER_FRAGMENT}
  createdAt
}
createdAt
`;
