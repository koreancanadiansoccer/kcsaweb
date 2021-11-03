import { GraphQLNonNull, GraphQLString } from 'graphql';
import CryptoJS from 'crypto-js';

import { UserType } from '../../types/user';
import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';

// Get user query for creating new account.
export const getUser = {
  type: UserType,
  args: { encryptedUserId: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any): Promise<User> {
    const bytes = CryptoJS.AES.decrypt(args.encryptedUserId, 'secret key 123');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    const user = await User.findOne({
      include: [Team],
      where: { id: parseInt(originalText, 10) },
    });

    if (!user) {
      throw Error('No User found');
    }

    return user;
  },
};
