import { GraphQLNonNull, GraphQLString } from "graphql";

import { AnnouncementType } from "../../types/announcement";
import { Announcement } from "../../../db/models/announcement.model";
import { AnnouncementImage } from "../../../db/models/announcementimage.model";

/**
 * Get announcement data.
 */
export const getAnnouncement = {
  type: AnnouncementType,
  args: { id: { type: new GraphQLNonNull(GraphQLString) } },
  async resolve(parent: object, args: any) {
    const announcement = await Announcement.findOne({
      include: [AnnouncementImage],
      where: { id: args.id },
    });

    return announcement;
  },
};
