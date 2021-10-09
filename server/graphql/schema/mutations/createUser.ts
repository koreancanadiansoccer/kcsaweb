import { GraphQLString, GraphQLNonNull } from 'graphql';
// password encryption
import { hash } from 'bcryptjs';

import { UserType } from '../../types/user';
import {
  User,
  AccountType,
  AccountStatus,
} from '../../../db/models/user.model';
import { sendEmail } from '../../../utils/sendemail';

// defined custom type to make temporary object
interface Args {
  [key: string]: string | AccountType | AccountStatus;
}

/**
 * TODO:
 * Set session once user is registered. 제일 마지막에 유지하기
 */
export const createUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent: object, args: Args): Promise<User | undefined> {
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

      // check if the user has already registered
      const findUser = await User.findOne({ where: { email: args.email } });

      if (!findUser) {
        // encrypted password
        const hashed = await hash(args.password, 8);

        //TODO: generate Token

        const user = await User.create({
          ...args,
          password: hashed,
          isAdmin: false,
        });

        return user;
      } else {
        throw 'You have already registerd!';
      }
    } catch (err) {
      console.error(err);
    }
  },
};
