import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import * as dotenv from 'dotenv';

import { UserType } from '../../types/user';
import {
  User,
  AccountType,
  ACCOUNTSTATUS,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { sendEmail, generateSignupHTML } from '../../../utils/sendemail';
import { encodeIDBase64 } from '../utils';
dotenv.config();

interface Args {
  [key: string]: string | AccountType | ACCOUNTSTATUS;
}

export const sendInvite = {
  type: new GraphQLList(UserType),
  args: {
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
      !args.firstName ||
      !args.lastName ||
      !args.email ||
      !args.phoneNumber ||
      !args.teamName ||
      !args.teamAgeType
    ) {
      throw Error('Please fill all required fields!');
    }

    // check if the user has already registered
    const findUser = await User.findOne({ where: { email: args.email } });

    if (findUser) {
      throw Error('User with same email address exist');
    }

    const user = await User.create({
      firstName: args.firstName,
      lastName: args.lastName,
      dob: args.dob,
      email: args.email,
      phoneNumber: args.phoneNumber,
      status: ACCOUNTSTATUS.INVITED,
      isAdmin: false,
    });

    // Encode user id.
    const cipherText = encodeIDBase64(user.id);

    // Create team
    const team = await Team.create({
      name: args.teamName,
      teamAgeType: args.teamAgeType,
      captainId: user.id,
    });

    // Send invitation email.
    await sendEmail(
      user.email,
      'KCSA Captain Invitation',
      generateSignupHTML(user.firstName, user.email, team.name, cipherText)
    );

    const users = await User.findAll({
      include: [Team],
      order: [['createdAt', 'DESC']],
      where: { isAdmin: false },
    });

    return users;
  },
};
