import {
  Model,
  Table,
  Column,
  Default,
  AllowNull,
  HasMany,
  DataType
} from "sequelize-typescript";

import { GalleryImage } from "./galleryimage.model";

@Table({ tableName: 'gallery' })
export class Gallery extends Model {
  @AllowNull(false)
  @Column
  title!: string;

  @Column({
    type: DataType.STRING(1000),
  })
  description!: string;

  @Default(false)
  @Column({ field: 'show_on_homepage' })
  showOnHomepage!: boolean;

  @HasMany(() => GalleryImage) galleryImages!: GalleryImage[];
}
