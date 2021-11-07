import { User } from './user';
import { Team, LeagueTeam } from './team';

export interface DashboardViewer {
  user?: User;
  team?: Team;
  leagueTeam?: LeagueTeam;
}
