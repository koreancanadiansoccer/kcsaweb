import { Gallery } from './gallery';

export interface GalleryImage {
  imgURL: string;
  showOnHomepage: boolean;
  galleryId?: Gallery[];
}

export interface GalleryImageInput {
  imgURL: string;
  showOnHomepage?: boolean;
  galleryId?: Gallery[];
}
