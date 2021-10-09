export interface Announcement {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageURL?: string;
  showOnHomepage: boolean;
}

export interface AnnouncementInput {
  title: string;
  subtitle: string;
  content: string;
  imageURL?: string;
  showOnHomepage?: boolean;
}
