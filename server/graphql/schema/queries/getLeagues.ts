import { GraphQLList } from "graphql";

import { LeagueType } from "../../types/league";
import { League } from "../../../db/models/league.model";
import { Team } from "../../../db/models/team.model";

/**
 * Get all league data.
 */
export const getLeagues = {
  type: new GraphQLList(LeagueType),
  async resolve() {
    const leagues = await League.findAll({
      include: [Team],
      order: [["createdAt", "DESC"]],
    });

    return leagues;
  },
};
