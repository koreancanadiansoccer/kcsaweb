import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { UserType } from '../../types/user';
import {
  User,
  AccountType,
  AccountStatus,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { sendEmail } from '../../../utils/sendemail';

interface Args {
  [key: string]: string | AccountType | AccountStatus;
}

export const sendInvite = {
  type: new GraphQLList(UserType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    teamName: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: Args): Promise<User[]> {
    if (!args.name || !args.email || !args.phoneNumber || !args.teamName) {
      throw Error('Please fill all required fields!');
    }

    // check if the user has already registered
    const findUser = await User.findOne({ where: { email: args.email } });

    if (findUser) {
      throw Error('User with same email address exist');
    }

    const user = await User.create({
      name: args.name,
      email: args.email,
      phoneNumber: args.phoneNumber,
      status: AccountStatus.INVITED,
      isAdmin: false,
    });

    // Create team
    const team = await Team.create({ name: args.teamName, captainId: user.id });

    //Send invitation email.
    await sendEmail(user.name, user.email, team.name);

    const users = await User.findAll({
      include: [Team],
      order: [['createdAt', 'DESC']],
    });

    return users;
  },
};
