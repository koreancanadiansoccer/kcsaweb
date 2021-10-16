import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  FragmentsOnCompositeTypesRule,
} from 'graphql';
import map from 'lodash/map';
import Sequelize from 'sequelize';

import { LeaguePlayerInputType, LeaguePlayerType } from '../../types/player';
import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { Team } from '../../../db/models/team.model';
import { Match, MatchStatus } from '../../../db/models/match.model';
import { MatchType, MatchTypeInputType } from '../../types/match';

/**
 * Update league player data.
 * @param updatePlayer - new input of match player value to update to.
 * @param originalMatchPlayer - original match player value.
 */
const upsertLeaguePlayers = async (
  updatePlayer: MatchPlayer,
  originalMatchPlayer: MatchPlayer
) => {
  // 1. Grab league player using leaguePlayerId.
  const leaguePlayer = await LeaguePlayer.findOne({
    where: { id: originalMatchPlayer.leaguePlayerId },
  });

  if (!leaguePlayer) throw Error('League home player not found');

  // 2. Set params to update.
  const leaguePlayerParams: { [key: string]: string | number } = {};
  // 3.Subtract current leaguePlayer goals by original match player values, then add the new match player data.
  leaguePlayerParams.goalScored =
    leaguePlayer.goalScored -
    originalMatchPlayer.goalScored +
    updatePlayer.goalScored;

  // 4.Subtract current leaguePlayer YCs by original match player values, then add the new match player data.
  leaguePlayerParams.yellowCard =
    leaguePlayer.yellowCard -
    originalMatchPlayer.yellowCard +
    updatePlayer.yellowCard;

  await LeaguePlayer.update(leaguePlayerParams, {
    where: { id: leaguePlayer.id },
  });
};

/**
 * Update master player.
 * @param updatePlayer - new input of match player value to update to.
 * @param originalMatchPlayer - original match player value.
 */
const upsertPlayers = async (
  updatePlayer: MatchPlayer,
  originalMatchPlayer: MatchPlayer
) => {
  const player = await Player.findOne({
    where: { id: originalMatchPlayer.playerId },
  });

  if (!player) throw Error('Player not found');

  const playerParams: { [key: string]: string | number } = {};
  // Subtract current leaguePlayer goals by original match player values, then add the new match player data.
  playerParams.goalScored =
    player.goalScored -
    originalMatchPlayer.goalScored +
    updatePlayer.goalScored;

  // Subtract current leaguePlayer YCs by original match player values, then add the new match player data.
  playerParams.yellowCard =
    player.yellowCard -
    originalMatchPlayer.yellowCard +
    updatePlayer.yellowCard;

  await Player.update(playerParams, {
    where: { id: player.id },
  });
};

