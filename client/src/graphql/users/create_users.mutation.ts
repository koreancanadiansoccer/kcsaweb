import { gql } from '@apollo/client';

export interface CreateUserDataResult {
  createUser: boolean;
}
export interface CreateUserDataInput {
  id: number;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_USER = gql`
  mutation CreateUser(
    $id: Int!
    $name: String!
    $password: String!
    $email: String!
    $phoneNumber: String!
  ) {
    createUser(
      id: $id
      name: $name
      password: $password
      email: $email
      phoneNumber: $phoneNumber
    )
  }
`;
