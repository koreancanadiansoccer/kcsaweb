import { GraphQLNonNull, GraphQLString } from 'graphql';
import Sequelize from 'sequelize';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

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
import { MatchPlayer } from '../../../db/models/matchplayer.model';

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

    const leagues = await League.findAll({ where: { isActive: true } });

    if (!leagues) {
      throw Error('League could not be found');
    }

    // Grab ids of active leagues.
    const activeLeaugeIds = map(leagues, (league) => league.id);

    const leagueTeams = await LeagueTeam.findAll({
      include: [
        LeaguePlayer,
        {
          model: Team,
          as: 'team',
          required: true,
        },
      ],
      where: {
        leagueId: activeLeaugeIds,
      },
    });

    const activeLeaugeTeamIds = map(leagueTeams, (leagueTeam) => leagueTeam.id);

    const leaguePlayers = await LeaguePlayer.findAll({
      where: { leagueTeamId: activeLeaugeTeamIds },
    });

    // Get Matches
    return {
      user,
      announcements,
      galleries,
      leagues,
      leagueTeams,
      leaguePlayers,
    };
  },
};
