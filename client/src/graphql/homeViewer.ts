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
      galleries {
        id
        title
        description
        showOnHomepage
        createdAt
        galleryImages {
          id
          imageURL
        }
      }
    }
  }
`;
