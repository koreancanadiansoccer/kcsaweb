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

  @AllowNull(false)
  @ForeignKey(() => Match)
  @Column({ field: 'match_id' })
  matchId!: number;
  @BelongsTo(() => Match) Match!: Match;
}
