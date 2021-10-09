import { gql } from "@apollo/client";
import { Announcement } from "../../types/announcement";

export interface AnnouncementQueryData {
  getAnnouncement: Announcement;
}

export interface AnnouncementQueryVariable {
  id: string;
}

export const GET_ANNOUNCEMENT = gql`
  query GetAnnouncement($id: String!) {
    getAnnouncement(id: $id) {
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
