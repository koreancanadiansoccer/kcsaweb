import { User } from './user';
import { Announcement } from './announcement';
import { Gallery } from './gallery';

export interface HomeViewer {
  user?: User;
  announcements?: Announcement[];
  galleries?: Gallery[];
}
