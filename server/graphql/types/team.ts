import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { DateTime } from "./utils/dateType";

// Definition of types of 'league' that will be returned from graphql operations.
export const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    teamAgeType: { type: GraphQLString },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
    createdAt: { type: DateTime },
  }),
});
