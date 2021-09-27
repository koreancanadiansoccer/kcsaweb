import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList,
} from "graphql";
import { TeamType } from "./team";
import { DateTime } from "./utils/dateType";

export const LegaueTypeEnum = new GraphQLEnumType({
  name: "LegaueTypeEnum",
  values: {
    OPEN: {
      value: "OPEN",
    },
    SENIOR: {
      value: "SENIOR",
    },
  },
});

// Definition of types of 'league' that will be returned from graphql operations.
export const LeagueType = new GraphQLObjectType({
  name: "League",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    leagueAgeType: { type: GraphQLString },
    leagueType: { type: GraphQLString },
    maxYellowCard: { type: GraphQLInt },
    createdAt: { type: DateTime },
    teams: { type: new GraphQLList(TeamType) },
  }),
});
