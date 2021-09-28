import { Gallery } from './gallery';

export interface GalleryImage {
  imgURL: string;
  galleryId?: Gallery[];
}

export interface GalleryImageInput {
  imgURL: string;
  galleryId?: Gallery[];
}
