import { GraphQLList } from 'graphql';

import { UserType } from '../../types/user';
import { User } from '../../../db/models/user.model';

export const getUsers = {
  type: new GraphQLList(UserType),
  async resolve(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  },
};
