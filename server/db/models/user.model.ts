import {
  Model,
  Table,
  Column,
  HasMany,
  DataType,
  Default,
  AllowNull,
  HasOne,
} from "sequelize-typescript";
import keys from "lodash/keys";

import { Team } from "./team.model";

export enum AccountType {
  ADMIN = "ADMIN",
  CAPTAIN = "CAPTAIN",
}

export enum AccountStatus {
  INVITED = "INVITED",
  ACCEPTED = "ACCEPTED",
}

@Table({ tableName: "user" })
export class User extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column email!: string;

  @Default(false)
  @Column({ field: "is_admin" })
  isAdmin!: boolean;

  @Column({ type: DataType.ENUM({ values: keys(AccountType) }) })
  type!: AccountType;

  @Column({ type: DataType.ENUM({ values: keys(AccountStatus) }) })
  status!: AccountStatus;

  @HasOne(() => Team) team?: Team[];
}
