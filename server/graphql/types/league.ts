import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
} from "graphql";

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
    leagueType: { type: LegaueTypeEnum },
  }),
});
