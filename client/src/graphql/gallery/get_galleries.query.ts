import { gql } from '@apollo/client';

import { GalleryImage } from '../../types/gallery';

export interface GalleryQueryData {
  title: string;
  subTitle: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}


export const GET_GALLERIES = gql`
  query GetGalleries {
    getGalleries {
      title
      subTitle
      showOnHomepage
      createdAt
      }
    }
`;
