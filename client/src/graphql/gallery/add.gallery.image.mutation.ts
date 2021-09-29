import { gql } from '@apollo/client';
import { Gallery } from '../../types/gallery';


export interface GalleryImageData {
  imgURL: string;
  showOnHomepage: boolean;
}

export interface AddGalleryImageDataInput {
  imgURL: string;
  showOnHomepage: boolean;
}

/**
 * Mutation for creating a new Gallery Image.
 */
export const ADD_GALLERY_IMAGE = gql`
  mutation AddGallery($title: String!, $description: String!, $showOnHomepage: Boolean) {
    addGallery(title: $title, description: $description, showOnHomepage: $showOnHomepage) {
      title
      description
    }
  }
`;
