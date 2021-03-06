import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import map from 'lodash/map';

import { User, ACCOUNTSTATUS } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';
import { UserType } from '../../types/user';
import { TeamInputType } from '../../types/team';
import { PlayerInputType } from '../../types/player';

enum STEPS {
  TEAM = 'TEAM',
  PLAYERS = 'PLAYERS',
}

export const registerTeam = {
  type: UserType,
  args: {
    step: { type: new GraphQLNonNull(GraphQLString) },
    team: { type: TeamInputType },
    players: { type: new GraphQLList(PlayerInputType) },
  },
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<User | undefined> {
    // Check if user is logged in.
    if (!req.session.userId) {
      throw Error(`Please Login ${req.session.userId}`);
    }

    try {
      if (args.step === STEPS.TEAM) {
        await Team.update(args.team, { where: { id: args.team.id } });
      }

      if (args.step === STEPS.PLAYERS) {
        // Destroy all players.
        const team = await Team.findOne({
          where: { captainId: req.session.userId },
        });

        if (team) {
          await Player.destroy({
            where: { teamId: team.id },
          });

          await Promise.all(
            map(args.players, async (player) => {
              await Player.create({
                firstName: player.firstName,
                lastName: player.lastName,
                dob: player.dob,
                teamId: team.id,
              });
            })
          );

          // Update User status to completed registration.
          await User.update(
            {
              phoneNumber: args.phoneNumber,
              status: ACCOUNTSTATUS.COMPLETED,
            },
            { where: { id: req.session.userId } }
          );
        }
      }

      const user = await User.findOne({
        include: [{ model: Team, include: [Player] }],
        where: { id: req.session.userId },
      });

      if (!user) throw Error('Could not find account - Please contact admin');

      return user;
    } catch (e) {
      console.error('ERROR - registerTeam');
      console.error(e);
      throw Error('Server issue - please try again later');
    }
  },
};
