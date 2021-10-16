import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';

import { MatchType } from '../../types/match';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { Match } from '../../../db/models/match.model';

/**
 * Create new match
 */
export const createMatch = {
  // type: new GraphQLList(MatchType),
  type: MatchType,
  args: {
    matchDay: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    leagueId: { type: new GraphQLNonNull(GraphQLInt) },
    homeTeamId: { type: new GraphQLNonNull(GraphQLInt) },
    awayTeamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: any): Promise<Match> {
    if (args.homeTeamId === args.awayTeamId) {
      throw Error("Can't create a match for between same teams!");
    }

    const match = await Match.create({ ...args });

    // Find league players from home team id.
    const homePlayers = await LeaguePlayer.findAll({
      where: { leagueTeamId: args.homeTeamId },
    });

    // Create new match player for this match, from league players
    if (homePlayers && homePlayers.length > 0) {
      await Promise.all(
        map(homePlayers, async (homePlayer) => {
          await MatchPlayer.create({
            name: homePlayer.name,
            leagueTeamId: args.homeTeamId,
            leaguePlayerId: homePlayer.id,
            matchId: match.id,
            playerId: homePlayer.playerId,
            dob: homePlayer.dob,
          });
        })
      );
    }

    // Find league players from away team id.
    const awayPlayers = await LeaguePlayer.findAll({
      where: { leagueTeamId: args.awayTeamId },
    });

    // Create new match player for this match, from league players
    if (awayPlayers && awayPlayers.length > 0) {
      await Promise.all(
        map(awayPlayers, async (awayPlayer) => {
          await MatchPlayer.create({
            name: awayPlayer.name,
            leagueTeamId: args.awayTeamId,
            leaguePlayerId: awayPlayer.id,
            matchId: match.id,
            playerId: awayPlayer.playerId,
            dob: awayPlayer.dob,
          });
        })
      );
    }

    const newMatch = await Match.findOne({
      include: [
        {
          model: LeagueTeam,
          as: 'homeTeam',
          include: [
            {
              model: MatchPlayer,
              where: { matchId: match.id, leagueTeamId: args.homeTeamId },
            },
          ],
        },
        {
          model: LeagueTeam,
          as: 'awayTeam',
          include: [
            {
              model: MatchPlayer,
              where: { matchId: match.id, leagueTeamId: args.awayTeamId },
            },
          ],
        },
      ],
      where: { leagueId: args.leagueId, id: match.id },
    });

    if (!newMatch) {
      throw Error('Created match could not be found');
    }
    // const Matches = await Match.findAll({
    //   include: [
    //     { model: LeagueTeam, as: 'homeTeam' },
    //     { model: LeagueTeam, as: 'awayTeam' },
    //   ],
    //   where: { id: args.leagueId },
    // });

    return newMatch;
  },
};
