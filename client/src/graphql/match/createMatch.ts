import { gql } from '@apollo/client';

import { League } from '../../types/league';
import { LEAGUE_FRAGMENT } from '../league/league.fragment';
export interface CreateMatchInput {
  matchDay?: number;
  date?: string;
  location?: string;
  homeTeamId?: number;
  awayTeamId?: number;
  leagueId?: number;
}

export interface CreateMatchResult {
  createMatch: League;
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
      ${LEAGUE_FRAGMENT}
    }
  }
`;
