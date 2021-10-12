import { gql } from '@apollo/client';

import { Match } from '../../types/match';
import { MATCH_TEAM_FRAGMENT } from '../teams/team.fragment';

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
      date
      matchDay
      location
      leagueId
      date
      homeTeam{
        ${MATCH_TEAM_FRAGMENT}
      }
      homeTeamScore
      homeTeamPhysical
      homeTeamNoGameSheet
      homeTeamNoShow
      awayTeam{
        ${MATCH_TEAM_FRAGMENT}
      }
      awayTeamScore
      awayTeamPhysical
      awayTeamNoGameSheet
      awayTeamNoShow
      createdAt
    }
  }
`;
