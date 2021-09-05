import { Model, Table, Column, AllowNull } from "sequelize-typescript";

@Table({ tableName: "match" })
export class Match extends Model {
  @AllowNull(false)
  @Column
  date!: string;

  @AllowNull(false)
  @Column
  location!: string;

  @Column({ field: "home_team" }) homeTeam!: string;
  @Column({ field: "home_team_score" }) homeTeamScore!: number;
  @Column({ field: "home_team_game_sheet_link" })
  homeTeamGameSheetLink!: string;

  @Column({ field: "away_team" }) awayTeam!: string;
  @Column({ field: "away_team_score" }) awayTeamScore!: number;
  @Column({ field: "away_team_game_sheet_link" })
  awayTeamGameSheetLink!: string;
}
