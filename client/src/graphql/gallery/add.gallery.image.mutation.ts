import { gql } from '@apollo/client';


export interface GalleryImageData {
  imageURL: string;
}

export interface AddGalleryImageDataInput {
  imageURL: string;
}

/**
 * Mutation for creating a new Gallery Image.
 */
export const ADD_GALLERY_IMAGE = gql`
  mutation AddGalleryImages($imageURL: String!) {
    addGalleryImages(imageURL: $imageURL) {
      imageURL
    }
  }
`;
