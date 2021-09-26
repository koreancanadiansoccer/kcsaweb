import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

// Definition of types of 'league' that will be returned from graphql operations.
export const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    played: { type: GraphQLInt },
    goalScored: { type: GraphQLInt },
    goalConceded: { type: GraphQLInt },
    win: { type: GraphQLInt },
    loss: { type: GraphQLInt },
  }),
});
