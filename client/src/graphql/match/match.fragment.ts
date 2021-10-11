import { MATCH_TEAM_FRAGMENT } from '../teams/team.fragment';

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
`;
