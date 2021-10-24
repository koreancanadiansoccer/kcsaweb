import map from 'lodash/map';
import flatten from 'lodash/flatten';
import forEach from 'lodash/forEach';

import { User } from './user';
import { Announcement } from './announcement';
import { Gallery } from './gallery';
import { League } from './league';
import { LeagueTeam } from './team';
import { LeaguePlayer } from './player';
import { Match } from './match';

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
  leagueTeamGroupAge?: { [key: string]: LeagueTeam[] };
  leagueTeams?: LeagueTeam[];
  leaguePlayersGroupAge?: { [key: string]: LeaeguePlayerHomeViewer[] };
  matchesByAge?: { [key: string]: Match[] };
}

/**
 * Generate league data grouped by Age.
 */
export const generateLeagueDataByAge = (
  leagues: League[]
): Pick<
  HomeViewer,
  | 'leagueAgeKeys'
  | 'leagueTeamGroupAge'
  | 'leaguePlayersGroupAge'
  | 'matchesByAge'
  | 'leagueTeams'
> => {
  const leagueAgeKeys = map(leagues, (league) => league.leagueAgeType);

  /**
   * Get leagueTeams by age
   */
  const leagueTeamGroupAge: { [key: string]: LeagueTeam[] } = {};
  forEach(leagues, (league) => {
    leagueTeamGroupAge[league.leagueAgeType] = { ...league.leagueTeams };
  });
  /** leagueTeams by age done. */

  const leagueTeams = flatten(map(leagues, (league) => league.leagueTeams));

  /**
   *  Get leaguePlayers by age
   */
  const leaguePlayersGroupAge: {
    [key: string]: LeaeguePlayerHomeViewer[];
  } = {};

  forEach(leagues, (league) => {
    const playerForLeagueTeam = flatten(
      map(league.leagueTeams, (leagueTeam) =>
        map(leagueTeam.leaguePlayers, (leaguePlayer) => ({
          ...leaguePlayer,
          teamName: leagueTeam.team.name,
          teamLogoURL: leagueTeam.team.teamLogoURL || '',
          teamAgeType: leagueTeam.team.teamAgeType,
        }))
      )
    );

    leaguePlayersGroupAge[league.leagueAgeType] = playerForLeagueTeam;
  });
  /** leaguePlayers by age done. */

  /**
   *  Get matches by age
   */
  const matchesByAge: {
    [key: string]: Match[];
  } = {};

  forEach(leagues, (league) => {
    matchesByAge[league.leagueAgeType] = [...league.matches];
  });

  return {
    leagueAgeKeys,
    leagueTeamGroupAge,
    leaguePlayersGroupAge,
    matchesByAge,
    leagueTeams,
  };
};
