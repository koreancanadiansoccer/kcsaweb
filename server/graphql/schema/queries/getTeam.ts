import { GraphQLString, GraphQLNonNull } from 'graphql';

import { TeamType } from '../../types/team';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';

/**
 * Get one team specific data.
 */
export const getTeam = {
  type: TeamType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any): Promise<Team> {
    const team = await Team.findOne({
      include: [Player],
      where: { id: args.id },
    });

    if (!team) {
      throw Error('Team could not be found');
    }

    return team;
  },
};
