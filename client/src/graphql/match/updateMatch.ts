import { gql } from '@apollo/client';

import { Match } from '../../types/match';

import { MATCH_FRAGMENT } from './match.fragment';

export interface UpdateMatchInput {
  updateMatch: Match;
}

export interface UpdateMatchResult {
  updateMatch: Match;
}

// Swap out to common fragment
export const UPDATE_MATCH = gql`
  mutation UpdateMatch(
    $updateMatch: MatchInput
  ) {
    updateMatch(
      updateMatch: $updateMatch
    ) {
      ${MATCH_FRAGMENT}
      createdAt
    }
  }
`;
