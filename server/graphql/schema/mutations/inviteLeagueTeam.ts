import { GraphQLNonNull, GraphQLInt } from 'graphql';

import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import {
  LEAGUE_TEAM_STATUS,
  LeagueTeam,
} from '../../../db/models/leagueteam.model';
import { League } from '../../../db/models/league.model';
import { sendEmail, generateLeagueInvHTML } from '../../../utils/sendemail';
import { LeagueType } from '../../types/league';
import { AdminGetLeauge } from '../utils';

interface Args {
  [key: string]: string;
}

export const inviteLeagueTeam = {
  type: LeagueType,
  args: {
    leagueId: { type: new GraphQLNonNull(GraphQLInt) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(
    parent: object,
    args: Args

    // { req }: any
  ): Promise<League> {
    // TODO: Admin check
    // if (!req.session.userId) {
    //   throw Error('Please Login');
    // }

    // Find team.
    const team = await Team.findOne({
      where: { id: args.teamId },
    });

    if (!team) throw Error('No Team found');

    // Double check there is a league is active.
    const league = await League.findOne({
      where: {
        id: args.leagueId,
        isActive: true,
        leagueAgeType: team?.teamAgeType,
      },
    });

    if (!league) throw Error('No active league found');

    // Find league team.
    const leagueTeam = await LeagueTeam.findOne({
      where: {
        teamId: team.id,
        leagueId: league.id,
        captainId: team.captainId,
      },
    });

    if (leagueTeam) {
      await LeagueTeam.update(
        { status: LEAGUE_TEAM_STATUS.INVITED },
        {
          where: {
            teamId: team.id,
            leagueId: league.id,
            captainId: team.captainId,
          },
        }
      );
    } else {
      // Create league team.
      await LeagueTeam.create({
        teamId: team.id,
        leagueId: league.id,
        captainId: team.captainId,
        status: LEAGUE_TEAM_STATUS.INVITED,
      });
    }

    // Send email.
    const captain = await User.findOne({ where: { id: team.captainId } });
    if (!captain) throw Error('No active league found');

    const name = `${captain?.firstName}`;
    const email = captain?.email;
    const leagueName = `${league.year} ${league.name} ${league.leagueType}`;
    await sendEmail(
      email,
      `${leagueName} Invitation`,
      generateLeagueInvHTML(name, leagueName)
    );
    return await AdminGetLeauge(league.id);
  },
};
