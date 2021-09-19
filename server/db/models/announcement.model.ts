import {
  Model,
  Table,
  Column,
  HasMany,
  Default,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";

import { AnnouncementImage } from "./announcementimage.model";

@Table({ tableName: "announcement" })
export class Announcement extends Model {
  @AllowNull(false)
  @Column
  title!: string;

  @Column({ field: "sub-title" }) subTitle!: string;

  @Column content!: string;

  @Default(false)
  @Column({ field: "show_on_homepage" })
  showOnHomepage!: boolean;

  @ForeignKey(() => AnnouncementImage)
  @Column({ field: "announcement_id" })
  announcementId!: number;

  @HasMany(() => AnnouncementImage) players!: AnnouncementImage[];
}
