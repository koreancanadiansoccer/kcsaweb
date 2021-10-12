import { GraphQLNonNull, GraphQLString } from 'graphql';

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';

/**
 * Get all galleries data.
 */
export const getGallery = {
  type: GalleryType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any) {
    const gallery = await Gallery.findOne({
      include: [GalleryImage],
      where: { id: args.id },
    });

    return gallery;
  },
};
