import { gql } from "@apollo/client";

export const GET_ANNOUNCEMENT = gql`
  query GetAnnouncement($id: String!) {
    getLeague(id: $id) {
      id
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
