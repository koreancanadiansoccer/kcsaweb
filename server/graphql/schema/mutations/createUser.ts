import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
// password encryption
import { hash } from 'bcryptjs';

import {
  User,
  AccountType,
  AccountStatus,
} from '../../../db/models/user.model';

// defined custom type to make temporary object
interface Args {
  [key: string]: string | AccountType | AccountStatus;
}

/**
 * Registers user.
 */
export const createUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLString },
  },
  async resolve(
    parent: object,
    args: Args,
    { req }: any
  ): Promise<boolean | undefined> {
    try {
      // check if all required forms exist or not
      if (
        !args.name.length ||
        !args.password.length ||
        !args.email.length ||
        !args.phoneNumber.length
      ) {
        throw 'You have to enter all required fields!';
      } else {
        args.password = args.password.trim();
        args.email = args.email.trim();
      }

      // Check account was created from admin invitation.
      const findUser = await User.findOne({ where: { id: args.id } });

      if (findUser) {
        const hashedPassword = await hash(args.password, 8);
        await User.update(
          {
            name: args.name,
            password: hashedPassword,
            email: args.email,
            phoneNumber: args.phoneNumber,
            status: AccountStatus.ACCEPTED,
            isAdmin: false,
            type: AccountType.CAPTAIN,
          },
          { where: { id: findUser.id } }
        );

        // Set userId to session upon successful login.
        req.session.userId = findUser.id;

        return true;
      }
      throw Error('Could not find account - Please contact admin');
    } catch (err) {
      console.error(err);
    }
  },
};
