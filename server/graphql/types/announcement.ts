import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

import { DateTime } from './utils/dateType';

// Definition of types of 'announcement' that will be returned from graphql operations.
export const AnnouncementType = new GraphQLObjectType({
  name: 'Announcement',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    content: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
    createdAt: { type: DateTime },
  }),
});
