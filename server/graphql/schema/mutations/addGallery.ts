import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';

/**
 * Create new gallery.
 */
export const addGallery = {
  type: new GraphQLList(GalleryType),
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    showOnHomepage: { type: GraphQLBoolean },
  },
  async resolve(parent: object, args: object) {
    console.log('add announcement');
    await Gallery.create({ ...args });

    const galleries = await Gallery.findAll();
    return galleries;
  },
};
