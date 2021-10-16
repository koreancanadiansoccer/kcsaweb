import { GraphQLNonNull, GraphQLString } from 'graphql';

import { HomeViewerType } from '../../types/homeViewer';
import { League } from '../../../db/models/league.model';
import { Team } from '../../../db/models/team.model';
import { User } from '../../../db/models/user.model';
import { Announcement } from '../../../db/models/announcement.model';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';


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

    const galleries = await Gallery.findAll({
      include: [GalleryImage],
      where: { showOnHomepage: true },
      order: [['createdAt', 'DESC']],
    });

    return { user, announcements, galleries };
  },
};
