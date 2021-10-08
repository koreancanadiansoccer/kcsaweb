import { GraphQLNonNull, GraphQLInt } from 'graphql';

import { LeagueType } from '../../types/league';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';

/**
 * Get league data.
 */
export const getLeague = {
  type: LeagueType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(parent: object, args: any): Promise<League> {
    const league = await League.findOne({
      include: [{ model: LeagueTeam, include: [LeaguePlayer] }],
      where: { id: args.id },
    });

    if (!league) {
      throw Error('League could not be found');
    }

    return league;
  },
};
