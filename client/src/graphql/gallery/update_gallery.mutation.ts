import { gql } from '@apollo/client';

import { Gallery } from '../../types/gallery';

export interface UpdateShowGalleryInput {
  id: string;
  showOnHomepage: boolean;
}

export interface UpdateShowGalleryResult {
  updateGallery: Gallery[];
}

export const UPDATE_GALLERY = gql`
  mutation UpdateGallery(
    $id: String!
    $showOnHomepage: Boolean!
  ) {
    updateGallery(
      id: $id
      showOnHomepage: $showOnHomepage
    ) {
      id
      title
      description
      showOnHomepage
      createdAt
    }
  }
`;
