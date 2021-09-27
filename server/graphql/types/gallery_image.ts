import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

// Definition of types of 'gallery_image' that will be returned from graphql operations.
export const GalleryImageType = new GraphQLObjectType({
  name: 'GalleryImage',
  fields: () => ({
    id: { type: GraphQLInt },
    imageURL: { type: GraphQLString },
  }),
});
