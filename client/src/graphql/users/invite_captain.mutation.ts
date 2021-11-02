import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface SendInviteInput {
  name: string;
  email: string;
  phoneNumber: string;
  teamName: string;
}

export interface SendInviteResult {
  sendInvite: User[];
}

// Swap out to common fragment
export const SEND_INVITE = gql`
  mutation SendInvite(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $teamName: String!
  ) {
    sendInvite(
      name: $name
      email: $email
      teamName: $teamName
      phoneNumber: $phoneNumber
    ) {
      ${USER_FRAGMENT}
    }
  }
`;
