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

export interface LeagueActiveHomeViewer {
  id: number;
  name: string;
  ageType: string;
  year: string;
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
  leagueActive?: { [key: string]: LeagueActiveHomeViewer };
  matches?: Match[];
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
  | 'leagueActive'
  | 'matches'
> => {
  const leagueAgeKeys = map(leagues, (league) => league.leagueAgeType);

  const leagueActive: { [key: string]: LeagueActiveHomeViewer } = {};
  forEach(leagues, (league) => {
    leagueActive[league.leagueAgeType] = {
      id: league.id,
      name: league.name,
      ageType: league.leagueAgeType,
      year: league.year,
    };
  });

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

  const matches = flatten(map(leagues, (league) => league.matches));
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
    leagueActive,
    matches,
  };
};
