import { LEAGUE_TEAM_FRAGMENT } from '../teams/team.fragment';

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
`;
