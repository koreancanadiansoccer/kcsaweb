import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface UserQueryData {
  getUser: User;
}

export interface UserQueryVariable {
  encryptedUserId: string;
}

export const GET_USER = gql`
query GetUser($encryptedUserId: String!) {
  getUser(encryptedUserId: $encryptedUserId) {
    ${USER_FRAGMENT}
  }
}
`;
