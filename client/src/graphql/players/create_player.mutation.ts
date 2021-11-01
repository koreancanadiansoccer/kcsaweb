import { gql } from '@apollo/client';

import { PLAYER_FRAGMENT } from './player.fragment';

/**
 * Mutation for creating a new player.
 */
export const CREATE_PLAYER = gql`
  mutation createPlayer($firstName: String!, $lastName: String!, $dob: String!, $teamId: Int!) {
    createPlayer(firstName: $firstName, lastName: $lastName, dob: $dob, teamId: $teamId) {
      ${PLAYER_FRAGMENT}
      createdAt
    }
  }
`;
