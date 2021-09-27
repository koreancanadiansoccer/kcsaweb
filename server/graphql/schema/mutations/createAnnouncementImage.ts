import { GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

import { AnnouncemenImageType } from "../../types/announcement_image";
import { AnnouncementImage } from "../../../db/models/announcementimage.model";

/**
 * Create new announcement image.
 */
export const createAnnouncementImage = {
  type: new GraphQLList(AnnouncemenImageType),
  args: {
    imageURL: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: object, args: object) {
    console.log("create announcement_image");
    await AnnouncementImage.create({ ...args });

    const announcement_images = await AnnouncementImage.findAll();
    return announcement_images;
  },
};
