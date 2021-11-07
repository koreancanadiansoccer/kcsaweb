import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface GetUsersResult {
  getUsers: User[];
}

export const GET_USERS = gql`
  query {
    getUsers {
      ${USER_FRAGMENT}
    }
  }
`;
