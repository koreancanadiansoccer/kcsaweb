import { gql } from '@apollo/client';

import { PLAYER_FRAGMENT } from './player.fragment';

/**
 * Mutation for creating a new player.
 */
export const CREATE_PLAYER = gql`
  mutation createPlayer($name: String!, $teamId: Int!) {
    createPlayer(name: $name, teamId: $teamId) {
      ${PLAYER_FRAGMENT}
      createdAt
    }
  }
`;