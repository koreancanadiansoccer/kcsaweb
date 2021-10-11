import { gql } from '@apollo/client';

import { Match } from '../../types/match';
import { LEAGUE_TEAM_FRAGMENT } from '../teams/team.fragment';

export interface MatchesQueryData {
  getMatches: Match[];
}

export interface MatchesQueryVariable {
  leagueId: number;
}

// Swap out to common fragment
export const GET_MATCHES = gql`
  query GetMatches($leagueId: Int!) {
    getMatches(leagueId: $leagueId) {
      date
      matchDay
      location
      leagueId
      date
      homeTeam{
        ${LEAGUE_TEAM_FRAGMENT}
      }
      homeTeamScore
      homeTeamPhysical
      homeTeamNoGameSheet
      homeTeamNoShow
      awayTeam{
        ${LEAGUE_TEAM_FRAGMENT}
      }
      awayTeamScore
      awayTeamPhysical
      awayTeamNoGameSheet
      awayTeamNoShow
      createdAt
    }
  }
`;
