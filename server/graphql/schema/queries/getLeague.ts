import { GraphQLNonNull, GraphQLString } from "graphql";

import { LeagueType } from "../../types/league";
import { League } from "../../../db/models/league.model";
import { LeagueTeam } from "../../../db/models/leagueteam.model";

/**
 * Get league data.
 */
export const getLeague = {
  type: LeagueType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any) {
    const league = await League.findOne({
      include: [LeagueTeam],
      where: { id: args.id },
    });

    return league;
  },
};
