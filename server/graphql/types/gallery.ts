import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

import { GalleryImageType } from "./gallery_image";
import { DateTime } from './utils/dateType';

// Definition of types of 'gallery' that will be returned from graphql operations.
export const GalleryType = new GraphQLObjectType({
  name: 'Gallery',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
    createdAt: { type: DateTime },
    galleryImages: { type: new GraphQLList(GalleryImageType) },
  }),
});

// Definition of types of 'Gallery' that will be used as input to graphql operation
export const ShowGalleryInputType = new GraphQLInputObjectType({
  name: 'ShowGalleryInput',
  fields: () => ({
    id: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
  }),
});
