import { GraphQLList, GraphQLBoolean } from 'graphql';

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';

/**
 * Get galleries data only showOnHomepage is true.
 */
export const getMainGalleries = {
  type: new GraphQLList(GalleryType),
  async resolve(parent: object, args: any) {
    const galleries = await Gallery.findAll({
      include: [GalleryImage],
      where: { showOnHomepage: true },
      order: [['createdAt', 'DESC']],
    });

    return galleries;
  },
};
