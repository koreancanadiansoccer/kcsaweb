import { GraphQLInt, GraphQLObjectType } from 'graphql';
import map from 'lodash/map';
import Sequelize from 'sequelize';

import { MatchPlayer } from '../../../db/models/matchplayer.model';
import { LeaguePlayer } from '../../../db/models/leagueplayer.model';
import { Player } from '../../../db/models/player.model';
import { LeagueTeam } from '../../../db/models/leagueteam.model';
import { Team } from '../../../db/models/team.model';
import { Match, MatchStatus } from '../../../db/models/match.model';
import { MatchHomeSubmission } from '../../../db/models/matchhomesubmission.model';
import { MatchHomeSubmissionPlayers } from '../../../db/models/matchhomesubmissionplayers.model';
import { MatchAwaySubmission } from '../../../db/models/matchawaysubmission.model';
import { MatchAwaySubmissionPlayers } from '../../../db/models/matchawaysubmissionplayers.model';

const upsertPlayers = async (deletePlayers: MatchPlayer[]) => {
  await Promise.all(
    map(deletePlayers, async (player) => {
      const leaguePlayerParams: { [key: string]: string | number } = {};
      leaguePlayerParams.goalScored = Sequelize.literal(
        `goal_scored - ${player.goalScored}`
      ) as unknown as number;

      leaguePlayerParams.yellowCard = Sequelize.literal(
        `yellow_card - ${player.yellowCard}`
      ) as unknown as number;

      // Update league player data.
      await LeaguePlayer.update(leaguePlayerParams, {
        where: { id: player.leaguePlayerId },
      });

      // Update master player data.
      await Player.update(leaguePlayerParams, {
        where: { id: player.playerId },
      });
    })
  );
};

const delteMatchSubmissionData = async (
  matchId: number,
  homeTeamId: number,
  awayTeamId: number,
  homeMatchSubmission?: MatchHomeSubmission | null,
  awayMatchSubmission?: MatchAwaySubmission | null
) => {
  if (homeMatchSubmission) {
    const homeMatchSubmissionPlayers = await MatchHomeSubmissionPlayers.findAll(
      {
        where: {
          matchId: matchId,
          homeTeamId: homeTeamId,
          matchHomeSubmissionId: homeMatchSubmission.id,
        },
      }
    );

    await Promise.all(
      map(homeMatchSubmissionPlayers, async (homeSubmissionPlayer) => {
        await homeSubmissionPlayer.destroy();
      })
    );

    await homeMatchSubmission.destroy();
  }

  if (awayMatchSubmission) {
    const awayMatchSubmissionPlayers = await MatchAwaySubmissionPlayers.findAll(
      {
        where: {
          matchId: matchId,
          awayTeamId: awayTeamId,
          matchAwaySubmissionId: awayMatchSubmission.id,
        },
      }
    );

    await Promise.all(
      map(awayMatchSubmissionPlayers, async (awaySubmissionPlayer) => {
        await awaySubmissionPlayer.destroy();
      })
    );
    await awayMatchSubmission.destroy();
  }
};

const deleteMatchPlayers = async (deletePlayers: MatchPlayer[]) => {
  await Promise.all(
    map(deletePlayers, async (player) => {
      await player.destroy();
    })
  );
};

const upsertTeam = async (
  leagueTeamId: number,
  teamScore: number,
  opponentScore: number
) => {
  // Note we only update leagueTeam stats if match status is Complete.
  const win = teamScore > opponentScore ? 1 : 0;
  const loss = teamScore < opponentScore ? 1 : 0;
  const tie = teamScore === opponentScore ? 1 : 0;

  const leagueTeam = await LeagueTeam.findOne({
    where: { id: leagueTeamId },
  });

  if (!leagueTeam) throw Error('League team not found');

  const leagueTeamParms: { [key: string]: string | number } = {};

  leagueTeamParms.goalScored = Sequelize.literal(
    `goal_scored - ${teamScore}`
  ) as unknown as number;

  leagueTeamParms.goalConceded = Sequelize.literal(
    `goal_conceded - ${opponentScore}`
  ) as unknown as number;

  leagueTeamParms.win = Sequelize.literal(`win - ${win}`) as unknown as number;

  leagueTeamParms.loss = Sequelize.literal(
    `loss - ${loss}`
  ) as unknown as number;

  leagueTeamParms.tie = Sequelize.literal(`tie - ${tie}`) as unknown as number;

  leagueTeamParms.played = Sequelize.literal(
    `played - ${1}`
  ) as unknown as number;

  // Update league team stats.
  await LeagueTeam.update(leagueTeamParms, {
    where: { id: leagueTeamId },
  });

  // Update for master-team table.
  await Team.update(leagueTeamParms, {
    where: { id: leagueTeam.teamId },
  });
};

export const deleteMatch = {
  type: new GraphQLObjectType({
    name: 'DeletedMatchId',
    fields: () => ({
      deletedMatchId: { type: GraphQLInt },
    }),
  }),
  args: { id: { type: GraphQLInt } },
  async resolve(
    parent: object,
    args: any
  ): Promise<{ deletedMatchId: number }> {
    const match = await Match.findOne({ where: { id: args.id } });
    if (!match) throw Error('Match to delete could not be retrieved');

    // Grab League team IDs.
    const homeTeamId = match?.homeTeamId;
    const awayTeamId = match?.awayTeamId;

    const homeMatchPlayers = await MatchPlayer.findAll({
      where: { matchId: args.id, leagueTeamId: homeTeamId },
    });

    const awayMatchPlayers = await MatchPlayer.findAll({
      where: { matchId: args.id, leagueTeamId: awayTeamId },
    });

    // Update stats for leagueTeam and Team.
    // Status
    const status = match.status;

    // We only update leaeguePlayer, master-player, leagueTeam, master-team stats if match status is complete.
    if (status === MatchStatus.COMPLETE) {
      // Update league and master-player stats.
      await upsertPlayers([...homeMatchPlayers, ...awayMatchPlayers]);

      // Update league team and master team stats for hometeam.
      await upsertTeam(homeTeamId, match.homeTeamScore, match.awayTeamScore);

      // Update league team and master team stats for awayteam.
      await upsertTeam(awayTeamId, match.awayTeamScore, match.homeTeamScore);
    }

    const homeMatchSubmission = await MatchHomeSubmission.findOne({
      where: { homeTeamId: homeTeamId, matchId: args.id },
    });

    const awayMatchSubmission = await MatchAwaySubmission.findOne({
      where: { awayTeamId: awayTeamId, matchId: args.id },
    });

    await delteMatchSubmissionData(
      args.id,
      homeTeamId,
      awayTeamId,
      homeMatchSubmission,
      awayMatchSubmission
    );

    // Delete all match players.
    await deleteMatchPlayers([...homeMatchPlayers, ...awayMatchPlayers]);
    // Delete match.
    await match.destroy();
    return { deletedMatchId: args.id };
  },
};
