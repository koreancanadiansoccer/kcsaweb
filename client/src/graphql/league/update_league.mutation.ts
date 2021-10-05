import { gql } from '@apollo/client';

import { League } from '../../types/league';
import { Team } from '../../types/team';

import { LEAGUE_FRAGMENT } from './league.fragment';
export interface UpdateLeagueInput {
  newTeams?: Team[];
  league?: League;
}

export interface UpdateLeagueResult {
  updateLeague: League;
}

export const UPDATE_LEAGUE = gql`
  mutation UpdateLeague($league: LeagueInput, $newTeams: [TeamInput]) {
    updateLeague(newTeams: $newTeams, league: $league) {
      ${LEAGUE_FRAGMENT}
    }
  }
`;
