import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import * as dotenv from 'dotenv';

import { UserType } from '../../types/user';
import {
  User,
  AccountType,
  ACCOUNTSTATUS,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';

dotenv.config();
interface Args {
  [key: string]: string | AccountType | ACCOUNTSTATUS;
}

/**
 * Update captain from admin modal.
 */
export const updateCaptain = {
  type: new GraphQLList(UserType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    teamName: { type: new GraphQLNonNull(GraphQLString) },
    teamAgeType: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: Args): Promise<User[]> {
    if (
      !args.id ||
      !args.firstName ||
      !args.lastName ||
      !args.email ||
      !args.phoneNumber ||
      !args.teamName ||
      !args.teamAgeType
    ) {
      throw Error('Please fill all required fields!');
    }

    // Confirm we already have user account.
    const findUser = await User.findOne({ where: { id: args.id } });

    if (!findUser) {
      throw Error('User to update could not be retrieved.');
    }

    await User.update(
      {
        firstName: args.firstName,
        lastName: args.lastName,
        dob: args.dob,
        email: args.email,
        phoneNumber: args.phoneNumber,
        status: ACCOUNTSTATUS.INVITED,
        isAdmin: false,
        type: AccountType.CAPTAIN,
      },
      { where: { id: findUser.id } }
    );

    // Find team and update
    const team = await Team.findOne({
      where: { captainId: findUser.id },
    });

    if (team) {
      await Team.update(
        {
          name: args.teamName,
          teamAgeType: args.teamAgeType,
        },
        { where: { id: team.id } }
      );
    }

    const users = await User.findAll({
      include: [Team],
      order: [['createdAt', 'DESC']],
      where: { isAdmin: false },
    });

    return users;
  },
};
