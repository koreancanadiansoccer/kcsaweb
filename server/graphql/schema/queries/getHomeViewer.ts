import { HomeViewerType } from '../../types/homeViewer';
import { League } from '../../../db/models/league.model';
import { Team } from '../../../db/models/team.model';
import { User } from '../../../db/models/user.model';
import { Announcement } from '../../../db/models/announcement.model';
import { Gallery } from '../../../db/models/gallery.model';
import { GalleryImage } from '../../../db/models/galleryimage.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { Match } from '../../../db/models/match.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';

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
        include: [{ model: Team, include: [Player] }],
        where: { id: userId },
      });
    }

    const announcements = await Announcement.findAll({
      order: [['createdAt', 'DESC']],
    });

    const galleries = await Gallery.findAll({
      include: [GalleryImage],
      where: { showOnHomepage: true },
      order: [['createdAt', 'DESC']],
    });

    // Get league data with all associations.
    const leagues = await League.findAll({
      include: [
        {
          model: LeagueTeam,
          include: [
            { model: LeaguePlayer, duplicating: false, include: [Player] },
            {
              model: Team,
              as: 'team',
              required: true,
              include: [
                {
                  as: 'captain',
                  model: User,
                  duplicating: false,
                  subQuery: false,
                },
              ],
            },
          ],
        },
        {
          model: Match,
          include: [
            {
              model: LeagueTeam,
              as: 'homeTeam',
              include: [
                {
                  model: Team,
                  as: 'team',
                  required: true,
                  include: [
                    {
                      as: 'captain',
                      model: User,
                      duplicating: false,
                      subQuery: false,
                    },
                  ],
                },
              ],
            },
            {
              model: LeagueTeam,
              as: 'awayTeam',
              include: [
                {
                  model: Team,
                  as: 'team',
                  required: true,
                  include: [
                    {
                      as: 'captain',
                      model: User,
                      duplicating: false,
                      subQuery: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      where: { isActive: true },
    });

    // Get Matches
    return {
      user,
      announcements,
      galleries,
      leagues,
    };
  },
};
