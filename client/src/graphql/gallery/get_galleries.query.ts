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
      subTitle
      showOnHomepage
      createdAt
      }
    }
`;

export const GET_MAIN_GALLERIES = gql`
  query GetMainGalleries {
    getMainGalleries {
      id
      title
      subTitle
      showOnHomepage
      createdAt
      galleryImages {
        imageURL
      }
    }
  }
`;