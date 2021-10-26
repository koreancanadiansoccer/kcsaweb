import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';

/**
 * Update gallery data
 */
export const updateGallery = {
  type: new GraphQLList(GalleryType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    showOnHomepage: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent: object, args: object |any) {
    const gallery = await Gallery.findOne({
      where: { id: args.id },
    });

    if (!gallery) {
      throw Error('Gallery to update could not be found');
    }

    const updatedGallery = await Gallery.update({ ...args }, {
      where: { id: args.id },
    });

    if (!updatedGallery) {
      throw Error('Gallery to update could not be found');
    }

    const Galleries = await Gallery.findAll({
      include: [GalleryImage],
      order: [['createdAt', 'DESC']],
    });

    return Galleries;
  },
};
