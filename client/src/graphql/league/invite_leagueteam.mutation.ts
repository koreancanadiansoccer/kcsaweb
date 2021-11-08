import { gql } from '@apollo/client';

import { League } from '../../types/league';

import { LEAGUE_FRAGMENT } from './league.fragment';

export interface InviteLeagueTeamInput {
  leagueId: number;
  teamId: number;
}

export interface InviteLeagueTeamResult {
  inviteLeagueTeam: League;
}

// Update single league.
export const INVITE_LEAGUETEAM = gql`
  mutation inviteLeagueTeam($leagueId: Int!, $teamId: Int!) {
    inviteLeagueTeam(leagueId: $leagueId, teamId: $teamId) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
