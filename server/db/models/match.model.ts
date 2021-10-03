import {
  Model,
  Table,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { LeagueTeam } from "./leagueteam.model";
import { League } from "./league.model";
@Table({ tableName: "match" })
export class Match extends Model {
  @AllowNull(false)
  @Column
  date!: string;

  @AllowNull(false)
  @Column
  location!: string;

  @ForeignKey(() => League)
  @Column({ field: "league_id" })
  leagueId!: number;

  @ForeignKey(() => LeagueTeam)
  @Column({ field: "home_team_id" })
  homeTeamId!: number;
  @BelongsTo(() => LeagueTeam, { foreignKey: "home_team_id" })
  homeTeam!: LeagueTeam;
  @Column({ field: "home_team_score" })
  homeTeamScore!: number;
  @Column({ field: "home_team_game_sheet_link" })
  homeTeamGameSheetLink!: string;

  @ForeignKey(() => LeagueTeam)
  @Column({ field: "away_team_id" })
  awayTeamId!: number;
  @BelongsTo(() => LeagueTeam, { foreignKey: "away_team_id" })
  awayTeam!: LeagueTeam;
  @Column({ field: "away_team_score" })
  awayTeamScore!: number;
  @Column({ field: "away_team_game_sheet_link" })
  awayTeamGameSheetLink!: string;
}
