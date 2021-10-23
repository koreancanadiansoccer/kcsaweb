import {
  Model,
  Table,
  Column,
  HasMany,
  ForeignKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user.model';
import { Team } from './team.model';
import { League } from './league.model';
import { LeaguePlayer } from './leagueplayer.model';
import { Match } from './match.model';
import { MatchPlayer } from './matchplayer.model';

// Team data associated with league.
@Table({ tableName: 'league_team' })
export class LeagueTeam extends Model {
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

  @Default(false)
  @Column({ field: 'is_active' })
  isActive!: boolean;

  @ForeignKey(() => User) @Column({ field: 'captain_id' }) captainId!: number;

  // Association with league.
  @ForeignKey(() => League)
  @Column({ field: 'league_id' })
  leagueId!: number;

  @BelongsTo(() => League)
  league!: League;

  // Association with master team data.
  @ForeignKey(() => Team)
  @Column({ field: 'team_id' })
  teamId!: number;

  @BelongsTo(() => Team)
  team!: Team;

  // Association with league players data.
  @HasMany(() => LeaguePlayer) leaguePlayers!: LeaguePlayer[];

  // Association with league players data.
  @HasMany(() => MatchPlayer) matchPlayers!: MatchPlayer[];

  // Association with match data.
  @HasMany(() => Match) match!: Match[];
}
