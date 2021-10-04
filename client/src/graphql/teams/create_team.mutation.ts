import { gql } from '@apollo/client';

import { TEAM_FRAGMENT } from './team.fragment';

/**
 * Mutation for creating a new user account.
 */
export const CREATE_TEAM = gql`
  mutation createTeam($name: String!, $teamAgeType: String!) {
    createTeam(name: $name, teamAgeType: $teamAgeType) {
      ${TEAM_FRAGMENT}
    }
  }
`;
