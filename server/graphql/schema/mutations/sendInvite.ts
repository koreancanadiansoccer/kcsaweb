import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import * as dotenv from 'dotenv';

import { UserType } from '../../types/user';
import {
  User,
  AccountType,
  AccountStatus,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { sendEmail } from '../../../utils/sendemail';
import { encodeIDBase64 } from '../utils';
dotenv.config();
interface Args {
  [key: string]: string | AccountType | AccountStatus;
}

export const sendInvite = {
  type: new GraphQLList(UserType),
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    teamName: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: Args): Promise<User[]> {
    if (
      !args.firstName ||
      !args.lastName ||
      !args.email ||
      !args.phoneNumber ||
      !args.teamName
    ) {
      throw Error('Please fill all required fields!');
    }

    // check if the user has already registered
    const findUser = await User.findOne({ where: { email: args.email } });

    if (findUser) {
      throw Error('User with same email address exist');
    }

    //4d657373616765
    const user = await User.create({
      firstName: args.firstName,
      lastName: args.lastName,
      dob: args.dob,
      email: args.email,
      phoneNumber: args.phoneNumber,
      status: AccountStatus.INVITED,
      isAdmin: false,
    });
    const cipherText = encodeIDBase64(user.id);

    // Create team
    const team = await Team.create({ name: args.teamName, captainId: user.id });

    // Send invitation email.
    await sendEmail(user.firstName, user.email, team.name, cipherText);

    const users = await User.findAll({
      include: [Team],
      order: [['createdAt', 'DESC']],
    });

    return users;
  },
};
