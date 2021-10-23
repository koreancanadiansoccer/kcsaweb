import { gql } from '@apollo/client';

import { Match } from '../../types/match';
import { League, LeagueInput } from '../../types/league';
import { LEAGUE_FRAGMENT } from '../league/league.fragment';

export interface UpdateMatchInput {
  updateMatch: Match;
}

export interface UpdateMatchResult {
  updateMatch: League;
}

// Swap out to common fragment
export const UPDATE_MATCH = gql`
  mutation UpdateMatch(
    $updateMatch: MatchInput
  ) {
    updateMatch(
      updateMatch: $updateMatch
    ) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
