import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
  query {
    getTeams {
      id
      name
      played
      isActive
      goalScored
      teamAgeType
      createdAt
    }
  }
`;
