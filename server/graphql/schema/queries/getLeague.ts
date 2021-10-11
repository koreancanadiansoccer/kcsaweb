import { GraphQLNonNull, GraphQLInt } from 'graphql';

import { LeagueType } from '../../types/league';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { Match } from '../../../db/models/match.model';

/**
 * Get league data.
 */
export const getLeague = {
  type: LeagueType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(parent: object, args: any): Promise<League> {
    const league = await League.findOne({
      include: [
        { model: LeagueTeam, as: 'leagueTeams', include: [LeaguePlayer] },
        {
          model: Match,
          include: [
            { model: LeagueTeam, as: 'homeTeam', include: [MatchPlayer] },
            { model: LeagueTeam, as: 'awayTeam', include: [MatchPlayer] },
          ],
        },
      ],
      where: { id: args.id },
    });

    if (!league) {
      throw Error('League could not be found');
    }

    return league;
  },
};
