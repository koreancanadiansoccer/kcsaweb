export interface Gallery {
  id: string;
  title: string;
  description: string;
  showOnHomepage: boolean;
  galleryImages?: GalleryImage[];
  createdAt: string;
}

export interface GalleryInput {
  title: string;
  description: string;
  showOnHomepage?: boolean;
  galleryImages?: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  imageURL: string;
}

export interface GalleryImageInput {
  imageURL: string;
}
