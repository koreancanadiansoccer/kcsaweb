import {
  Model,
  Table,
  Column,
  Default,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Gallery } from "./gallery.model";

@Table({ tableName: 'gallery_image' })
export class GalleryImage extends Model {
  @AllowNull(false)
  @Column({ field: 'image_url' })
  imageURL!: string;

  @ForeignKey(() => Gallery)
  @Column({ field: 'gallery_id' })
  galleryId!: number;

  @BelongsTo(() => Gallery) galleery!: Gallery;
}
