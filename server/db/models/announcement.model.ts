import {
  Model,
  Table,
  Column,
  Default,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'announcement' })
export class Announcement extends Model {
  @AllowNull(false)
  @Column
  title!: string;

  @Column subtitle!: string;

  // This was put because the input of the content is HTML form and varchar(255) is
  // not enough to store all the info
  // TODO: reduced to 2000 but need to figure out either the number or better way to resolve this
  @Column({
    type: DataType.STRING(9999),
  })
  content!: string;

  @Default(false)
  @Column({ field: 'show_on_homepage' })
  showOnHomepage!: boolean;

  @Column({ field: 'image_url' })
  imageURL!: string;
}
