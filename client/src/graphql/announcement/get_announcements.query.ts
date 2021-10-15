import { gql } from '@apollo/client';

import { Announcement } from '../../types/announcement';

export interface AnnouncementsQueryData {
  getAnnouncements: Announcement[];
}

export const GET_ANNOUNCEMENTS = gql`
  query {
    getAnnouncements {
      id
      title
      subtitle
      content
      imageURL
      showOnHomepage
      createdAt
    }
  }
`;
