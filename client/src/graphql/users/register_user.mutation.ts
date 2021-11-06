import { gql } from '@apollo/client';

import { User } from '../../types/user';

import { USER_FRAGMENT } from './user.fragment';

export interface RegisterUserDataResult {
  createUser: User;
}
export interface RegisterUserDataInput {
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
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $dob: String!
    $password: String!
    $email: String!
    $phoneNumber: String!
  ) {
    registerUser(
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
