import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import { GalleryImageType } from '../../types/gallery_image';
import { GalleryImage } from '../../../db/models/galleryimage.model';

/**
 * Create new gallery Images.
 */
export const addGalleryImages = {
  type: new GraphQLList(GalleryImageType),
  args: {
    imageURL: { type: new GraphQLNonNull(GraphQLString) },
    showOnHomepage: { type: GraphQLBoolean },
  },
  async resolve(parent: object, args: object) {
    console.log('add announcement');
    await GalleryImage.create({ ...args });

    const galleries = await GalleryImage.findAll();
    return galleries;
  },
};
