import { GraphQLNonNull, GraphQLInt } from 'graphql';

import { LeagueType } from '../../types/league';
import { League } from '../../../db/models/league.model';
import { AdminGetLeauge } from '../utils';

/**
 * Get league data.
 */
export const getLeague = {
  type: LeagueType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(parent: object, args: any): Promise<League> {
    return await AdminGetLeauge(args.id);
  },
};
