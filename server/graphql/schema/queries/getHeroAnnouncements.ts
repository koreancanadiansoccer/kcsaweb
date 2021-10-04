import { GraphQLNonNull, GraphQLString } from "graphql";

import { AnnouncementType } from "../../types/announcement";
import { Announcement } from "../../../db/models/announcement.model";
import { AnnouncementImage } from "../../../db/models/announcementimage.model";
import { GraphQLBoolean } from "graphql";
import { GraphQLList } from "graphql";

/**
 * Get hero announcement data.
 */
export const getHeroAnnouncements = {
  type: new GraphQLList(AnnouncementType),
  async resolve(parent: object, args: any) {
    const heroAnnouncements = await Announcement.findAll({
      include: [AnnouncementImage],
      where: { showOnHomepage: true },
      order: [["createdAt", "DESC"]],
    });

    return heroAnnouncements;
  },
};
