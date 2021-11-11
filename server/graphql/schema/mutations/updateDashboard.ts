import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
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
import { Match, MatchStatus } from '../../../db/models/match.model';
import {
  MatchHomeSubmission,
  MatchSubmissionStatus,
} from '../../../db/models/matchhomesubmission.model';
import { MatchHomeSubmissionPlayers } from '../../../db/models/matchhomesubmissionplayers.model';
import { MatchAwaySubmission } from '../../../db/models/matchawaysubmission.model';
import { MatchAwaySubmissionPlayers } from '../../../db/models/matchawaysubmissionplayers.model';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { UserInputType } from '../../types/user';
import { TeamInputType, LeagueTeamInputType } from '../../types/team';
import {
  PlayerInputType,
  LeaguePlayerInputType,
  MatchAwaySubmissionPlayerInputType,
  MatchHomeSubmissionPlayerInputType,
} from '../../types/player';
import { MatchTypeInputType } from '../../types/match';
import { DashboardViewerType } from '../../types/dashboard';

enum STEPS {
  CAPTAIN = 'CAPTAIN',
  UPDATETEAM = 'UPDATETEAM',
  UPDATEPLAYER = 'UPDATEPLAYER',
  CREATEPLAYER = 'CREATEPLAYER',
  CREATELEAGUEPLAYER = 'CREATELEAGUEPLAYER',
  SUBMITMATCHDATA = 'SUBMITMATCHDATA',
}

const upsertPlayers = async (
  matchSubmissionPlayers: any[],
  matchId: number,
  leagueTeamId: number
) => {
  await Promise.all(
    map(matchSubmissionPlayers, async (submittedPlayer) => {
      const matchPlayer = await MatchPlayer.findOne({
        where: {
          playerId: submittedPlayer.player.id,
          matchId: matchId,
          leagueTeamId: leagueTeamId,
        },
      });

      await matchPlayer?.update({
        goalScored: submittedPlayer.goalScored,
        yellowCard: submittedPlayer.yellowCard,
        redCard: submittedPlayer.redCard,
      });

      const leaguePlayer = await LeaguePlayer.findOne({
        where: { id: submittedPlayer.leaguePlayerId },
      });

      await leaguePlayer?.update({
        goalScored: leaguePlayer.goalScored + submittedPlayer.goalScored,
        yellowCard: leaguePlayer.yellowCard + submittedPlayer.yellowCard,
        redCard: leaguePlayer.redCard + submittedPlayer.redCard,
      });

      const player = await Player.findOne({
        where: { id: submittedPlayer.player.id },
      });

      await player?.update({
        goalScored: player.goalScored + submittedPlayer.goalScored,
        yellowCard: player.yellowCard + submittedPlayer.yellowCard,
        redCard: player.redCard + submittedPlayer.redCard,
      });
    })
  );
};

const upsertTeams = async (
  leagueTeamId: number,
  teamScore: number,
  opponentScore: number,
  teamId: number
) => {
  const leagueTeam = await LeagueTeam.findOne({
    where: { id: leagueTeamId },
  });

  const won = teamScore > opponentScore ? 1 : 0;
  const loss = teamScore < opponentScore ? 1 : 0;
  const tie = teamScore === opponentScore ? 1 : 0;

  leagueTeam?.update({
    played: leagueTeam.played + 1,
    win: leagueTeam.win + won,
    loss: leagueTeam.loss + loss,
    tie: leagueTeam.tie + tie,
    goalScored: leagueTeam.goalScored + teamScore,
    goalConceded: leagueTeam.goalConceded + opponentScore,
  });

  const team = await Team.findOne({
    where: { id: teamId },
  });

  team?.update({
    played: team.played + 1,
    win: team.win + won,
    loss: team.loss + loss,
    tie: team.tie + tie,
    goalScored: team.goalScored + teamScore,
    goalConceded: team.goalConceded + opponentScore,
  });
};

