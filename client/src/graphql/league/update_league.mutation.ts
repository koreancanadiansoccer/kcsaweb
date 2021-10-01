import { gql } from "@apollo/client";
import { League } from "../../types/league";
import { Team } from "../../types/team";

export interface UpdateLeagueInput {
  newTeams?: Team[];
  league?: League;
}

export interface UpdateLeagueResult {
  updateLeague: League;
}

export const UPDATE_LEAGUE = gql`
  mutation UpdateLeague($newTeams: [LeagueTeamInput], $league: LeagueInput) {
    updateLeague(newTeams: $newTeams, league: $league) {
      name
      isActive
      leagueAgeType
      leagueType
      maxYellowCard
      createdAt
    }
  }
`;
