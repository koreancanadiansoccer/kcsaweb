import { GraphQLString, GraphQLNonNull } from 'graphql';
import { compare } from 'bcryptjs';

import { User, AccountType } from '../../../db/models/user.model';
import { UserType } from '../../types/user';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';

interface Args {
  [key: string]: string;
}

export const loginUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parent: object,
    args: Args,
    { req }: any
  ): Promise<User | undefined> {
    try {
      // find the user from database
      const user = await User.findOne({
        include: [{ model: Team, include: [Player] }],
        where: { email: args.email },
      });

      if (!user) {
        throw 'Unable to Find User!';
      }

      // check the password is vaild or not
      const validPassword = await compare(args.password, user.password);
      if (!validPassword) {
        throw 'Incorrect Password!';
      }

      // Set userId to session upon successful login.
      req.session.userId = user.id;
      if (user.type === AccountType.CAPTAIN) req.session.isCaptain = true;
      if (user.type === AccountType.ADMIN) req.session.isAdmin = true;

      return user;
    } catch (err) {
      console.error(err);
    }
  },
};
