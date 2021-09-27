import { GraphQLList } from "graphql";

import { TeamType } from "../../types/team";
import { Team } from "../../../db/models/team.model";

/**
 * Get all teams data.
 */
export const getTeams = {
  type: new GraphQLList(TeamType),
  async resolve() {
    const teams = await Team.findAll({
      order: [["createdAt", "DESC"]],
    });

    return teams;
  },
};
