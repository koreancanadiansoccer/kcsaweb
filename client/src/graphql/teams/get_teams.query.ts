import { gql } from '@apollo/client';

import { Team } from '../../types/team';

import { TEAM_FRAGMENT } from './team.fragment';

export interface TeamsQueryData {
  getTeams: Team[];
}

export interface TeamsQueryVariable {
  leagueAgeType: string;
}

export const GET_TEAMS = gql`
  query GetTeams($leagueAgeType: String) {
    getTeams(leagueAgeType: $leagueAgeType) {
      ${TEAM_FRAGMENT}
      createdAt
    }
  }
`;
