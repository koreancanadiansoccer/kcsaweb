import { gql } from '@apollo/client';
import { GalleryImage } from '../../types/gallery_image';

export interface GalleryData {
  title: string;
  content: string;
  showOnHomepage?: boolean;
  galleryImageId?: GalleryImage[];
}

export interface AddGalleryDataInput {
  title: string;
  content: string;
  showOnHomepage?: boolean;
  announcementImageId?: GalleryImage[];
}

/**
 * Mutation for creating a new user account.
 */
export const ADD_GALLERY = gql`
  mutation AddGallery($title: String!, $content: String!, $showOnHomepage: Boolean) {
    addGallery(title: $title, content: $content, showOnHomepage: $showOnHomepage) {
      title
      content
    }
  }
`;
