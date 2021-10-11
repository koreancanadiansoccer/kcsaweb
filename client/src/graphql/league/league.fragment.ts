import { LEAGUE_TEAM_FRAGMENT } from '../teams/team.fragment';
import { MATCH_FRAGMENT } from '../match/match.fragment';

export const LEAGUE_FRAGMENT = `
  id
  name
  isActive
  leagueAgeType
  leagueType
  year
  maxYellowCard
  leagueTeams {
    ${LEAGUE_TEAM_FRAGMENT}
  }
  matches {
    ${MATCH_FRAGMENT}
  }
`;
