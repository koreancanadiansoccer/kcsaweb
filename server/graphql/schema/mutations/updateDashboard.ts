import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import omit from 'lodash/omit';
import map from 'lodash/map';
import { Op } from 'sequelize';
// password encryption
import { hash } from 'bcryptjs';

import { User } from '../../../db/models/user.model';
import { Team } from '../../../db/models/team.model';
import { Player } from '../../../db/models/player.model';
import { League } from '../../../db/models/league.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Match } from '../../../db/models/match.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { UserInputType } from '../../types/user';
import { TeamInputType, LeagueTeamInputType } from '../../types/team';
import { PlayerInputType, LeaguePlayerInputType } from '../../types/player';
import { DashboardViewerType } from '../../types/dashboard';

enum STEPS {
  CAPTAIN = 'CAPTAIN',
  UPDATETEAM = 'UPDATETEAM',
  UPDATEPLAYER = 'UPDATEPLAYER',
  CREATEPLAYER = 'CREATEPLAYER',
  CREATELEAGUEPLAYER = 'CREATELEAGUEPLAYER',
}

export const updateDashboard = {
  type: DashboardViewerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    step: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: UserInputType },
    team: { type: TeamInputType },
    player: { type: PlayerInputType },
    leagueTeam: { type: LeagueTeamInputType },
    newLeaguePlayers: { type: new GraphQLList(LeaguePlayerInputType) },
    createPlayer: { type: PlayerInputType },
  },
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<{
    user: User | null;
    league: League | null;
    team: Team | null;
    leagueTeam: LeagueTeam | null;
  }> {
    const userId = req.session.userId;
    // Check if user is logged in.
    if (!userId || userId !== args.id) {
      throw Error('Invalid user - Please Login');
    }

    if (args.step === STEPS.CAPTAIN) {
      // console.log(args);
      const updateUser = args.user;
      if (!updateUser.password) {
        await User.update(omit(updateUser, ['password']), {
          where: { id: userId },
        });
      } else {
        const hashedPassword = await hash(updateUser.password, 8);
        await User.update(
          { ...updateUser, password: hashedPassword },
          {
            where: { id: userId },
          }
        );
      }
    }

    if (args.step === STEPS.UPDATETEAM) {
      await Team.update(args.team, {
        where: { id: args.team.id, captainId: userId },
      });
    }

    if (args.step === STEPS.UPDATEPLAYER) {
      if (args.player.id) {
        await Player.update(args.player, {
          where: { id: args.player.id },
        });
      } else {
        const team = await Team.findOne({
          where: { captainId: userId },
        });

        if (!team) {
          throw Error('Team does not exist to update player');
        }

        await Player.create({ ...args.player, teamId: team.id });
      }
    }

    if (args.step === STEPS.CREATELEAGUEPLAYER) {
      if (args.newLeaguePlayers && args.newLeaguePlayers.length > 0) {
        const matches = await Match.findAll({
          where: {
            leagueId: args.leagueTeam.leagueId,
            [Op.or]: [
              { awayTeamId: args.leagueTeam.id },
              { homeTeamId: args.leagueTeam.id },
            ],
          },
        });

        await Promise.all(
          map(args.newLeaguePlayers, async (newLeaguePlayer) => {
            let leaguePlayer: LeaguePlayer;
            // If id exists,
            // Player was originally added in 'Players' table.
            if (newLeaguePlayer.id) {
              leaguePlayer = await LeaguePlayer.create({
                leagueTeamId: args.leagueTeam.id,
                playerId: newLeaguePlayer.id,
              });
            }

            // If id doesn't exist, it's totally a new player.
            if (!newLeaguePlayer.id) {
              // First create a row in master 'Player' table
              const player = await Player.create({
                firstName: newLeaguePlayer.firstName,
                lastName: newLeaguePlayer.lastName,
                dob: newLeaguePlayer.dob,
                teamId: args.leagueTeam.teamId,
              });

              // Then create a row in league player table.
              if (player) {
                leaguePlayer = await LeaguePlayer.create({
                  leagueTeamId: args.leagueTeam.id,
                  playerId: player.id,
                });
              }
            }

            if (matches && matches.length > 0) {
              await Promise.all(
                map(matches, async (match) => {
                  await MatchPlayer.create({
                    leagueTeamId: args.leagueTeam.id,
                    leaguePlayerId: leaguePlayer.id,
                    matchId: match.id,
                    playerId: leaguePlayer.playerId,
                  });
                })
              );
            }
          })
        );
      }
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
        include: [{ model: LeaguePlayer, include: [Player] }],
        where: { leagueId: league?.id, teamId: team?.id },
      });
    }

    return { user, team, league, leagueTeam };
  },
};
