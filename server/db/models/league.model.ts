import {
  Model,
  Table,
  Column,
  AllowNull,
  HasMany,
  Default,
} from "sequelize-typescript";

/**
 * This is not used on backend atm.
 * We need flexibility on league type column since admin can newly add it.
 */
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
    field: "league_age_type",
  })
  leagueAgeType!: string;

  @Column({ field: "league_type" })
  leagueType!: string;

  @Column({ field: "max_yellow_card" })
  maxYellowCard!: number;

  @HasMany(() => Team) teams!: Team[];
}
