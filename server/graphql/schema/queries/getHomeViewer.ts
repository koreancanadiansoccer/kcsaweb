import { GraphQLNonNull, GraphQLString } from 'graphql';

import { HomeViewerType } from '../../types/homeViewer';
import { League } from '../../../db/models/league.model';
import { Team } from '../../../db/models/team.model';
import { User } from '../../../db/models/user.model';
import { Announcement } from '../../../db/models/announcement.model';

/**
 * Get Home page data.
 */
export const getHomeViewer = {
  type: HomeViewerType,
  async resolve(parent: object, args: any, { req }: any) {
    let userId;
    let user;

    // If userId in session exists, grab user data.
    if (req.session.userId) {
      userId = req.session.userId;
      user = await User.findOne({
        where: { id: userId },
      });
    }

    const announcements = await Announcement.findAll({
      where: { showOnHomepage: true },
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    return { user, announcements };
  },
};
