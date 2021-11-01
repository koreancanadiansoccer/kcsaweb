import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

import { PlayerType } from '../../types/player';
import { Player } from '../../../db/models/player.model';

/**
 * Create new player
 */
export const createPlayer = {
  type: PlayerType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: new GraphQLNonNull(GraphQLString) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: object): Promise<Player> {
    const player = await Player.create({ ...args });
    return player;
  },
};
