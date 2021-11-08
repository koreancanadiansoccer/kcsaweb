import { gql } from '@apollo/client';

import { LEAGUE_TEAM_FRAGMENT } from '../teams/team.fragment';
import { LeagueTeam } from '../../types/team';

export interface RegisterLeagueTeamInput {
  leagueId: number;
  teamId: number;
  userId: number;
}

export interface RegisterLeagueTeamResult {
  registerLeagueTeam: LeagueTeam;
}

// Update single league.
export const REGISTER_LEAGUETEAM = gql`
  mutation registerLeagueTeam($leagueId: Int!, $teamId: Int!,  $userId: Int!) {
    registerLeagueTeam(leagueId: $leagueId, teamId: $teamId, userId: $userId) {
      ${LEAGUE_TEAM_FRAGMENT}
    }
  }
`;
