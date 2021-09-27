import { GraphQLNonNull, GraphQLString } from "graphql";

import { LeagueType } from "../../types/league";
import { League } from "../../../db/models/league.model";
import { Team } from "../../../db/models/team.model";

/**
 * Get league data.
 */
export const getLeague = {
  type: LeagueType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any) {
    const league = await League.findOne({
      include: [Team],
      where: { id: args.id },
    });

    return league;
  },
};
