import { gql } from "@apollo/client";
import { AnnouncementImage } from "../../types/announcement_image";
import { Announcement } from "../../types/announcement";

export interface AnnouncementsQueryData {
  getAnnouncements: Announcement[];
  getHeroAnnouncements: Announcement[];
}

export const GET_ANNOUNCEMENTS = gql`
  query {
    getAnnouncements {
      id
      title
      subtitle
      content
      showOnHomepage
      createdAt
    }
  }
`;

export const GET_HERO_ANNOUNCEMENTS = gql`
  query {
    getHeroAnnouncements {
      id
      title
      subtitle
      content
      showOnHomepage
      createdAt
    }
  }
`;
