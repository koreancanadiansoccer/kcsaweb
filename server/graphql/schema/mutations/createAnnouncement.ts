import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import { AnnouncementType } from '../../types/announcement';
import { Announcement } from '../../../db/models/announcement.model';

/**
 * Create new announcement.
 */
export const createAnnouncement = {
  type: new GraphQLList(AnnouncementType),
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    subtitle: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    imageURL: { type: GraphQLString },
    showOnHomepage: { type: GraphQLBoolean },
  },
  async resolve(parent: object, args: object) {
    await Announcement.create({ ...args });

    const announcements = await Announcement.findAll({
      order: [['createdAt', 'DESC']],
    });
    return announcements;
  },
};
