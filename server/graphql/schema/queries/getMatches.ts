import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import { MatchType } from '../../types/match';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { Match } from '../../../db/models/match.model';

/**
 * Get all match data for league.
 */
export const getMatches = {
  type: new GraphQLList(MatchType),
  args: { leagueId: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(parent: object, args: any): Promise<Match[]> {
    const Matches = await Match.findAll({
      include: [
        { model: LeagueTeam, as: 'homeTeam' },
        { model: LeagueTeam, as: 'awayTeam' },
      ],
      where: { leagueId: args.leagueId },
    });

    if (!Matches) {
      throw Error('Matches could not be found');
    }

    return Matches;
  },
};
