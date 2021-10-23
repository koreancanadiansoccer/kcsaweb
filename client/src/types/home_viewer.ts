import { User } from './user';
import { Announcement } from './announcement';
import { Gallery } from './gallery';
import { Team, LeagueTeam } from './team';
import { LeaguePlayer } from './player';

export interface LeagueTeamHomeViewer extends LeagueTeam {
  team: Team;
}

export interface LeaeguePlayerHomeViewer extends LeaguePlayer {
  teamName: string;
  teamLogoURL: string;
  teamAgeType: string;
}

export interface HomeViewer {
  user?: User;
  announcements?: Announcement[];
  galleries?: Gallery[];
  leagueAgeKeys?: string[];
  leagueTeamGroupAge?: { [key: string]: LeagueTeamHomeViewer[] };
  leagueTeams?: LeagueTeamHomeViewer[];
  leaguePlayersGroupAge?: { [key: string]: LeaeguePlayerHomeViewer[] };
}
