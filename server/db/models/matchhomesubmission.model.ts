import {
  Model,
  Table,
  Column,
  AllowNull,
  BelongsTo,
  ForeignKey,
  Default,
} from 'sequelize-typescript';

import { League } from './league.model';
import { Match } from './match.model';
import { LeagueTeam } from './leagueteam.model';

@Table({ tableName: 'match_home_submission' })
export class MatchHomeSubmission extends Model {
  @AllowNull(false)
  @ForeignKey(() => League)
  @Column({ field: 'league_id' })
  leagueId!: number;
  @BelongsTo(() => League) league!: League;

  @AllowNull(false)
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'home_team_id' })
  homeTeamId!: number;

  @Column({ field: 'home_team_game_sheet_link' })
  homeTeamGameSheetLink!: string;

  @Default(0)
  @Column({ field: 'away_team_score' })
  homeTeamScore!: number;

  @Default(0)
  @Column({ field: 'home_team_score' })
  awayTeamScore!: number;

  @AllowNull(false)
  @ForeignKey(() => Match)
  @Column({ field: 'match_id' })
  matchId!: number;
  @BelongsTo(() => Match) Match!: Match;
}
