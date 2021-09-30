import { gql } from "@apollo/client";
import { TEAM_FRAGMENT } from "../teams/team.fragment";

//TODO check if we need separate fragment for league teams.
export const GET_LEAGUE = gql`
  query GetLeague($id: String!) {
    getLeague(id: $id) {
      id
      name
      isActive
      leagueAgeType
      leagueType
      maxYellowCard
      createdAt
      leagueTeams {
        ${TEAM_FRAGMENT}
      }
    }
  }
`;
