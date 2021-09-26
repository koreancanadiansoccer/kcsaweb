import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
} from "graphql";

// Definition of types of 'league' that will be returned from graphql operations.
export const AnnouncementType = new GraphQLObjectType({
  name: "Announcement",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    content: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
  }),
});
