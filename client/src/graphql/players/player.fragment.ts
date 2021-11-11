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
redCard
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
redCard
goalScored
leaguePlayerId
`;

export const MATCH_HOME_SUBMISSION_PLAYER_FRAGMENT = `
id
player {
  ${PLAYER_FRAGMENT}
}
homeTeamId
matchId
leagueTeamId
yellowCard
redCard
goalScored
leaguePlayerId
matchHomeSubmissionId
`;

export const MATCH_AWAY_SUBMISSION_PLAYER_FRAGMENT = `
id
player {
  ${PLAYER_FRAGMENT}
}
awayTeamId
matchId
leagueTeamId
yellowCard
redCard
goalScored
leaguePlayerId
matchAwaySubmissionId
`;
