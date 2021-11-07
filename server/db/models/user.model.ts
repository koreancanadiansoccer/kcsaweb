import {
  Model,
  Table,
  Column,
  HasMany,
  DataType,
  Default,
  AllowNull,
  HasOne,
} from 'sequelize-typescript';
import keys from 'lodash/keys';

import { Team } from './team.model';
import { LeagueTeam } from './leagueteam.model';

export enum AccountType {
  ADMIN = 'ADMIN',
  CAPTAIN = 'CAPTAIN',
}

export enum ACCOUNTSTATUS {
  INVITED = 'INVITED',
  REGISTERINGTEAM = 'REGISTERINGTEAM',
  COMPLETED = 'COMPLETED',
}

@Table({ tableName: 'user' })
export class User extends Model {
  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(false)
  @Column
  lastName!: string;

  @Column
  dob!: string;

  // Note: Password can be null upon captain invitation
  @Column
  password!: string;

  @AllowNull(false)
  @Column
  email!: string;

  @Default(false)
  @Column({ field: 'is_admin' })
  isAdmin!: boolean;

  @AllowNull(false)
  @Column({ field: 'phone_number' })
  phoneNumber!: string;

  @Column({ type: DataType.ENUM({ values: keys(AccountType) }) })
  type!: AccountType;

  @Column
  status!: string;

  @HasOne(() => Team) team?: Team;

  @HasMany(() => LeagueTeam) leagueTeams?: LeagueTeam[];
}
