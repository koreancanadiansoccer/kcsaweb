import { GraphQLString, GraphQLNonNull } from "graphql";

import { TeamType } from "../../types/team";
import { Team } from "../../../db/models/team.model";

/**
 * Get one team specific data.
 */
export const getTeam = {
  type: TeamType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any) {
    const team = await Team.findOne({
      where: { id: args.id },
    });

    return team;
  },
};
