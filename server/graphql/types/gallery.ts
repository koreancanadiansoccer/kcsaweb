import {
  GraphQLList,
  GraphQLObjectType,
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
    subTitle: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
    createdAt: { type: DateTime },
    galleryImages: { type: new GraphQLList(GalleryImageType) },
  }),
});
