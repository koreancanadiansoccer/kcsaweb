import { gql } from '@apollo/client';

import { Team } from '../../types/team';

import { TEAM_FRAGMENT } from './team.fragment';

export interface TeamQueryData {
  getTeam: Team;
}

export interface TeamQueryVariable {
  id: string;
}

export const GET_TEAM = gql`
  query GetTeam($id: String!) {
    getTeam(id: $id) {
      ${TEAM_FRAGMENT}
    }
  }
`;
