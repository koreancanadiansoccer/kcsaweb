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

import { LeagueTeam } from './leagueteam.model';
import { MatchPlayer } from './matchplayer.model';
import { Player } from './player.model';

@Table({ tableName: 'league_player' })
export class LeaguePlayer extends Model {
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

  // Associations with league team.
  @ForeignKey(() => LeagueTeam)
  @Column({ field: 'league_team_id' })
  leagueTeamId!: number;
  @BelongsTo(() => LeagueTeam) leagueTeam!: LeagueTeam;

  // Associations with player.
  @ForeignKey(() => Player)
  @Column({ field: 'player_id' })
  playerId!: number;
  @BelongsTo(() => Player) player!: Player;

  @HasMany(() => MatchPlayer) matchPlayers!: MatchPlayer[];
}
