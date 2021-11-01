export const PLAYER_FRAGMENT = `
id
firstName
lastName
dob
yellowCard
goalScored
teamId
`;

export const LEAGUE_PLAYER_FRAGMENT = `
id
yellowCard
goalScored
leagueTeamId
signedWaiver
player {
  ${PLAYER_FRAGMENT}
}
playerId
`;

export const MATCH_PLAYER_FRAGMENT = `
id
player {
  ${PLAYER_FRAGMENT}
}
teamId
matchId
leagueTeamId
yellowCard
goalScored
leaguePlayerId
`;
