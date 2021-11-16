import { GraphQLInt, GraphQLNonNull } from 'graphql';

import { Team } from '../../../db/models/team.model';
import {
  LEAGUE_TEAM_STATUS,
  LeagueTeam,
} from '../../../db/models/leagueteam.model';
import { League } from '../../../db/models/league.model';
import { LeagueTeamType } from '../../types/team';

interface Args {
  [key: string]: string;
}

// Confirm register.
export const registerLeagueTeam = {
  type: LeagueTeamType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    leagueId: { type: new GraphQLNonNull(GraphQLInt) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(
    parent: object,
    args: Args,
    { req }: any
  ): Promise<LeagueTeam | null> {
    if (!req.session.userId || req.session.userId !== args.userId) {
      throw Error(`Please Login ${args.userId} ${req.session.userId}`);
    }

    // Find team.
    const findTeam = await Team.findOne({
      where: { id: args.teamId },
    });

    if (!findTeam) throw Error('No Team found');

    // Double check there is a league is active.
    const findLeague = await League.findOne({
      where: {
        id: args.leagueId,
        isActive: true,
        leagueAgeType: findTeam?.teamAgeType,
      },
    });

    if (!findLeague) throw Error('No active league found');

    const findLeagueTeam = await LeagueTeam.findOne({
      where: {
        teamId: findTeam.id,
        leagueId: findLeague.id,
        captainId: findTeam.captainId,
      },
    });

    if (findLeagueTeam) {
      await LeagueTeam.update(
        { status: LEAGUE_TEAM_STATUS.CLUBCONFIRMED },
        { where: { id: findLeagueTeam.id } }
      );
    } else {
      await LeagueTeam.create({
        teamId: findTeam.id,
        leagueId: findLeague.id,
        captainId: findTeam.captainId,
        status: LEAGUE_TEAM_STATUS.CLUBCONFIRMED,
      });
    }

    const leagueTeam = await LeagueTeam.findOne({
      where: {
        teamId: findTeam.id,
        leagueId: findLeague.id,
        captainId: findTeam.captainId,
      },
    });

    return leagueTeam;
  },
};
