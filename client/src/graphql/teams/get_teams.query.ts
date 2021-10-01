import { gql } from "@apollo/client";
import { TEAM_FRAGMENT } from "./team.fragment";

export const GET_TEAMS = gql`
  query GetTeams($leagueAgeType: String) {
    getTeams(leagueAgeType: $leagueAgeType) {
      ${TEAM_FRAGMENT}
    }
  }
`;
