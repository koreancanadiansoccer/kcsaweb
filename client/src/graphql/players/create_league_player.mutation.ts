import { gql } from '@apollo/client';

import { LeaguePlayer, LeaguePlayerInput } from '../../types/player';

import { LEAGUE_PLAYER_FRAGMENT } from './player.fragment';

export interface CreateLeaguePlayerInput {
  newLeaguePlayers?: LeaguePlayerInput[];
  leagueTeamId: number;
  teamId: number;
}

export interface CreateLeaguePlayerOutput {
  createLeaguePlayers: LeaguePlayer[];
}

/**
 * Mutation for creating a new player.
 */
export const CREATE_LEAGUE_PLAYER = gql`
  mutation createLeaguePlayers($newLeaguePlayers: [LeaguePlayerInput], $leagueTeamId: Int! $teamId: Int!),  {
    createLeaguePlayers(newLeaguePlayers: $newLeaguePlayers, leagueTeamId: $leagueTeamId, teamId: $teamId) {
      ${LEAGUE_PLAYER_FRAGMENT}
      createdAt
    }
  }
`;
