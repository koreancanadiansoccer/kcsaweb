import { gql } from '@apollo/client';

import { LEAGUE_FRAGMENT } from './league/league.fragment';

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
      leagues {
        ${LEAGUE_FRAGMENT}
      }
    }
  }
`;
