import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';
import * as dotenv from 'dotenv';
import map from 'lodash/map';

import {
  User,
  AccountType,
  ACCOUNTSTATUS,
} from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { sendEmail } from '../../../utils/sendemail';
import { encodeIDBase64 } from '../utils';
dotenv.config();
interface Args {
  [key: string]: string | AccountType | ACCOUNTSTATUS;
}

export const sendEmailNotif = {
  type: GraphQLBoolean,
  args: {
    emails: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  },
  async resolve(parent: object, args: Args): Promise<boolean> {
    if (!args.emails || args.emails.length === 0) {
      throw Error('Email not specified!');
    }

    await Promise.all(
      map(args.emails, async (email) => {
        // Check we have records for these users.
        const findUser = await User.findOne({
          include: [Team],
          where: { email: email },
        });

        // TODO: Check for Email send type -'account invitation'.
        if (
          findUser &&
          findUser.status === ACCOUNTSTATUS.INVITED &&
          findUser.team?.name
        ) {
          // Encode user id.
          const cipherText = encodeIDBase64(findUser.id);

          // Send email
          await sendEmail(
            findUser.firstName,
            findUser.email,
            findUser.team.name,
            cipherText
          );
        }
      })
    );

    return true;
  },
};
