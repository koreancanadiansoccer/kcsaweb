export interface Gallery {
  id: string;
  title: string;
  subTitle: string;
  showOnHomepage: boolean;
  images?: GalleryImage[];
}

export interface GalleryInput {
  title: string;
  subTitle: string;
  showOnHomepage?: boolean;
  images?: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  imageURL: string;
}

export interface GalleryImageInput {
  imageURL: string;
}
