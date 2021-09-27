import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";

import { LeagueType } from "../../types/league";
import { League } from "../../../db/models/league.model";
import { Team } from "../../../db/models/team.model";

/**
 * Create new league.
 */
export const createLeague = {
  type: new GraphQLList(LeagueType),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    leagueAgeType: { type: new GraphQLNonNull(GraphQLString) },
    leagueType: { type: new GraphQLNonNull(GraphQLString) },
    maxYellowCard: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: object) {
    await League.create({ ...args });

    const leagues = await League.findAll({
      include: [Team],
      order: [["createdAt", "DESC"]],
    });

    return leagues;
  },
};
