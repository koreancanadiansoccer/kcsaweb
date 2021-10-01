import { gql } from '@apollo/client';

export const GET_GALLERY = gql`
  query GetGallery($id: String!) {
    getGallery(id: $id) {
      id
      title
      subTitle
      showOnHomepage
      createdAt
    }
  }
`;