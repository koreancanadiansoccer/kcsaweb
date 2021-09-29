import { GalleryImage } from './gallery_image';

export interface Gallery {
  title: string;
  description: string;
  showOnHomepage: boolean;
  images?: GalleryImage[];
}

export interface GalleryInput {
  title: string;
  description: string;
  showOnHomepage?: boolean;
  images?: GalleryImage[];
}
