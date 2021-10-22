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
name
played
win
loss
tie
goalScored
goalConceded
teamAgeType
isActive
captainId
leagueId
teamId
leaguePlayers{
  ${LEAGUE_PLAYER_FRAGMENT}
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
tie
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
