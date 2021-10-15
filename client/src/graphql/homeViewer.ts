import { gql } from '@apollo/client';

export const GET_HOME_VIEWER = gql`
  query {
    getHomeViewer {
      user {
        name
        isAdmin
      }
      announcements {
        id
        title
        subtitle
        showOnHomepage
        imageURL
      }
    }
  }
`;
