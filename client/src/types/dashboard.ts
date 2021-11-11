import { User } from './user';
import { Team, LeagueTeam } from './team';
import { League } from './league';
import { Match } from './match';

export interface DashboardViewer {
  user?: User;
  team?: Team;
  leagueTeam?: LeagueTeam;
  league?: League;
  matches?: Match[];
}
