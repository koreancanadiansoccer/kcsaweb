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
played
win
loss
tie
goalScored
goalConceded
teamAgeType
teamColor
isActive
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
isActive
leagueId
teamId
team{
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
isActive
captainId
leagueId
teamId
team {
  name
  foundedDate
  teamAgeType
  captainId
  teamLogoURL
}
matchPlayers{
  ${MATCH_PLAYER_FRAGMENT}
  createdAt
}
createdAt
`;
