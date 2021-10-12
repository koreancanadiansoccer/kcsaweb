import { gql } from '@apollo/client';

export interface AnnouncementData {
  title: string;
  subtitle: string;
  content: string;
  imageURL?: string;
  showOnHomepage?: boolean;
}

export interface CreateAnnouncementDataInput {
  title: string;
  subtitle: string;
  content: string;
  imageURL?: string;
  showOnHomepage?: boolean;
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement(
    $title: String!
    $subtitle: String!
    $content: String!
    $imageURL: String!
    $showOnHomepage: Boolean
  ) {
    createAnnouncement(
      title: $title
      subtitle: $subtitle
      content: $content
      imageURL: $imageURL
      showOnHomepage: $showOnHomepage
    ) {
      title
      subtitle
      content
      imageURL
      showOnHomepage
      createdAt
    }
  }
`;
