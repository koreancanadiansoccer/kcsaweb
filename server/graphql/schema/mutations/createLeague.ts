import { GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

import { LeagueType, LegaueTypeEnum } from "../../types/league";
import { League } from "../../../db/models/league.model";

/**
 * Create new league.
 */
export const createLeague = {
  type: new GraphQLList(LeagueType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    leagueType: { type: new GraphQLNonNull(LegaueTypeEnum) },
  },
  async resolve(parent: object, args: object) {
    console.log("create league");
    await League.create({ ...args });

    const leagues = await League.findAll();
    return leagues;
  },
};
