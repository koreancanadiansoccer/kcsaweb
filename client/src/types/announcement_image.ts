import { Announcement } from "./announcement";

export interface AnnouncementImage {
  imgURL: string;
  announcementId?: Announcement[];
}

export interface AnnouncementImageInput {
  imgURL: string;
  announcementId?: Announcement[];
}