const upsertLeagueTeam = async (
  leagueTeamId: number,
  teamScore: number,
  opponentScore: number,
  status: MatchStatus,
  matchId: number,
  isHomeTeam: boolean
) => {
  const win = teamScore > opponentScore ? 1 : 0;
  const loss = teamScore < opponentScore ? 1 : 0;
  const tie = teamScore === opponentScore ? 1 : 0;

  if (status === MatchStatus.COMPLETE) {
    const leagueTeam = await LeagueTeam.findOne({
      where: { id: leagueTeamId },
    });

    if (!leagueTeam) throw Error('League home team not found');

    // Check original match value.
    const match = await Match.findOne({
      where: { id: matchId },
    });

    if (!match) throw Error('Orig Match could not found');

    const origGoal = isHomeTeam ? match?.homeTeamScore : match?.awayTeamScore;
    const origGoalConced = isHomeTeam
      ? match?.awayTeamScore
      : match?.homeTeamScore;

    const orignWon = origGoal > origGoalConced ? 1 : 0;
    const origLoss = origGoal < origGoalConced ? 1 : 0;
    const origTie = origGoal === origGoalConced ? 1 : 0;

    const leagueTeamParms: { [key: string]: string | number } = {};

    leagueTeamParms.goalScored = leagueTeam.goalScored - origGoal + teamScore;
    leagueTeamParms.goalConceded =
      leagueTeam.goalConceded - origGoalConced + opponentScore;
    leagueTeamParms.win = leagueTeam.win - orignWon + win;
    leagueTeamParms.loss = leagueTeam.loss - origLoss + loss;
    leagueTeamParms.tie = leagueTeam.tie - origTie + tie;

    // If origHomeTeam status was 'Waiting', set league teams value.
    await LeagueTeam.update(leagueTeamParms, {
      where: { id: leagueTeamId },
    });
  } else {
    const leagueTeamParms: { [key: string]: string | number } = {};
    // If origHomeTeam status was 'Waiting', set league teams value.
    leagueTeamParms.goalScored = (Sequelize.literal(
      `goal_scored + ${teamScore}`
    ) as unknown) as number;

    leagueTeamParms.goalConceded = (Sequelize.literal(
      `goal_conceded + ${opponentScore}`
    ) as unknown) as number;

    leagueTeamParms.win = (Sequelize.literal(
      `win + ${win}`
    ) as unknown) as number;

    leagueTeamParms.loss = (Sequelize.literal(
      `loss + ${loss}`
    ) as unknown) as number;

    leagueTeamParms.tie = (Sequelize.literal(
      `tie + ${tie}`
    ) as unknown) as number;

    leagueTeamParms.played = (Sequelize.literal(
      `played + ${1}`
    ) as unknown) as number;
    await LeagueTeam.update(leagueTeamParms, {
      where: { id: leagueTeamId },
    });
  }
};

const upsertTeam = async (
  teamId: number,
  teamScore: number,
  opponentScore: number,
  status: MatchStatus,
  matchId: number,
  isHomeTeam: boolean
) => {
  const win = teamScore > opponentScore ? 1 : 0;
  const loss = teamScore < opponentScore ? 1 : 0;
  const tie = teamScore === opponentScore ? 1 : 0;

  if (status === MatchStatus.COMPLETE) {
    const team = await Team.findOne({
      where: { id: teamId },
    });

    if (!team) throw Error('League home team not found');

    // Check original match value.
    const match = await Match.findOne({
      where: { id: matchId },
    });

    if (!match) throw Error('Orig Match could not found');

    const origGoal = isHomeTeam ? match?.homeTeamScore : match?.awayTeamScore;
    const origGoalConced = isHomeTeam
      ? match?.awayTeamScore
      : match?.homeTeamScore;

    const orignWon = origGoal > origGoalConced ? 1 : 0;
    const origLoss = origGoal < origGoalConced ? 1 : 0;
    const origTie = origGoal === origGoalConced ? 1 : 0;

    const teamParms: { [key: string]: string | number } = {};

    teamParms.goalScored = team.goalScored - origGoal + teamScore;
    teamParms.goalConceded = team.goalConceded - origGoalConced + opponentScore;
    teamParms.win = team.win - orignWon + win;
    teamParms.loss = team.loss - origLoss + loss;
    teamParms.tie = team.tie - origTie + tie;

    // If origHomeTeam status was 'Waiting', set league teams value.
    await Team.update(teamParms, {
      where: { id: teamId },
    });
  } else {
    const teamParms: { [key: string]: string | number } = {};
    // If origHomeTeam status was 'Waiting', set league teams value.
    teamParms.goalScored = (Sequelize.literal(
      `goal_scored + ${teamScore}`
    ) as unknown) as number;

    teamParms.goalConceded = (Sequelize.literal(
      `goal_conceded + ${opponentScore}`
    ) as unknown) as number;

    teamParms.win = (Sequelize.literal(`win + ${win}`) as unknown) as number;

    teamParms.loss = (Sequelize.literal(`loss + ${loss}`) as unknown) as number;

    teamParms.tie = (Sequelize.literal(`tie + ${tie}`) as unknown) as number;

    teamParms.played = (Sequelize.literal(
      `played + ${1}`
    ) as unknown) as number;
    await Team.update(teamParms, {
      where: { id: teamId },
    });
  }
};

