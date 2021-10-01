import { AnnouncementImage } from "./announcement_image";

export interface Announcement {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage: boolean;
  images?: AnnouncementImage[];
}

export interface AnnouncementInput {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
  images?: AnnouncementImage[];
}
