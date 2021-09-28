import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import { GalleryType } from '../../types/gallery';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from "../../../db/models/galleryimage.model";
/**
 * Create new gallery.
 */
export const addGallery = {
  type: new GraphQLList(GalleryType),
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
  },
  async resolve(parent: object, args: object) {
    await Gallery.create({ ...args });

    const galleries = await Gallery.findAll({
      include: [GalleryImage],
    });
    return galleries;
  },
};
