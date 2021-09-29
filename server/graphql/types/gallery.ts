import {
  GraphQLList,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

import { GalleryImageType } from "./gallery_image";

// Definition of types of 'gallery' that will be returned from graphql operations.
export const GalleryType = new GraphQLObjectType({
  name: 'Gallery',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
    images: { type: new GraphQLList(GalleryImageType) },
  }),
});