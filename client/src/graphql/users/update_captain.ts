import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface UpdateCaptainInput {
  firstName: string;
  lastName: string;
  dob: Date | null;
  email: string;
  phoneNumber: string;
  teamName: string;
  teamAgeType: string;
  id: number;
}

export interface UpdateCaptainResult {
  updateCaptain: User[];
}

// Swap out to common fragment
export const UPDATE_CAPTAIN = gql`
  mutation UpdataCaptain(
    $firstName: String!
    $lastName: String!
    $dob: String!
    $email: String!
    $phoneNumber: String!
    $teamName: String!
    $teamAgeType: String!
    $id: Int!
  ) {
    updateCaptain(
      firstName: $firstName
      lastName: $lastName
      dob: $dob
      email: $email
      teamName: $teamName
      teamAgeType: $teamAgeType
      phoneNumber: $phoneNumber
      id: $id
    ) {
      ${USER_FRAGMENT}
    }
  }
`;
