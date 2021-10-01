import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

import { DateTime } from "./utils/dateType";

// Definition of types of 'announcement image' that will be returned from graphql operations.
export const AnnouncemenImageType = new GraphQLObjectType({
  name: "AnnouncementImage",
  fields: () => ({
    id: { type: GraphQLInt },
    imageURL: { type: GraphQLString },
    createdAt: { type: DateTime },
  }),
});
