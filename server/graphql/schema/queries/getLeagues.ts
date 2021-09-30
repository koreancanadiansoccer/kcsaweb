import { GraphQLList } from "graphql";

import { LeagueType } from "../../types/league";
import { League } from "../../../db/models/league.model";
import { LeagueTeam } from "../../../db/models/leagueteam.model";

/**
 * Get all league data.
 */
export const getLeagues = {
  type: new GraphQLList(LeagueType),
  async resolve() {
    const leagues = await League.findAll({
      include: [LeagueTeam],
      order: [["createdAt", "DESC"]],
    });

    return leagues;
  },
};
