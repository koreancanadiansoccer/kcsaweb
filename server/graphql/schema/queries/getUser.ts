import { GraphQLNonNull, GraphQLString } from 'graphql';

import { UserType } from '../../types/user';
import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { decodeIDBase64 } from '../utils';

// Get user query for creating new account.
export const getUser = {
  type: UserType,
  args: { encryptedUserId: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any): Promise<User> {
    const id = decodeIDBase64(args.encryptedUserId);
    // If current date is > 7 day, fail this call.
    const user = await User.findOne({
      include: [Team],
      where: { id: id },
    });

    if (!user) {
      throw Error('No User found');
    }

    return user;
  },
};