const MatchSubmissionInputType = new GraphQLInputObjectType({
  name: 'MatchSubmissionInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    leagueId: { type: GraphQLInt },
    homeTeamId: { type: GraphQLInt },
    homeTeamScore: { type: GraphQLInt },
    homeTeamGameSheetLink: { type: GraphQLString },
    awayTeamId: { type: GraphQLInt },
    awayTeamScore: { type: GraphQLInt },
    awayTeamGameSheetLink: { type: GraphQLString },
    gameSheetLink: { type: GraphQLString },
    matchId: { type: GraphQLInt },
    score: { type: GraphQLInt },
    matchSubmissionPlayers: {
      type: new GraphQLList(
        MatchHomeSubmissionPlayerInputType || MatchAwaySubmissionPlayerInputType
      ),
    },
  }),
});

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
    // Update match form
    match: { type: MatchTypeInputType },
    isHomeTeam: { type: GraphQLBoolean },
    matchSubmissionData: { type: MatchSubmissionInputType },
  },
  async resolve(
    parent: object,
    args: any,
    { req }: any
  ): Promise<{
    user: User | null;
    league: League | null;
    team: Team | null;
    matches: Match[] | null;
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

    if (args.step === STEPS.SUBMITMATCHDATA) {
      const { isHomeTeam, matchSubmissionData, match } = args;

      if (isHomeTeam) {
        // Update match homw submission.
        await MatchHomeSubmission.update(
          {
            homeTeamScore: matchSubmissionData.score,
            homeTeamGameSheetLink: matchSubmissionData.gameSheetLink,
            awayTeamScore: matchSubmissionData.awayTeamScore,
            status: MatchSubmissionStatus.SUBMITTED,
          },
          {
            where: {
              leagueId: match.leagueId,
              homeTeamId: matchSubmissionData.homeTeamId,
              matchId: match.id,
            },
          }
        );

        // Update match home submission players.
        await Promise.all(
          map(
            matchSubmissionData.matchSubmissionPlayers,
            async (homeSubmissionPlayer) => {
              await MatchHomeSubmissionPlayers.update(
                {
                  yellowCard: homeSubmissionPlayer.yellowCard,
                  redCard: homeSubmissionPlayer.redCard,
                  goalScored: homeSubmissionPlayer.goalScored,
                },
                { where: { id: homeSubmissionPlayer.id } }
              );
            }
          )
        );

        // Check away team submission.
        const awayTeamSubmission = await MatchAwaySubmission.findOne({
          where: {
            leagueId: match.leagueId,
            matchId: match.id,
            awayTeamId: match.awayTeam.id,
          },
        });

        if (
          awayTeamSubmission &&
          awayTeamSubmission.status === MatchSubmissionStatus.SUBMITTED &&
          match.status !== 'COMPLETE'
        ) {
          // Check if scores match.
          const doScoreMatch =
            matchSubmissionData.awayTeamScore ===
              awayTeamSubmission.awayTeamScore &&
            matchSubmissionData.homeTeamScore ===
              awayTeamSubmission.homeTeamScore;

          // Scores match, update all match data.
          if (doScoreMatch) {
            const homeSubmissionPlayers =
              matchSubmissionData.matchSubmissionPlayers;

            const awaySubmissionPlayers =
              await MatchAwaySubmissionPlayers.findAll({
                include: [Player],
                where: {
                  matchAwaySubmissionId: awayTeamSubmission.id,
                },
              });

            await upsertPlayers(
              homeSubmissionPlayers,
              match.id,
              match.homeTeam.id
            );

            await upsertPlayers(
              awaySubmissionPlayers,
              match.id,
              match.awayTeam.id
            );

            // Home team.
            await upsertTeams(
              match.homeTeam.id,
              matchSubmissionData.score,
              matchSubmissionData.awayTeamScore,
              match.homeTeam.teamId
            );

            // Away team
            await upsertTeams(
              match.awayTeam.id,
              matchSubmissionData.awayTeamScore,
              matchSubmissionData.score,
              match.awayTeam.teamId
            );

            Match.update(
              {
                homeTeamScore: matchSubmissionData.score,
                homeTeamGameSheetLink:
                  matchSubmissionData.homeTeamGameSheetLink,
                awayTeamScore: awayTeamSubmission.awayTeamScore,
                awayTeamGameSheeLink: awayTeamSubmission.awayTeamGameSheetLink,
                status: MatchStatus.COMPLETE,
              },
              { where: { id: match.id } }
            );
          } else {
            Match.update(
              {
                homeTeamGameSheetLink:
                  matchSubmissionData.homeTeamGameSheetLink,
                awayTeamGameSheeLink: awayTeamSubmission.awayTeamGameSheetLink,
                status: MatchStatus.MISMATCH,
              },
              { where: { id: match.id } }
            );
          }
        }
      } else if (!isHomeTeam) {
        /**
         *
         * Away Team submission and updates
         *
         */
        const { matchSubmissionData, match } = args;

        await MatchAwaySubmission.update(
          {
            awayTeamScore: matchSubmissionData.score,
            awayTeamGameSheetLink: matchSubmissionData.awayTeamGameSheetLink,
            homeTeamScore: matchSubmissionData.homeTeamScore,
            status: MatchSubmissionStatus.SUBMITTED,
          },
          {
            where: {
              leagueId: match.leagueId,
              homeTeamId: matchSubmissionData.homeTeamId,
              matchId: match.id,
            },
          }
        );

        // Update match away submission players.
        await Promise.all(
          map(
            matchSubmissionData.matchSubmissionPlayers,
            async (awaySubmissionPlayer) => {
              await MatchAwaySubmissionPlayers.update(
                {
                  yellowCard: awaySubmissionPlayer.yellowCard,
                  redCard: awaySubmissionPlayer.redCard,
                  goalScored: awaySubmissionPlayer.goalScored,
                },
                { where: { id: awaySubmissionPlayer.id } }
              );
            }
          )
        );

        // Check away team submission.
        const homeTeamSubmission = await MatchHomeSubmission.findOne({
          where: {
            leagueId: match.leagueId,
            matchId: match.id,
            homeTeamId: match.homeTeam.id,
          },
        });

        if (
          homeTeamSubmission &&
          homeTeamSubmission.status === MatchSubmissionStatus.SUBMITTED &&
          match.status !== 'COMPLETE'
        ) {
          const doScoreMatch =
            matchSubmissionData.awayTeamScore ===
              homeTeamSubmission.awayTeamScore &&
            matchSubmissionData.homeTeamScore ===
              homeTeamSubmission.homeTeamScore;

          if (doScoreMatch) {
            const awaySubmissionPlayers =
              matchSubmissionData.matchSubmissionPlayers;

            const homeSubmissionPlayers =
              await MatchHomeSubmissionPlayers.findAll({
                include: [Player],
                where: {
                  matchHomeSubmissionId: homeTeamSubmission.id,
                },
              });

            // Update away players
            await upsertPlayers(
              awaySubmissionPlayers,
              match.id,
              match.awayTeam.id
            );

            // Update home players
            await upsertPlayers(
              homeSubmissionPlayers,
              match.id,
              match.homeTeam.id
            );

            // Away team.
            await upsertTeams(
              match.awayTeam.id,
              matchSubmissionData.score,
              matchSubmissionData.homeTeamScore,
              match.awayTeam.teamId
            );

            // Home team
            await upsertTeams(
              match.homeTeam.id,
              matchSubmissionData.homeTeamScore,
              matchSubmissionData.score,
              match.homeTeam.teamId
            );

            Match.update(
              {
                awayTeamScore: matchSubmissionData.awayTeamScore,
                awayTeamGameSheetLink:
                  matchSubmissionData.homeTeamGameSheetLink,
                homeTeamScore: homeTeamSubmission.homeTeamScore,
                homeTeamGameSheetLink: homeTeamSubmission.homeTeamGameSheetLink,
                status: MatchStatus.COMPLETE,
              },
              { where: { id: match.id } }
            );
          } else {
            Match.update(
              {
                homeTeamGameSheetLink: homeTeamSubmission.homeTeamGameSheetLink,
                awayTeamGameSheeLink: matchSubmissionData.awayTeamGameSheetLink,
                status: MatchStatus.MISMATCH,
              },
              { where: { id: match.id } }
            );
          }
        }
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
    return { user, team, league, leagueTeam, matches };
  },
};
