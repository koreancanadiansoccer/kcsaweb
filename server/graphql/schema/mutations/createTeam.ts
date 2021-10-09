import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { TeamType } from '../../types/team';
import { Team } from '../../../db/models/team.model';

/**
 * Create new team.
 * TODO: Update all params
 */
export const createTeam = {
  type: new GraphQLList(TeamType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    teamAgeType: { type: new GraphQLNonNull(GraphQLString) },
    teamColor: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: object): Promise<Team[]> {
    await Team.create({ ...args });

    const teams = await Team.findAll({
      order: [['createdAt', 'DESC']],
    });

    return teams;
  },
};
