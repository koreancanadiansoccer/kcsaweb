import { gql } from "@apollo/client";

import { AnnouncementImage } from "../../types/announcement_image";

export interface AnnouncementQueryData {
  data: {
    getAnnouncements: {
      title: string;
      subtitle: string;
      content: string;
      showOnHomepage: boolean;
      announcement_images?: AnnouncementImage[];
    };
  };
}

export const GET_ANNOUNCEMENTS = gql`
  query {
    getAnnouncements {
      title
      subtitle
      content
      showOnHomepage
      createdAt
      announcementImages {
        id
        imageURL
      }
    }
  }
`;
