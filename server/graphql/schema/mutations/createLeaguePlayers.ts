import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import map from 'lodash/map';

import { LeaguePlayerInputType, LeaguePlayerType } from '../../types/player';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';

/**
 * Create new player
 */
export const createLeaguePlayers = {
  type: new GraphQLList(LeaguePlayerType),
  args: {
    newLeaguePlayers: { type: new GraphQLList(LeaguePlayerInputType) },
    leagueTeamId: { type: new GraphQLNonNull(GraphQLInt) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: any): Promise<LeaguePlayer[]> {
    // loop through newLeaguePlayers
    await Promise.all(
      map(args.newLeaguePlayers, async (newLeaguePlayer) => {
        // If id exists,
        // Player was originally added in 'Players' table.
        if (newLeaguePlayer.id) {
          await LeaguePlayer.create({
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
            await LeaguePlayer.create({
              name: newLeaguePlayer.name,
              dob: newLeaguePlayer.dob,
              leagueTeamId: args.leagueTeamId,
              playerId: player.id,
            });
          }
        }
      })
    );

    //TODO update match players
    const leaguePlayers = await LeaguePlayer.findAll({
      order: [['createdAt', 'DESC']],
      where: { leagueTeamId: args.leagueTeamId },
    });

    return leaguePlayers;
  },
};
