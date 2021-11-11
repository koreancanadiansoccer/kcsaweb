import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import map from 'lodash/map';
import { Op } from 'sequelize';

import { LeaguePlayerInputType } from '../../types/player';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import {
  LeagueTeam,
  LEAGUE_TEAM_STATUS,
} from '../../../db/models/leagueteam.model';
import { Player } from '../../../db/models/player.model';
import { Match } from '../../../db/models/match.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { League } from '../../../db/models/league.model';
import { LeagueType } from '../../types/league';
import { AdminGetLeauge } from '../utils';
import { MatchHomeSubmission } from '../../../db/models/matchhomesubmission.model';
import { MatchHomeSubmissionPlayers } from '../../../db/models/matchhomesubmissionplayers.model';
import { MatchAwaySubmission } from '../../../db/models/matchawaysubmission.model';
import { MatchAwaySubmissionPlayers } from '../../../db/models/matchawaysubmissionplayers.model';

/**
 * Create new player
 */
export const createLeaguePlayers = {
  type: LeagueType,
  args: {
    newLeaguePlayers: { type: new GraphQLList(LeaguePlayerInputType) },
    leagueTeamId: { type: new GraphQLNonNull(GraphQLInt) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
    leagueId: { type: new GraphQLNonNull(GraphQLInt) },
    completeRegister: { type: GraphQLBoolean },
  },
  async resolve(parent: object, args: any): Promise<League> {
    // loop through newLeaguePlayers
    if (args.newLeaguePlayers && args.newLeaguePlayers.length > 0) {
      const matches = await Match.findAll({
        where: {
          leagueId: args.leagueId,
          [Op.or]: [
            { awayTeamId: args.leagueTeamId },
            { homeTeamId: args.leagueTeamId },
          ],
        },
      });

      await Promise.all(
        map(args.newLeaguePlayers, async (newLeaguePlayer) => {
          let leaguePlayer: LeaguePlayer;
          // If id exists,
          // Player was originally added in 'Players' table.
          if (newLeaguePlayer.id) {
            leaguePlayer = await LeaguePlayer.create({
              leagueTeamId: args.leagueTeamId,
              playerId: newLeaguePlayer.id,
            });
          }

          // If id doesn't exist, it's totally a new player.
          if (!newLeaguePlayer.id) {
            // First create a row in master 'Player' table
            const player = await Player.create({
              firstName: newLeaguePlayer.firstName,
              lastName: newLeaguePlayer.lastName,
              dob: newLeaguePlayer.dob,
              teamId: args.teamId,
            });

            // Then create a row in league player table.
            if (player) {
              leaguePlayer = await LeaguePlayer.create({
                leagueTeamId: args.leagueTeamId,
                playerId: player.id,
              });
            }
          }

          if (matches && matches.length > 0) {
            // Add new players into existing match players.
            await Promise.all(
              map(matches, async (match) => {
                await MatchPlayer.create({
                  leagueTeamId: args.leagueTeamId,
                  leaguePlayerId: leaguePlayer.id,
                  matchId: match.id,
                  playerId: leaguePlayer.playerId,
                });

                const homeSubmission = await MatchHomeSubmission.findOne({
                  where: {
                    homeTeamId: args.leagueTeamId,
                    matchId: match.id,
                  },
                });

                if (homeSubmission) {
                  await MatchHomeSubmissionPlayers.create({
                    homeTeamId: homeSubmission.homeTeamId,
                    leaguePlayerId: leaguePlayer.id,
                    matchId: match.id,
                    playerId: leaguePlayer.playerId,
                    matchHomeSubmissionId: homeSubmission.id,
                  });
                }

                const awaySubmission = await MatchAwaySubmission.findOne({
                  where: {
                    homeTeamId: args.leagueTeamId,
                    matchId: match.id,
                  },
                });

                if (awaySubmission) {
                  await MatchAwaySubmissionPlayers.create({
                    awayTeamId: awaySubmission.awayTeamId,
                    leaguePlayerId: leaguePlayer.id,
                    matchId: match.id,
                    playerId: leaguePlayer.playerId,
                    matchHomeSubmissionId: awaySubmission.id,
                  });
                }
              })
            );
          }
        })
      );
    }

    if (args.completeRegister) {
      await LeagueTeam.update(
        { status: LEAGUE_TEAM_STATUS.REGISTERED },
        { where: { id: args.leagueTeamId } }
      );
    }

    return await AdminGetLeauge(args.leagueId);
  },
};
