import {
  Model,
  Table,
  Column,
  HasMany,
  ForeignKey,
  Default,
  AllowNull,
} from 'sequelize-typescript';

import { Player } from './player.model';
import { User } from './user.model';
import { LeagueTeam } from './leagueteam.model';

// Master team table.
@Table({ tableName: 'team' })
export class Team extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @Column({ field: 'team_logo_url' }) teamLogoURL!: string;

  @Default(0)
  @Column
  played!: number;

  @Default(0)
  @Column
  win!: number;

  @Default(0)
  @Column
  loss!: number;

  @Default(0)
  @Column
  tie!: number;

  @Default(0)
  @Column({ field: 'goal_scored' })
  goalScored!: number;

  @Default(0)
  @Column({ field: 'goal_conceded' })
  goalConceded!: number;

  @Column({
    field: 'team_age_type',
  })
  teamAgeType!: string;

  @Column({
    field: 'team_color',
  })
  teamColor!: string;

  // TODO: Do we need this?
  @Default(false)
  @Column({ field: 'is_active' })
  isActive!: boolean;

  @ForeignKey(() => User) @Column({ field: 'captain_id' }) captainId!: number;

  // Association with all players
  @HasMany(() => Player) players!: Player[];

  // Association with league teams data.
  @HasMany(() => LeagueTeam) leagueTeams!: LeagueTeam[];
}
