import { GraphQLList } from 'graphql';

import { UserType } from '../../types/user';
import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';

export const getUsers = {
  type: new GraphQLList(UserType),
  async resolve(): Promise<User[]> {
    const users = await User.findAll({
      include: [Team],
      where: { isAdmin: false },
    });
    return users;
  },
};
