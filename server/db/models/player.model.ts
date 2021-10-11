import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Default,
  HasMany,
} from 'sequelize-typescript';

import { Team } from './team.model';
import { LeaguePlayer } from './leagueplayer.model';

@Table({ tableName: 'player' })
export class Player extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  dob!: string;

  @Default(0)
  @Column({ field: 'goal_scored' })
  goalScored!: number;

  @Default(0)
  @Column({ field: 'yello_card' })
  yellowCard!: number;

  @Column email!: string;

  // Associations.
  @ForeignKey(() => Team) @Column({ field: 'team_id' }) teamId!: number;

  @BelongsTo(() => Team) team!: Team;

  @HasMany(() => LeaguePlayer) leaguePlayers!: LeaguePlayer[];
}
