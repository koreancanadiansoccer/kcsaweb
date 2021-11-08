import { GraphQLInt, GraphQLNonNull } from 'graphql';

import { DashboardViewerType } from '../../types/dashboard';
import { MatchTypeInputType } from '../../types/match';
import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { League } from '../../../db/models/league.model';

export const submitMatchResult = {
  type: DashboardViewerType,
  args: {
    matchSubmission: { type: MatchTypeInputType },
    leagueTeamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<{
    user: User | null;
    team: Team | null;
    leagueTeam: LeagueTeam | null;
  }> {
    const userId = req.session.userId;

    const isHomeTeam =
      args.matchSubmission.homeTeam.id === args.leagueTeamId ? true : false;

    if (isHomeTeam) {
      //   // Find
      //   const homeMatchSubmission = await MatchHomeSubmission.findOne({
      //     where: { matchId: matchSubmission.id, leagueTeamId: leagueTeamId },
      //   });
      //   if(homeMatchSubmission) {
      //   } else {
      //       // Create score values.
      //     // await MatchHomeSubmission.findOne({
      //     //     where: { matchId: matchSubmission.id, leagueTeamId: leagueTeamId },
      //     //   });
      //   }
    }

    // Retrieve back data.
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

    return { user, team, leagueTeam };
  },
};
