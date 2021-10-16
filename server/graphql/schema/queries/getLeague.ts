import { GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';

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
            { model: LeagueTeam, as: 'homeTeam' },
            { model: LeagueTeam, as: 'awayTeam' },
          ],
        },
      ],
      where: { id: args.id },
    });

    if (!league) {
      throw Error('League could not be found');
    }

    // Get league match players.
    // Looks like sequelize can't handle deeply nested query with conditions.
    await Promise.all(
      map(league.matches, async (match, idx) => {
        const matchId = match.id;
        const { id: homeTeamId } = match.homeTeam;
        const { id: awayTeamId } = match.awayTeam;

        //Find players
        const homeMatchPlayers = await MatchPlayer.findAll({
          raw: true,
          where: { matchId: matchId, leagueTeamId: homeTeamId },
        });

        const awayMatchPlayers = await MatchPlayer.findAll({
          raw: true,
          where: { matchId: matchId, leagueTeamId: awayTeamId },
        });

        league.matches[idx].homeTeam.matchPlayers = homeMatchPlayers;
        league.matches[idx].awayTeam.matchPlayers = awayMatchPlayers;
      })
    );

    return league;
  },
};
