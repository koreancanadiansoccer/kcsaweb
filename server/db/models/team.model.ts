import {
  Model,
  Table,
  Column,
  HasMany,
  ForeignKey,
  DataType,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";
import keys from "lodash/keys";

import { Player } from "./player.model";
import { User } from "./user.model";
import { League } from "./league.model";

@Table({ tableName: "team" })
export class Team extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column({ field: "emblem_img_link" }) emblemImgLink!: string;

  @Column season!: string;

  @Column played!: number;

  @Column win!: number;

  @Column loss!: number;

  @Column({ field: "goal_scored" }) goalScored!: number;

  @Column({ field: "goal_conceded" }) goalConceded!: number;

  @Column({
    field: "team_age_type",
  })
  teamAgeType!: string;

  @Column({ field: "is_active" }) isActive!: boolean;

  @ForeignKey(() => User) @Column({ field: "captain_id" }) captainId!: number;
  @HasMany(() => Player) players!: Player[];

  @ForeignKey(() => League)
  @Column({ field: "league_id" })
  leagueId!: number;

  @BelongsTo(() => League)
  league!: League;
}
