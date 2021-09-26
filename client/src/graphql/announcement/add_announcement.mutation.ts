import { gql } from "@apollo/client";
import { Announcement } from "../../types/announcement";
import { AnnouncementImage } from "../../types/announcement_image";

export interface AnnouncementData {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
}

export interface AddAnnouncementDataInput {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
}

/**
 * Mutation for creating a new user account.
 */
export const ADD_ANNOUNCEMENT = gql`
  mutation AddAnnouncement(
    $title: String!
    $subtitle: String!
    $content: String!
    $showOnHomepage: Boolean
  ) {
    addAnnouncement(
      title: $title
      subtitle: $subtitle
      content: $content
      showOnHomepage: $showOnHomepage
    ) {
      title
      subtitle
      content
    }
  }
`;
