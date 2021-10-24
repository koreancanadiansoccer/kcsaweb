import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';

import { LeagueType } from '../../types/league';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { Match } from '../../../db/models/match.model';
import { Team } from '../../../db/models/team.model';
import { League } from '../../../db/models/league.model';

/**
 * Create new match
 */
export const createMatch = {
  // type: new GraphQLList(MatchType),
  type: LeagueType,
  args: {
    matchDay: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    leagueId: { type: new GraphQLNonNull(GraphQLInt) },
    homeTeamId: { type: new GraphQLNonNull(GraphQLInt) },
    awayTeamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: any): Promise<League> {
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
    const league = await League.findOne({
      include: [
        {
          model: LeagueTeam,
          as: 'leagueTeams',
          required: true,
          duplicating: false,
          include: [
            LeaguePlayer,
            {
              model: Team,
              as: 'team',
              required: false,
            },
          ],
        },
        {
          model: Match,
          as: 'matches',
          required: true,
          duplicating: false,
          include: [
            {
              as: 'homeTeam',
              model: LeagueTeam,
              required: true,
              duplicating: false,
              subQuery: false,
              include: [
                MatchPlayer,
                {
                  model: Team,
                  as: 'team',
                  required: true,
                },
              ],
            },
            {
              model: LeagueTeam,
              as: 'awayTeam',
              required: true,
              duplicating: false,
              include: [
                MatchPlayer,
                {
                  model: Team,
                  as: 'team',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      where: { id: args.leagueId },
      subQuery: false,
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
