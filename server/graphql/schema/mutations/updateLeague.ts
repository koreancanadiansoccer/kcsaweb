import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import map from "lodash/map";

import { LeagueType, LeagueInputType } from "../../types/league";
import { LeagueTeamType, LeagueTeamInputType } from "../../types/team";
import { League } from "../../../db/models/league.model";
import { LeagueTeam } from "../../../db/models/leagueteam.model";

/**
 * Create new league.
 */
export const updateLeague = {
  type: new GraphQLList(LeagueType),
  args: {
    newTeams: { type: new GraphQLList(LeagueTeamInputType) },
    league: { type: LeagueInputType },
    // name: { type: new GraphQLNonNull(GraphQLString) },
    // leagueAgeType: { type: new GraphQLNonNull(GraphQLString) },
    // leagueType: { type: new GraphQLNonNull(GraphQLString) },
    // maxYellowCard: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent: object, args: object | any) {
    // Create new league team
    if (args.newTeams) {
      await Promise.all(
        map(args.newTeams, async (newTeam) => {
          await LeagueTeam.create({
            name: newTeam.name,
            teamId: newTeam.id,
            teamAgeType: newTeam.teamAgeType,
            leagueId: args.league.id,
          });
        })
      );
    }

    const league = await League.findOne({
      include: [LeagueTeam],
      where: { id: args.league.id },
    });

    return league;
  },
};
