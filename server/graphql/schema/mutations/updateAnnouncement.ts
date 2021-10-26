import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import { AnnouncementType } from '../../types/announcement';
import { Announcement } from '../../../db/models/announcement.model';

/**
 * Update announcement data.
 */
export const updateAnnouncement = {
  type: new GraphQLList(AnnouncementType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    showOnHomepage: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent: object, args: object | any) {
    const announcement = await Announcement.findOne({
      where: { id: args.id },
    });

    if (!announcement) {
      throw Error('Announcement to update could not be found');
    }

    const updateAnnouncement = await Announcement.update({ ...args }, {
      where: { id: args.id },
    });

    if (!updateAnnouncement) {
      throw Error('Announcement to update could not be found');
    }

    const announcements = await Announcement.findAll({
      order: [['createdAt', 'DESC']],
    });
    return announcements;
  },
};
