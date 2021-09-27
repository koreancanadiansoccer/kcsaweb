import { gql } from "@apollo/client";

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
      teams {
        id
        name
        played
        goalScored
      }
    }
  }
`;
