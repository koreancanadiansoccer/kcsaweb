import { GraphQLList } from "graphql";

import { AnnouncementType } from "../../types/announcement";
import { Announcement } from "../../../db/models/announcement.model";

/**
 * Get all league data.
 */
export const getAnnouncements = {
  type: new GraphQLList(AnnouncementType),
  async resolve() {
    const announcements = await Announcement.findAll({
      order: [["createdAt", "DESC"]],
    });

    return announcements;
  },
};
