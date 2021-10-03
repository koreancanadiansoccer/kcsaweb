import { GraphQLList, GraphQLString } from "graphql";

import { TeamType } from "../../types/team";
import { Team } from "../../../db/models/team.model";

/**
 * Get all teams data.
 */
export const getTeams = {
  type: new GraphQLList(TeamType),
  args: { leagueAgeType: { type: GraphQLString } },
  async resolve(parent: object, args: any) {
    const whereStatement: { [key: string]: string } = {};

    if (args.leagueAgeType) whereStatement.teamAgeType = args.leagueAgeType;

    const teams = await Team.findAll({
      order: [["createdAt", "DESC"]],
      where: whereStatement,
    });

    return teams;
  },
};
