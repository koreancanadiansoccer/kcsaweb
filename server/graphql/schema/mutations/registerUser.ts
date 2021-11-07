import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
// password encryption
import { hash } from 'bcryptjs';

import {
  User,
  AccountType,
  ACCOUNTSTATUS,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';
import { UserType } from '../../types/user';

// defined custom type to make temporary object
interface Args {
  [key: string]: string | AccountType | ACCOUNTSTATUS;
}

/**
 * Registers user.
 */
export const registerUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: GraphQLString },
  },
  async resolve(
    parent: object,
    args: Args,
    { req }: any
  ): Promise<User | undefined> {
    try {
      // check if all required forms exist or not
      if (
        !args.firstName.length ||
        !args.lastName.length ||
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
            firstName: args.firstName,
            lastName: args.lastName,
            dob: args.dob,
            password: hashedPassword,
            email: args.email,
            phoneNumber: args.phoneNumber,
            status: ACCOUNTSTATUS.REGISTERINGTEAM,
            isAdmin: false,
            type: AccountType.CAPTAIN,
          },
          { where: { id: findUser.id } }
        );

        const user = await User.findOne({
          include: [{ model: Team, include: [Player] }],
          where: { id: findUser.id },
        });

        if (!user) throw Error('Could not find account - Please contact admin');

        // Set userId to session upon successful login.
        req.session.userId = findUser.id;
        req.session.isCaptain = true;

        return user;
      }
      throw Error('Could not find account - Please contact admin');
    } catch (err) {
      console.error('ERROR - createUser');
      console.error(err);
      throw Error('Server issue - please try again later');
    }
  },
};
