import { gql } from '@apollo/client';

import { Gallery } from '../../types/gallery';

export interface GalleryQueryData {
  getGalleries: Gallery[];
  getMainGalleries: Gallery[];
}

export const GET_GALLERIES = gql`
  query GetGalleries {
    getGalleries {
      id
      title
      description
      showOnHomepage
      createdAt
      galleryImages {
        id
        imageURL
      }
    }
  }
`;
