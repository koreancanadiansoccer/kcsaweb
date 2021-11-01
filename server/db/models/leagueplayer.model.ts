import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Default,
  HasMany,
} from 'sequelize-typescript';

import { LeagueTeam } from './leagueteam.model';
import { MatchPlayer } from './matchplayer.model';
import { Player } from './player.model';

@Table({ tableName: 'league_player' })
export class LeaguePlayer extends Model {
  @Default(0)
  @Column({ field: 'goal_scored' })
  goalScored!: number;

  @Default(0)
  @Column({ field: 'yellow_card' })
  yellowCard!: number;

  @Column email!: string;

  @Default(false)
  @Column({ field: 'signed_waiver' })
  signedWaiver!: boolean;

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
