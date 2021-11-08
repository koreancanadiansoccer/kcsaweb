import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface SendInviteInput {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  teamName: string;
  teamAgeType: string;
}

export interface SendInviteResult {
  sendInvite: User[];
}

// Swap out to common fragment
export const SEND_INVITE = gql`
  mutation SendInvite(
    $firstName: String!
    $lastName: String!
    $dob: String!
    $email: String!
    $phoneNumber: String!
    $teamName: String!
    $teamAgeType: String!
  ) {
    sendInvite(
      firstName: $firstName
      lastName: $lastName
      dob: $dob
      email: $email
      teamName: $teamName
      teamAgeType: $teamAgeType
      phoneNumber: $phoneNumber
    ) {
      ${USER_FRAGMENT}
    }
  }
`;
