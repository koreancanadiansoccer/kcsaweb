import { GraphQLList, GraphQLString } from 'graphql';

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';

/**
 * Get all galleries data.
 */
export const getGalleries = {
  type: new GraphQLList(GalleryType),
  async resolve() {
    const galleries = await Gallery.findAll({
      include: [GalleryImage],
      order: [['createdAt', 'DESC']],
    });

    return galleries;
  },
};
