import { gql } from '@apollo/client';

export interface UserData {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}
export interface CreateUserDataInput {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $password: String!, $email: String!, $phoneNumber: String!) {
    createUser(name: $name, password: $password, email: $email, phoneNumber: $phoneNumber) {
      name
      email
      phoneNumber
    }
  }
`;
