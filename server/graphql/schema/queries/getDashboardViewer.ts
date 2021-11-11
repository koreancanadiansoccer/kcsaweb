import { Op } from 'sequelize';

import { DashboardViewerType } from '../../types/dashboard';
import { League } from '../../../db/models/league.model';
import { Team } from '../../../db/models/team.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { User } from '../../../db/models/user.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';
import { Match } from '../../../db/models/match.model';
import { MatchHomeSubmission } from '../../../db/models/matchhomesubmission.model';
import { MatchHomeSubmissionPlayers } from '../../../db/models/matchhomesubmissionplayers.model';
import { MatchAwaySubmission } from '../../../db/models/matchawaysubmission.model';
import { MatchAwaySubmissionPlayers } from '../../../db/models/matchawaysubmissionplayers.model';

export const getDashboardViewer = {
  type: DashboardViewerType,
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<{
    user: User | null;
    team: Team | null;
    league: League | null;
    leagueTeam: LeagueTeam | null;
    matches: Match[] | null;
  }> {
    const userId = req.session.userId;
    if (!userId) {
      throw Error('No ID found');
    }

    const user = await User.findOne({
      where: { id: userId },
    });

    const team = await Team.findOne({
      include: [Player],
      where: { captainId: userId },
    });

    const league = await League.findOne({
      where: { isActive: true, leagueAgeType: team?.teamAgeType },
    });

    let leagueTeam = null;
    if (league && league.id) {
      leagueTeam = await LeagueTeam.findOne({
        include: [{ model: LeaguePlayer, include: [Player] }],
        where: { leagueId: league?.id, teamId: team?.id },
      });
    }

    let matches = null;

    if (leagueTeam && league) {
      matches = await Match.findAll({
        include: [
          {
            model: LeagueTeam,
            as: 'homeTeam',
            include: [Team],
          },
          {
            model: LeagueTeam,
            as: 'awayTeam',
            include: [Team],
          },
          {
            model: MatchHomeSubmission,
            include: [
              {
                model: MatchHomeSubmissionPlayers,
                include: [Player],
                separate: true,
              },
            ],
          },
          {
            model: MatchAwaySubmission,
            include: [
              {
                model: MatchAwaySubmissionPlayers,
                include: [Player],
                separate: true,
              },
            ],
          },
        ],
        where: {
          leagueId: league.id,
          [Op.or]: [
            { awayTeamId: leagueTeam.id },
            { homeTeamId: leagueTeam.id },
          ],
        },
      });
    }

    return { user, team, leagueTeam, league, matches };
  },
};
