import { gql } from '@apollo/client';

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
