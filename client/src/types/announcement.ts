import { AnnouncementImage } from "./announcement_image";

export interface Announcement {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage: boolean;
}

export interface AnnouncementInput {
  title: string;
  subtitle: string;
  content: string;
  showOnHomepage?: boolean;
}