export const updateMatch = {
  type: MatchType,
  args: { updateMatch: { type: MatchTypeInputType } },
  async resolve(parent: object, args: any): Promise<Match> {
    // Update player record.
    const homePlayers = args.updateMatch.homeTeam.matchPlayers;
    const awayPlayers = args.updateMatch.awayTeam.matchPlayers;

    await Promise.all(
      map([...homePlayers, ...awayPlayers], async (updatePlayer) => {
        if (updatePlayer.id) {
          const originalMatchPlayer = await MatchPlayer.findOne({
            where: { id: updatePlayer.id },
          });

          if (!originalMatchPlayer)
            throw Error('Original home player not found');

          // Update league player data.
          await upsertLeaguePlayers(updatePlayer, originalMatchPlayer);

          // Update master Players data.
          await upsertPlayers(updatePlayer, originalMatchPlayer);

          await MatchPlayer.update(updatePlayer, {
            where: { id: updatePlayer.id },
          });
        }
      })
    );

    // Status
    const status = args.updateMatch.status;

    // League Team update.
    // Update for home team.
    await upsertLeagueTeam(
      args.updateMatch.homeTeam.id,
      args.updateMatch.homeTeamScore,
      args.updateMatch.awayTeamScore,
      status,
      args.updateMatch.id,
      true
    );

    // Update for away team.
    await upsertLeagueTeam(
      args.updateMatch.awayTeam.id,
      args.updateMatch.awayTeamScore,
      args.updateMatch.homeTeamScore,
      status,
      args.updateMatch.id,
      false
    );

    // Master team update.
    await upsertTeam(
      args.updateMatch.homeTeam.teamId,
      args.updateMatch.homeTeamScore,
      args.updateMatch.awayTeamScore,
      status,
      args.updateMatch.id,
      true
    );

    await upsertTeam(
      args.updateMatch.awayTeam.teamId,
      args.updateMatch.awayTeamScore,
      args.updateMatch.homeTeamScore,
      status,
      args.updateMatch.id,
      false
    );

    // Overall Match data.
    const params: { [key: string]: string | number } = {};
    params.homeTeamScore = args.updateMatch.homeTeamScore;
    params.homeTeamNoGameSheet = args.updateMatch.homeTeamNoGameSheet;
    params.homeTeamPhysical = args.updateMatch.homeTeamPhysical;
    params.homeTeamNoShow = args.updateMatch.homeTeamNoShow;

    params.awayTeamScore = args.updateMatch.awayTeamScore;
    params.awayTeamPhysical = args.updateMatch.awayTeamPhysical;
    params.awayTeamNoGameSheet = args.updateMatch.awayTeamNoGameSheet;
    params.awayTeamNoShow = args.updateMatch.awayTeamNoShow;

    // Admin submiission should set status to complete.
    params.status = MatchStatus.COMPLETE;

    await Match.update(params, {
      where: { id: args.updateMatch.id },
    });

    const updatedMatch = await Match.findOne({
      include: [
        {
          model: LeagueTeam,
          as: 'homeTeam',
          include: [
            {
              model: MatchPlayer,
              where: {
                matchId: args.updateMatch.id,
                leagueTeamId: args.updateMatch.homeTeam.id,
              },
            },
          ],
        },
        {
          model: LeagueTeam,
          as: 'awayTeam',
          include: [
            {
              model: MatchPlayer,
              where: {
                matchId: args.updateMatch.id,
                leagueTeamId: args.updateMatch.awayTeam.id,
              },
            },
          ],
        },
      ],
      where: { id: args.updateMatch.id },
    });

    if (!updatedMatch) {
      throw Error('Updated Match could not be retrieved');
    }

    return updatedMatch;
  },
};
