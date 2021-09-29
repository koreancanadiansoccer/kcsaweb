import {
  Model,
  Table,
  Column,
  Default,
  AllowNull,
  HasMany
} from "sequelize-typescript";
import { GalleryImage } from "./galleryimage.model";

@Table({ tableName: 'gallery' })
export class Gallery extends Model {
  @AllowNull(false)
  @Column
  title!: string;

  @Column description!: string;

  @Default(false)
  @Column({ field: 'show_on_homepage' })
  showOnHomepage!: boolean;

  @HasMany(() => GalleryImage) galleryImage!: GalleryImage[];
}