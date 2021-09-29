import { gql } from "@apollo/client";

export const GET_HOME_VIEWER = gql`
  query {
    getHomeViewer {
      user {
        name
        isAdmin
      }
      announcement {
        title
        subtitle
      }
    }
  }
`;
