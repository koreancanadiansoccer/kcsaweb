import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Default,
} from 'sequelize-typescript';

import { LeagueTeam } from './leagueteam.model';
import { Player } from './player.model';
import { LeaguePlayer } from './leagueplayer.model';
import { Match } from './match.model';

// Player data for each match.
@Table({ tableName: 'match_player' })
export class MatchPlayer extends Model {
  @Default(0)
  @Column({ field: 'goal_scored' })
  goalScored!: number;

  @Default(0)
  @Column({ field: 'yellow_card' })
  yellowCard!: number;

  @Default(0)
  @Column({ field: 'red_Card' })
  redCard!: number;

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
  @BelongsTo(() => LeaguePlayer) leaguePlayer!: LeaguePlayer;
}
