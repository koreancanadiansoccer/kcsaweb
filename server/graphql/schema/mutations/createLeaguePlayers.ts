import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';
import { Op } from 'sequelize';

import { LeaguePlayerInputType } from '../../types/player';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';
import { Match } from '../../../db/models/match.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { League } from '../../../db/models/league.model';
import { LeagueType } from '../../types/league';
import { AdminGetLeauge } from '../utils';

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
  },
  async resolve(parent: object, args: any): Promise<League> {
    //TODO update match players

    const matches = await Match.findAll({
      where: {
        leagueId: args.leagueId,
        [Op.or]: [
          { awayTeamId: args.leagueTeamId },
          { homeTeamId: args.leagueTeamId },
        ],
      },
    });

    // loop through newLeaguePlayers
    await Promise.all(
      map(args.newLeaguePlayers, async (newLeaguePlayer) => {
        let leaguePlayer: LeaguePlayer;
        // If id exists,
        // Player was originally added in 'Players' table.
        if (newLeaguePlayer.id) {
          leaguePlayer = await LeaguePlayer.create({
            name: newLeaguePlayer.name,
            dob: newLeaguePlayer.dob,
            leagueTeamId: args.leagueTeamId,
            playerId: newLeaguePlayer.id,
          });
        }

        // If id doesn't exist, it's totally a new player.
        if (!newLeaguePlayer.id) {
          // First create a row in master 'Player' table
          const player = await Player.create({
            name: newLeaguePlayer.name,
            dob: newLeaguePlayer.dob,
            teamId: args.teamId,
          });

          // Then create a row in league player table.
          if (player) {
            leaguePlayer = await LeaguePlayer.create({
              name: newLeaguePlayer.name,
              dob: newLeaguePlayer.dob,
              leagueTeamId: args.leagueTeamId,
              playerId: player.id,
            });
          }
        }

        if (matches && matches.length > 0) {
          await Promise.all(
            map(matches, async (match) => {
              await MatchPlayer.create({
                name: leaguePlayer.name,
                leagueTeamId: args.leagueTeamId,
                leaguePlayerId: leaguePlayer.id,
                matchId: match.id,
                playerId: leaguePlayer.playerId,
                dob: leaguePlayer.dob,
              });
            })
          );
        }
      })
    );

    return await AdminGetLeauge(args.leagueId);
  },
};
