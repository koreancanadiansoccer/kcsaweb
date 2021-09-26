import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

// Definition of types of 'league' that will be returned from graphql operations.
export const AnnouncemenImagetType = new GraphQLObjectType({
  name: "AnnouncementImage",
  fields: () => ({
    id: { type: GraphQLInt },
    imageURL: { type: GraphQLString },
  }),
});
