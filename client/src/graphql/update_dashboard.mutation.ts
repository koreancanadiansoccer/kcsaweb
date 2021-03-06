import { gql } from '@apollo/client';

import { DashboardViewer } from '../types/dashboard';
import { Team, LeagueTeam } from '../types/team';
import { UserInput } from '../types/user';
import { PlayerInput, LeaguePlayerInput } from '../types/player';
import { Match } from '../types/match';

import { USER_FRAGMENT } from './users/user.fragment';
import { LEAGUE_TEAM_FRAGMENT, TEAM_FRAGMENT } from './teams/team.fragment';
import { MATCH_FRAGMENT } from './match/match.fragment';

export enum STEPS {
  CAPTAIN = 'CAPTAIN',
  UPDATETEAM = 'UPDATETEAM',
  UPDATEPLAYER = 'UPDATEPLAYER',
  CREATEPLAYER = 'CREATEPLAYER',
  CREATELEAGUEPLAYER = 'CREATELEAGUEPLAYER',
  SUBMITMATCHDATA = 'SUBMITMATCHDATA',
}

export interface UpdateDashboardInput {
  id: number;
  user?: UserInput;
  team?: Team;
  step?: STEPS;
  leagueTeam?: LeagueTeam;
  player?: PlayerInput;
  newLeaguePlayers?: LeaguePlayerInput[];

  match?: Match;
  isHomeTeam?: boolean;
  matchSubmissionData?: any;
}

export interface UpdateDashboardResult {
  updateDashboard: DashboardViewer;
}

export const UPDATE_DASHBOARD = gql`
  mutation UpdateDashboard($id: Int!, $user: UserInput, $team: TeamInput, $player: PlayerInput, $newLeaguePlayers: [LeaguePlayerInput], $leagueTeam: LeagueTeamInput $step: String!, 
    $isHomeTeam: Boolean, $match: MatchInput, $matchSubmissionData: MatchSubmissionInputType){
    updateDashboard(id: $id, user: $user, team: $team, player:$player, newLeaguePlayers:$newLeaguePlayers,  leagueTeam:$leagueTeam, step: $step, 
      isHomeTeam: $isHomeTeam, match: $match, matchSubmissionData: $matchSubmissionData){
      user {
        ${USER_FRAGMENT}
      }
      team{
        ${TEAM_FRAGMENT}
      }
      leagueTeam {
        ${LEAGUE_TEAM_FRAGMENT}
      }
      matches{
        ${MATCH_FRAGMENT}
      }
    }
  }
`;
