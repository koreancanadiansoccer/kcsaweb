import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Default,
} from 'sequelize-typescript';

import { LeagueTeam } from './leagueteam.model';
import { Player } from './player.model';
import { LeaguePlayer } from './leagueplayer.model';
import { Match } from './match.model';
import { MatchAwaySubmission } from './matchawaysubmission.model';

// Player data for each match.
@Table({ tableName: 'match_away_submission_players' })
export class MatchAwaySubmissionPlayers extends Model {
  @Default(0)
  @Column({ field: 'goal_scored' })
  goalScored!: number;

  @Default(0)
  @Column({ field: 'yellow_card' })
  yellowCard!: number;

  @Default(0)
  @Column({ field: 'red_card' })
  redCard!: number;

  @Column email!: string;

  // Associations with league team.
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'league_team_id' })
  awayTeamId!: number;
  @BelongsTo(() => LeagueTeam) awayTeam!: LeagueTeam;

  // Associations with match.
  @ForeignKey(() => Match)
  @Column({ field: 'match_id' })
  matchId!: number;
  @BelongsTo(() => Match) match!: Match;

  // Associations with match.
  @ForeignKey(() => MatchAwaySubmission)
  @Column({ field: 'match_away_submission_id' })
  matchAwaySubmissionId!: number;
  @BelongsTo(() => MatchAwaySubmission)
  matchAwaySubmission!: MatchAwaySubmission;

  // Associations with player.
  @ForeignKey(() => Player)
  @Column({ field: 'player_id' })
  playerId!: number;
  @BelongsTo(() => Player) player!: Player;

  // Associations with player.
  @ForeignKey(() => LeaguePlayer)
  @Column({ field: 'league_player_id' })
  leaguePlayerId!: number;
  @BelongsTo(() => LeaguePlayer) leaguePlayer!: LeaguePlayer;
}
