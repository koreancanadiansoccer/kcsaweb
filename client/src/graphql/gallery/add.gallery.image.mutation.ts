import { gql } from '@apollo/client';


export interface GalleryImageData {
  imgURL: string;
}

export interface AddGalleryImageDataInput {
  imgURL: string;
}

/**
 * Mutation for creating a new Gallery Image.
 */
export const ADD_GALLERY_IMAGE = gql`
  mutation AddGalleryImages($title: String!, $description: String!) {
    addGalleryImages(title: $title, description: $description) {
      title
      description
    }
  }
`;
