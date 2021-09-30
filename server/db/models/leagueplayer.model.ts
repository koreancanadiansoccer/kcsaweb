import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";

import { LeagueTeam } from "./leagueteam.model";
import { Player } from "./player.model";

@Table({ tableName: "league_player" })
export class LeaguePlayer extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column scored!: number;
  @Column({ field: "yello_card" }) yellowCard!: number;
  @Column email!: string;

  // Associations with league team.
  @ForeignKey(() => LeagueTeam)
  @Column({ field: "league_team_id" })
  leagueTeamId!: number;
  @BelongsTo(() => LeagueTeam) leagueTeam!: LeagueTeam;

  // Associations with player.
  @ForeignKey(() => Player)
  @Column({ field: "player_id" })
  playerId!: number;
  @BelongsTo(() => Player) palyer!: Player;
}
