import { gql } from '@apollo/client';

import { LeagueType, League } from '../../types/league';
import { Team } from '../../types/team';
import { TEAM_FRAGMENT } from '../teams/team.fragment';
export interface LeagueData {
  name: string;
  isActive: boolean;
  leagueType: LeagueType;
  teams?: Team[];
}

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
    $maxYellowCard: Int!
  ) {
    createLeague(
      name: $name
      leagueType: $leagueType
      leagueAgeType: $leagueAgeType
      maxYellowCard: $maxYellowCard
    ) {
      name
      isActive
      leagueAgeType
      leagueType
      maxYellowCard
      createdAt
      leagueTeams {
        ${TEAM_FRAGMENT}
      }
    }
  }
`;
