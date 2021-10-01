import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

import { DateTime } from "./utils/dateType";

import { AnnouncemenImageType } from "./announcement_image";

// Definition of types of 'announcement' that will be returned from graphql operations.
export const AnnouncementType = new GraphQLObjectType({
  name: "Announcement",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    content: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
    createdAt: { type: DateTime },
    images: { type: new GraphQLList(AnnouncemenImageType) },
  }),
});
