import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
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

// Definition of types of 'announcement' that will be used as input to graphql operation
export const ShowAnnouncementInputType = new GraphQLInputObjectType({
  name: 'ShowAnnouncementInput',
  fields: () => ({
    id: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
  }),
});
