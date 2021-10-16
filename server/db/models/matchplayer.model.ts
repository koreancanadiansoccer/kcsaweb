import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Default,
} from 'sequelize-typescript';

import { LeagueTeam } from './leagueteam.model';
import { Player } from './player.model';
import { LeaguePlayer } from './leagueplayer.model';
import { Match } from './match.model';

// Player data for each match.
@Table({ tableName: 'match_player' })
export class MatchPlayer extends Model {
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

  // Associations with match.
  @ForeignKey(() => Match)
  @Column({ field: 'match_id' })
  matchId!: number;
  @BelongsTo(() => Match) match!: Match;

  // Associations with player.
  @ForeignKey(() => Player)
  @Column({ field: 'player_id' })
  playerId!: number;
  @BelongsTo(() => Player) player!: Player;

  // Associations with player.
  @ForeignKey(() => LeaguePlayer)
  @Column({ field: 'league_player_id' })
  leaguePlayerId!: number;
  @BelongsTo(() => LeaguePlayer) palyer!: LeaguePlayer;
}
