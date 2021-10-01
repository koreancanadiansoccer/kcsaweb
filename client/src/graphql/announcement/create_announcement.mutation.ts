import { gql } from "@apollo/client";
import { Announcement } from "../../types/announcement";
import { AnnouncementImage } from "../../types/announcement_image";

export interface AnnouncementData {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
  images?: AnnouncementImage[];
}

export interface CreateAnnouncementDataInput {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
  images?: AnnouncementImage[];
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement(
    $title: String!
    $subtitle: String!
    $content: String!
    $showOnHomepage: Boolean
  ) {
    createAnnouncement(
      title: $title
      subtitle: $subtitle
      content: $content
      showOnHomepage: $showOnHomepage
    ) {
      title
      subtitle
      content
      showOnHomepage
      createdAt
      announcement_image
      createdAt
      announcementImages {
        id
        imageURL
      }
    }
  }
`;
