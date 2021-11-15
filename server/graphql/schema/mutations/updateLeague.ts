import { GraphQLList } from 'graphql';
import map from 'lodash/map';
import { Op } from 'sequelize';

import { LeagueType, LeagueInputType } from '../../types/league';
import { TeamInputType } from '../../types/team';
import { League } from '../../../db/models/league.model';
import {
  LeagueTeam,
  LEAGUE_TEAM_STATUS,
} from '../../../db/models/leagueteam.model';
import { AdminGetLeauge } from '../utils';

/**
 * Create new league.
 */
export const updateLeague = {
  type: LeagueType,
  args: {
    newTeams: { type: new GraphQLList(TeamInputType) },
    league: { type: LeagueInputType },
  },
  async resolve(
    parent: object,
    args: object | any
  ): Promise<League | undefined> {
    const league = await League.findOne({
      where: { id: args.league.id },
    });

    if (!league) {
      throw Error('League to update could not be found');
    }

    // If we want to activate the league, first check there are no other active league for same age group.
    if (args.league.isActive) {
      const leagueSsam = await League.findOne({
        where: {
          leagueAgeType: league.leagueAgeType,
          isActive: true,
          id: { [Op.not]: league.id },
        },
      });

      if (leagueSsam) {
        throw Error(
          'Another league is currently active for same age group. Please deactivate the league first'
        );
      }
    }

    await League.update(args.league, { where: { id: args.league.id } });

    // Create new league team from provideded Team.
    if (args.newTeams && args.newTeams.length > 0) {
      await Promise.all(
        map(args.newTeams, async (newTeam) => {
          await LeagueTeam.create({
            teamId: newTeam.id,
            teamAgeType: newTeam.teamAgeType,
            leagueId: args.league.id,
            captainId: newTeam.captainId || null,
            status: LEAGUE_TEAM_STATUS.REGISTERED,
          });
        })
      );
    }

    return await AdminGetLeauge(args.league.id);
  },
};
