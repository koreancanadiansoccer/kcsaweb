import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import omit from 'lodash/omit';
// password encryption
import { hash } from 'bcryptjs';

import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { UserInputType } from '../../types/user';
import { TeamInputType } from '../../types/team';
import { PlayerInputType } from '../../types/player';
import { DashboardViewerType } from '../../types/dashboard';

enum STEPS {
  CAPTAIN = 'CAPTAIN',
  UPDATETEAM = 'UPDATETEAM',
  UPDATEPLAYER = 'UPDATEPLAYER',
  CREATEPLAYER = 'CREATEPLAYER',
}

export const updateDashboard = {
  type: DashboardViewerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    step: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: UserInputType },
    team: { type: TeamInputType },
    player: { type: PlayerInputType },
    createPlayer: { type: PlayerInputType },
  },
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<{
    user: User | null;
    team: Team | null;
    leagueTeam: LeagueTeam | null;
  }> {
    const userId = req.session.userId;
    // Check if user is logged in.
    if (!userId || userId !== args.id) {
      throw Error('Invalid user - Please Login');
    }

    if (args.step === STEPS.CAPTAIN) {
      // console.log(args);
      const updateUser = args.user;
      if (!updateUser.password) {
        await User.update(omit(updateUser, ['password']), {
          where: { id: userId },
        });
      } else {
        const hashedPassword = await hash(updateUser.password, 8);
        await User.update(
          { ...updateUser, password: hashedPassword },
          {
            where: { id: userId },
          }
        );
      }
    }

    if (args.step === STEPS.UPDATETEAM) {
      await Team.update(args.team, {
        where: { id: args.team.id, captainId: userId },
      });
    }

    if (args.step === STEPS.UPDATEPLAYER) {
      if (args.player.id) {
        await Player.update(args.player, {
          where: { id: args.player.id },
        });
      } else {
        const team = await Team.findOne({
          where: { captainId: userId },
        });

        if (!team) {
          throw Error('Team does not exist to update player');
        }

        await Player.create({ ...args.player, teamId: team.id });
      }
    }

    // Retrieve back data.
    const user = await User.findOne({
      where: { id: userId },
    });

    const team = await Team.findOne({
      include: [Player],
      where: { captainId: userId },
    });

    const league = await League.findOne({
      where: { isActive: true, leagueAgeType: team?.teamAgeType },
    });

    let leagueTeam = null;
    if (league && league.id) {
      leagueTeam = await LeagueTeam.findOne({
        include: [LeaguePlayer],
        where: { leagueId: league?.id, teamId: team?.id },
      });
    }

    return { user, team, leagueTeam };
  },
};
