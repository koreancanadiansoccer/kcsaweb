import {
  Model,
  Table,
  Column,
  AllowNull,
  HasMany,
  Default,
} from 'sequelize-typescript';

/**
 * This is not used on backend atm.
 * We need flexibility on league type column since admin can newly add it.
 */
enum LeagueType {
  OPEN = 'OPEN',
  SENIOR = 'SENIOR',
}

import { LeagueTeam } from './leagueteam.model';

@Table({ tableName: 'league' })
export class League extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Default(false)
  @Column({ field: 'is_active' })
  isActive!: boolean;

  @Column({
    field: 'league_age_type',
  })
  leagueAgeType!: string;

  @Column({ field: 'league_type' })
  leagueType!: string;

  @Column({ field: 'year' })
  year!: string;

  @Column({ field: 'max_yellow_card' })
  maxYellowCard!: number;

  @HasMany(() => LeagueTeam) leagueTeams!: LeagueTeam[];
}
