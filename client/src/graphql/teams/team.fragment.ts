import {
  PLAYER_FRAGMENT,
  MATCH_PLAYER_FRAGMENT,
} from '../players/player.fragment';

export const TEAM_FRAGMENT = `
id
name
teamLogoURL
played
win
loss
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
name
played
win
loss
goalScored
goalConceded
teamAgeType
isActive
captainId
leagueId
teamId
leaguePlayers{
  ${PLAYER_FRAGMENT}
  createdAt
}
createdAt
`;

export const MATCH_TEAM_FRAGMENT = `
id
name
played
win
loss
goalScored
goalConceded
teamAgeType
isActive
captainId
leagueId
teamId
matchPlayers{
  ${MATCH_PLAYER_FRAGMENT}
  createdAt
}
createdAt
`;
