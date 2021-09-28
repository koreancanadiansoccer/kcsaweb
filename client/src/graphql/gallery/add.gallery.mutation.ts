import { gql } from '@apollo/client';
import { GalleryImage } from '../../types/gallery_image';

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
 * Mutation for creating a new user account.
 */
export const ADD_GALLERY = gql`
  mutation AddGallery (
    $title: String!,
    $description: String!,
    $showOnHomepage: Boolean
) {
    addGallery (
      title: $title,
      description: $description,
      showOnHomepage: $showOnHomepage
    ) {
      title
      description
    }
  }
`;
