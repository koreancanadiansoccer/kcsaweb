import { gql } from '@apollo/client';

export interface LoginData {
  email: string;
  password: string;
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
      email
    }
  }
`;
