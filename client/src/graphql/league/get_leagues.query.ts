import { gql } from '@apollo/client';

import { League } from '../../types/league';

import { LEAGUE_FRAGMENT } from './league.fragment';

export interface LeagueQueryData {
  getLeagues: League[];
}

export const GET_LEAGUES = gql`
  query {
    getLeagues {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
