import { gql } from '@apollo/client';

import { LeagueType, League } from '../../types/league';

import { LEAGUE_FRAGMENT } from './league.fragment';

export interface CreateLeagueDataInput {
  name: string;
  isActive?: boolean;
  leagueType?: LeagueType | string;
  leagueAgeType?: LeagueType | string;
  maxYellowCard?: number;
}

export interface CreateLeagueResult {
  createLeague: League[];
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_LEAGUE = gql`
  mutation CreateLeague(
    $name: String!
    $leagueAgeType: String!
    $leagueType: String!
    $year: String!
    $maxYellowCard: Int!
  ) {
    createLeague(
      name: $name
      leagueType: $leagueType
      leagueAgeType: $leagueAgeType
      year: $year
      maxYellowCard: $maxYellowCard
    ) {
      ${LEAGUE_FRAGMENT}
      createdAt
    }
  }
`;
