import { gql } from '@apollo/client';

import { LeaguePlayerInput } from '../../types/player';
import { League } from '../../types/league';
import { LEAGUE_FRAGMENT } from '../league/league.fragment';

export interface CreateLeaguePlayerInput {
  newLeaguePlayers?: LeaguePlayerInput[];
  leagueTeamId: number;
  teamId: number;
  leagueId: number;
}

export interface CreateLeaguePlayerOutput {
  createLeaguePlayers: League;
}

/**
 * Mutation for creating a new player.
 */
export const CREATE_LEAGUE_PLAYER = gql`
  mutation createLeaguePlayers($newLeaguePlayers: [LeaguePlayerInput], $leagueTeamId: Int! $teamId: Int!, $leagueId: Int!),  {
    createLeaguePlayers(newLeaguePlayers: $newLeaguePlayers, leagueTeamId: $leagueTeamId, teamId: $teamId, leagueId: $leagueId) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
