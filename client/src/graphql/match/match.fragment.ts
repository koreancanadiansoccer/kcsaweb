import { MATCH_TEAM_FRAGMENT } from '../teams/team.fragment';
import {
  MATCH_HOME_SUBMISSION_PLAYER_FRAGMENT,
  MATCH_AWAY_SUBMISSION_PLAYER_FRAGMENT,
} from '../players/player.fragment';

const MATCH_HOME_SUBMISSION = `
id
leagueId
homeTeamId
homeTeamGameSheetLink
homeTeamScore
awayTeamScore
matchId
matchHomeSubmissionPlayers{
${MATCH_HOME_SUBMISSION_PLAYER_FRAGMENT}
}
`;

const MATCH_AWAY_SUBMISSION = `
id
leagueId
awayTeamId
awayTeamGameSheetLink
awayTeamScore
homeTeamScore
matchId
matchAwaySubmissionPlayers{
  ${MATCH_AWAY_SUBMISSION_PLAYER_FRAGMENT}
}
`;

export const MATCH_FRAGMENT = `
id
date
matchDay
location
leagueId
date
homeTeam{
  ${MATCH_TEAM_FRAGMENT}
}
homeTeamScore
homeTeamPhysical
homeTeamNoGameSheet
homeTeamNoShow
awayTeam{
  ${MATCH_TEAM_FRAGMENT}
}
awayTeamScore
awayTeamPhysical
awayTeamNoGameSheet
awayTeamNoShow
matchHomeSubmission {
  ${MATCH_HOME_SUBMISSION}
}
matchAwaySubmission {
  ${MATCH_AWAY_SUBMISSION}
}
status
`;
