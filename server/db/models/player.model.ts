import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  AllowNull,
  HasMany,
} from "sequelize-typescript";

import { Team } from "./team.model";
import { LeaguePlayer } from "./leagueplayer.model";

@Table({ tableName: "player" })
export class Player extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column scored!: number;
  @Column({ field: "yello_card" }) yellowCard!: number;
  @Column email!: string;

  // Associations.
  @ForeignKey(() => Team) @Column({ field: "team_id" }) teamId!: number;

  @BelongsTo(() => Team) team!: Team;

  @HasMany(() => LeaguePlayer) leaguePlayers!: LeaguePlayer[];
}
