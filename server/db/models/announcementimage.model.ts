import {
  Model,
  Table,
  Column,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Announcement } from "./announcement.model";

@Table({ tableName: "announcement_image" })
export class AnnouncementImage extends Model {
  @AllowNull(false)
  @Column({ field: "image_url" })
  imageURL!: string;

  @ForeignKey(() => Announcement)
  @Column({ field: "announcement_id" })
  announcementId!: number;

  @BelongsTo(() => Announcement) announcement!: Announcement;
}
