import { User } from './user';
import { Team, LeagueTeam } from './team';
import { League } from './league';

export interface DashboardViewer {
  user?: User;
  team?: Team;
  leagueTeam?: LeagueTeam;
  league?: League;
}
