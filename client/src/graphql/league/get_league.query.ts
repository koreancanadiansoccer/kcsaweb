import { gql } from '@apollo/client';

import { LEAGUE_FRAGMENT } from './league.fragment';

export const GET_LEAGUE = gql`
  query GetLeague($id: Int!) {
    getLeague(id: $id) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
