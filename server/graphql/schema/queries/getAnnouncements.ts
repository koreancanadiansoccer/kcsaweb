import { GraphQLList } from "graphql";

import { AnnouncementType } from "../../types/announcement";
import { Announcement } from "../../../db/models/announcement.model";
import { AnnouncementImage } from "../../../db/models/announcementimage.model";

/**
 * Get all league data.
 */
export const getAnnouncements = {
  type: new GraphQLList(AnnouncementType),
  async resolve() {
    const announcements = await Announcement.findAll({
      include: [AnnouncementImage],
      order: [["createdAt", "DESC"]],
    });

    return announcements;
  },
};
