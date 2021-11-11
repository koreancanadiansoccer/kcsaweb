import {
  Model,
  Table,
  Column,
  AllowNull,
  BelongsTo,
  ForeignKey,
  Default,
  HasMany,
} from 'sequelize-typescript';

import { League } from './league.model';
import { Match } from './match.model';
import { LeagueTeam } from './leagueteam.model';
import { MatchAwaySubmissionPlayers } from './matchawaysubmissionplayers.model';

export enum MatchSubmissionStatus {
  PENDING = 'PENDING', // Pending match to be played.
  SUBMITTED = 'SUBMITTED', // No mismatch happened or Admin submitted.
}

@Table({ tableName: 'match_away_submission' })
export class MatchAwaySubmission extends Model {
  @AllowNull(false)
  @ForeignKey(() => League)
  @Column({ field: 'league_id' })
  leagueId!: number;
  @BelongsTo(() => League) league!: League;

  @AllowNull(false)
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'away_team_id' })
  awayTeamId!: number;

  @Column({ field: 'away_team_game_sheet_link' })
  awayTeamGameSheetLink!: string;

  @Default(0)
  @Column({ field: 'away_team_score' })
  awayTeamScore!: number;

  @Default(0)
  @Column({ field: 'home_team_score' })
  homeTeamScore!: number;

  @Column
  status!: string;

  @AllowNull(false)
  @ForeignKey(() => Match)
  @Column({ field: 'match_id' })
  matchId!: number;
  @BelongsTo(() => Match) Match!: Match;

  @HasMany(() => MatchAwaySubmissionPlayers)
  matchAwaySubmissionPlayers!: MatchAwaySubmissionPlayers[];
}
