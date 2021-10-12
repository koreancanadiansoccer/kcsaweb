import { gql } from '@apollo/client';

import { GalleryImage } from '../../types/gallery';

export interface GalleryData {
  title: string;
  description: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}

export interface AddGalleryDataInput {
  title: string;
  description: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}

/**
 * Mutation for creating a new Gallery.
 */
export const CREATE_GALLERY = gql`
  mutation CreateGallery(
    $title: String!
    $description: String!
    $showOnHomepage: Boolean
  ) {
    createGallery(
      title: $title
      description: $description
      showOnHomepage: $showOnHomepage
    ) {
      title
      description
      showOnHomepage
      createdAt
    }
  }
`;
