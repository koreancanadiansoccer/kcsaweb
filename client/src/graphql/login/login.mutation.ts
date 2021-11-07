import { gql } from '@apollo/client';

import { User } from '../../types/user';
import { USER_FRAGMENT } from '../users/user.fragment';

export interface LoginData {
  loginUser: User;
}
export interface CreateLoginDataInput {
  email: string;
  password: string;
}

/**
 * Mutation for Login
 */
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
     ${USER_FRAGMENT}
    }
  }
`;
