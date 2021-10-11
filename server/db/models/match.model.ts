import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

import { LeagueTeam } from './leagueteam.model';
import { League } from './league.model';

@Table({ tableName: 'match' })
export class Match extends Model {
  @AllowNull(false)
  @Column
  date!: string;

  @AllowNull(false)
  @Column({ field: 'match_day' })
  matchDay!: number;

  @AllowNull(false)
  @Column
  location!: string;

  @AllowNull(false)
  @ForeignKey(() => League)
  @Column({ field: 'league_id' })
  leagueId!: number;
  @BelongsTo(() => League) league!: League;

  @AllowNull(false)
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'home_team_id' })
  homeTeamId!: number;

  @BelongsTo(() => LeagueTeam, { foreignKey: 'home_team_id' })
  homeTeam!: LeagueTeam;

  @Column({ field: 'home_team_score' })
  homeTeamScore!: number;

  @Column({ field: 'home_team_game_sheet_link' })
  homeTeamGameSheetLink!: string;

  @Default(false)
  @Column({ field: 'home_team_physical' })
  homeTeamPhysical!: boolean;

  @Default(false)
  @Column({ field: 'home_team_no_gamesheet' })
  homeTeamNoGameSheet!: boolean;

  @Default(false)
  @Column({ field: 'home_team_no_show' })
  homeTeamNoShow!: boolean;

  @AllowNull(false)
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'away_team_id' })
  awayTeamId!: number;
  @BelongsTo(() => LeagueTeam, { foreignKey: 'away_team_id' })
  awayTeam!: LeagueTeam;
  @Column({ field: 'away_team_score' })
  awayTeamScore!: number;
  @Column({ field: 'away_team_game_sheet_link' })
  awayTeamGameSheetLink!: string;

  @Default(false)
  @Column({ field: 'away_team_physical' })
  awayTeamPhysical!: boolean;

  @Default(false)
  @Column({ field: 'away_team_no_gamesheet' })
  awayTeamNoGameSheet!: boolean;

  @Default(false)
  @Column({ field: 'away_team_no_show' })
  awayTeamNoShow!: boolean;
}
