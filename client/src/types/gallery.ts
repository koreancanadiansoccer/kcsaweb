import { GalleryImage } from './gallery_image';

export interface Gallery {
  title: string;
  content: string;
  showOnHomepage: boolean;
  images?: GalleryImage[];
}

export interface GalleryInput {
  title: string;
  content: string;
  showOnHomepage?: boolean;
  images?: GalleryImage[];
}
