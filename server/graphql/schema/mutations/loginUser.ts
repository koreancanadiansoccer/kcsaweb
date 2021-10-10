import { GraphQLString, GraphQLNonNull } from 'graphql';
import { compare } from 'bcryptjs';

import { LoginType } from '../../types/login';
import { User } from '../../../db/models/user.model';

interface Args {
  [key: string]: string;
}

export const loginUser = {
  type: LoginType,
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
      const user = await User.findOne({ where: { email: args.email } });
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

      return user;
    } catch (err) {
      console.error(err);
    }
  },
};
