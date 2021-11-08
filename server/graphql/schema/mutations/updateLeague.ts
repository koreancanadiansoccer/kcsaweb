import { GraphQLList } from 'graphql';
import map from 'lodash/map';

import { LeagueType, LeagueInputType } from '../../types/league';
import { TeamInputType } from '../../types/team';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { Match } from '../../../db/models/match.model';
import { Team } from '../../../db/models/team.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';

/**
 * Create new league.
 */
export const updateLeague = {
  type: LeagueType,
  args: {
    newTeams: { type: new GraphQLList(TeamInputType) },
    league: { type: LeagueInputType },
  },
  async resolve(
    parent: object,
    args: object | any
  ): Promise<League | undefined> {
    const league = await League.findOne({
      include: [LeagueTeam],
      where: { id: args.league.id },
    });

    if (!league) {
      throw Error('League to update could not be found');
    }

    await League.update(args.league, { where: { id: args.league.id } });

    // Create new league team from providede Team.
    if (args.newTeams && args.newTeams.length > 0) {
      await Promise.all(
        map(args.newTeams, async (newTeam) => {
          await LeagueTeam.create({
            teamId: newTeam.id,
            teamAgeType: newTeam.teamAgeType,
            leagueId: args.league.id,
            captainId: args.newTeam.captainId,
          });
        })
      );
    }

    const updatedLeague = await League.findOne({
      include: [
        {
          model: LeagueTeam,
          as: 'leagueTeams',
          duplicating: false,
          include: [
            LeaguePlayer,
            {
              model: Team,
              as: 'team',
            },
          ],
        },
        {
          model: Match,
          as: 'matches',
          duplicating: false,
          include: [
            {
              as: 'homeTeam',
              model: LeagueTeam,
              duplicating: false,
              subQuery: false,
              include: [
                MatchPlayer,
                {
                  model: Team,
                  as: 'team',
                },
              ],
            },
            {
              model: LeagueTeam,
              as: 'awayTeam',
              duplicating: false,
              include: [
                MatchPlayer,
                {
                  model: Team,
                  as: 'team',
                },
              ],
            },
          ],
        },
      ],
      where: { id: args.league.id },
      subQuery: false,
    });

    if (!updatedLeague) {
      throw Error('Updated League could not be retrieved');
    }

    return updatedLeague;
  },
};
