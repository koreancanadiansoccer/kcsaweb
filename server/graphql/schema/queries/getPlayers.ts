import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';

import { PlayerType } from '../../types/player';
import { Player } from '../../../db/models/player.model';

/**
 * Get all players for team.
 */
export const getPlayers = {
  type: new GraphQLList(PlayerType),
  args: { teamId: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(parent: object, args: any): Promise<Player[]> {
    const whereStatement: { [key: string]: string } = {};

    if (args.teamId) whereStatement.teamId = args.teamId;

    const players = await Player.findAll({
      order: [['createdAt', 'DESC']],
      where: whereStatement,
    });

    return players;
  },
};
