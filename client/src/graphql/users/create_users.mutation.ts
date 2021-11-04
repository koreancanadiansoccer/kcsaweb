import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface CreateUserDataResult {
  createUser: User;
}
export interface CreateUserDataInput {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
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
    $firstName: String!
    $lastName: String!
    $dob: String!
    $password: String!
    $email: String!
    $phoneNumber: String!
  ) {
    createUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      dob: $dob
      password: $password
      email: $email
      phoneNumber: $phoneNumber
    ){
      ${USER_FRAGMENT}
    }
  }
`;
