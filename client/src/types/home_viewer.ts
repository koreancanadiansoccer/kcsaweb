import { User } from './user';
import { Announcement } from './announcement';

export interface HomeViewer {
  user?: User;
  announcements?: Announcement[];
}
