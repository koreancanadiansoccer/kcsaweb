import {
  Model,
  Table,
  Column,
  AllowNull,
  HasMany,
  DataType,
  Default,
} from "sequelize-typescript";
import keys from "lodash/keys";

enum LeagueType {
  OPEN = "OPEN",
  SENIOR = "SENIOR",
}

import { Team } from "./team.model";
@Table({ tableName: "league" })
export class League extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Default(false)
  @Column({ field: "is_active" })
  isActive!: boolean;

  @Column({
    field: "league_type",
    type: DataType.ENUM({ values: keys(LeagueType) }),
  })
  leagueType!: LeagueType;

  @HasMany(() => Team) teams!: Team[];
}
