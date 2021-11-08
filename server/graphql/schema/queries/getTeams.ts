import { GraphQLList, GraphQLString } from 'graphql';

import { TeamType } from '../../types/team';
import { Team } from '../../../db/models/team.model';
import { User } from '../../../db/models/user.model';

/**
 * Get all teams data.
 */
export const getTeams = {
  type: new GraphQLList(TeamType),
  args: { leagueAgeType: { type: GraphQLString } },
  async resolve(parent: object, args: any): Promise<Team[]> {
    const whereStatement: { [key: string]: string } = {};

    if (args.leagueAgeType) whereStatement.teamAgeType = args.leagueAgeType;

    const teams = await Team.findAll({
      include: [
        { as: 'captain', model: User, duplicating: false, subQuery: false },
      ],
      order: [['createdAt', 'DESC']],
      where: whereStatement,
    });
    return teams;
  },
};
