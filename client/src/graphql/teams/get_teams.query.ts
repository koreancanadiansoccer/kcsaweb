import { gql } from "@apollo/client";
import { TEAM_FRAGMENT } from "./team.fragment";
import { Team } from "../../types/team";
export interface TeamQueryData {
  getTeams: Team[];
}

export interface TeamQueryVariable {
  leagueAgeType: string;
}

export const GET_TEAMS = gql`
  query GetTeams($leagueAgeType: String) {
    getTeams(leagueAgeType: $leagueAgeType) {
      ${TEAM_FRAGMENT}
    }
  }
`;
