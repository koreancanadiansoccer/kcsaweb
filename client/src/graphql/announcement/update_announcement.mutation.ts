import { gql } from '@apollo/client';

import { Announcement } from '../../types/announcement';

export interface UpdateShowAnnouncementInput {
  id: string;
  showOnHomepage: boolean;
}

export interface UpdateShowAnnouncementResult {
  updateAnnouncement: Announcement[];
}

export const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement(
    $id: String!
    $showOnHomepage: Boolean!
  ) {
    updateAnnouncement(
      id: $id
      showOnHomepage: $showOnHomepage
    ) {
      id
      title
      subtitle
      content
      showOnHomepage
      imageURL
      createdAt
    }
  }
`;
