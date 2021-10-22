import { gql } from '@apollo/client';

import { Match } from '../../types/match';

import { MATCH_FRAGMENT } from './match.fragment';

export interface CreateMatchInput {
  matchDay?: number;
  date?: string;
  location?: string;
  homeTeamId?: number;
  awayTeamId?: number;
  leagueId?: number;
}

export interface CreateMatchResult {
  createMatch: Match;
}

// Swap out to common fragment
export const CREATE_MATCH = gql`
  mutation CreateMatch(
    $matchDay: Int!
    $date: String!
    $location: String!
    $leagueId: Int!
    $homeTeamId: Int!
    $awayTeamId: Int!
  ) {
    createMatch(
      matchDay: $matchDay
      date: $date
      location: $location
      leagueId: $leagueId
      homeTeamId: $homeTeamId
      awayTeamId: $awayTeamId
    ) {
      ${MATCH_FRAGMENT}
      createdAt
    }
  }
`;
