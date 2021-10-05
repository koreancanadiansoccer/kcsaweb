import { gql } from '@apollo/client';

import { GalleryImage } from '../../types/gallery';

export interface GalleryData {
  title: string;
  subTitle: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}

export interface AddGalleryDataInput {
  title: string;
  subTitle: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}

/**
 * Mutation for creating a new user account.
 */
export const CREATE_GALLERY = gql`
  mutation CreateGallery (
    $title: String!,
    $subTitle: String!,
    $showOnHomepage: Boolean
) {
    createGallery (
      title: $title,
      subTitle: $subTitle,
      showOnHomepage: $showOnHomepage
    ) {
      title
      subTitle
      showOnHomepage
      createdAt
    }
  }
`;
