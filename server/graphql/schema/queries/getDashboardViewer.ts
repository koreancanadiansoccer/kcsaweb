import { DashboardViewerType } from '../../types/dashboard';
import { League } from '../../../db/models/league.model';
import { Team } from '../../../db/models/team.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { User } from '../../../db/models/user.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';

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
        include: [LeaguePlayer],
        where: { leagueId: league?.id, teamId: team?.id },
      });
    }

    return { user, team, leagueTeam, league };
  },
};
