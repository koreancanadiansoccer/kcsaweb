import { gql } from '@apollo/client';

import { PLAYER_FRAGMENT } from './player.fragment';

export const GET_PLAYERS = gql`
  query GetPlayers($teamId: Int!) {
    getPlayers(teamId: $teamId) {
      ${PLAYER_FRAGMENT}
    }
  }
`;
