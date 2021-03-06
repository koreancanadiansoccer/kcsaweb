import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';

import { LeagueType } from '../../types/league';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { Match } from '../../../db/models/match.model';
import { League } from '../../../db/models/league.model';
import {
  MatchHomeSubmission,
  MatchSubmissionStatus,
} from '../../../db/models/matchhomesubmission.model';
import { MatchHomeSubmissionPlayers } from '../../../db/models/matchhomesubmissionplayers.model';
import { MatchAwaySubmission } from '../../../db/models/matchawaysubmission.model';
import { MatchAwaySubmissionPlayers } from '../../../db/models/matchawaysubmissionplayers.model';
import { AdminGetLeauge } from '../utils';

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

    const homeMatchSubmission = await MatchHomeSubmission.create({
      leagueId: args.leagueId,
      homeTeamId: args.homeTeamId,
      matchId: match.id,
      status: MatchSubmissionStatus.PENDING,
    });

    const awayMatchSubmission = await MatchAwaySubmission.create({
      leagueId: args.leagueId,
      awayTeamId: args.awayTeamId,
      matchId: match.id,
      status: MatchSubmissionStatus.PENDING,
    });

    // Find league players from home team id.
    const homePlayers = await LeaguePlayer.findAll({
      where: { leagueTeamId: args.homeTeamId },
    });

    // Create new match player for this match, from league players
    if (homePlayers && homePlayers.length > 0) {
      await Promise.all(
        map(homePlayers, async (homePlayer) => {
          await MatchPlayer.create({
            leagueTeamId: args.homeTeamId,
            leaguePlayerId: homePlayer.id,
            matchId: match.id,
            playerId: homePlayer.playerId,
          });

          await MatchHomeSubmissionPlayers.create({
            homeTeamId: args.homeTeamId,
            leaguePlayerId: homePlayer.id,
            matchId: match.id,
            playerId: homePlayer.playerId,
            matchHomeSubmissionId: homeMatchSubmission.id,
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
            leagueTeamId: args.awayTeamId,
            leaguePlayerId: awayPlayer.id,
            matchId: match.id,
            playerId: awayPlayer.playerId,
          });

          await MatchAwaySubmissionPlayers.create({
            awayTeamId: args.awayTeamId,
            leaguePlayerId: awayPlayer.id,
            leagueTeamId: args.awayTeamId,
            matchId: match.id,
            playerId: awayPlayer.playerId,
            matchAwaySubmissionId: awayMatchSubmission.id,
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

    return AdminGetLeauge(args.leagueId);
  },
};
