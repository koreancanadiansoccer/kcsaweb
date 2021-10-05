import { gql } from '@apollo/client';

import { Gallery } from "../../types/gallery"

export interface GalleryQueryData {
  getGallery: Gallery;
}

export interface GalleryQueryVariable {
  id: string;
}

export const GET_GALLERY = gql`
  query GetGallery($id: String!) {
    getGallery(id: $id) {
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