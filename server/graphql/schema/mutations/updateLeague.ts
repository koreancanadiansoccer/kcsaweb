import { GraphQLList } from 'graphql';
import map from 'lodash/map';

import { LeagueType, LeagueInputType } from '../../types/league';
import { TeamInputType } from '../../types/team';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';

/**
 * Create new league.
 */
export const updateLeague = {
  type: LeagueType,
  args: {
    newTeams: { type: new GraphQLList(TeamInputType) },
    league: { type: LeagueInputType },
    // name: { type: new GraphQLNonNull(GraphQLString) },
    // leagueAgeType: { type: new GraphQLNonNull(GraphQLString) },
    // leagueType: { type: new GraphQLNonNull(GraphQLString) },
    // maxYellowCard: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(
    parent: object,
    args: object | any
  ): Promise<League | undefined> {
    const league = await League.findOne({
      include: [LeagueTeam],
      where: { id: args.league.id },
    });

    if (!league) {
      throw Error('League to update could not be found');
    }

    await League.update(args.league, { where: { id: args.league.id } });

    // Create new league team from providede Team.
    if (args.newTeams && args.newTeams.length > 0) {
      await Promise.all(
        map(args.newTeams, async (newTeam) => {
          await LeagueTeam.create({
            name: newTeam.name,
            teamId: newTeam.id,
            teamAgeType: newTeam.teamAgeType,
            leagueId: args.league.id,
          });
        })
      );
    }

    const updatedLeague = await League.findOne({
      include: [LeagueTeam],
      where: { id: args.league.id },
    });

    if (!updatedLeague) {
      throw Error('Updated League could not be retrieved');
    }

    return updatedLeague;
  },
};
