import { Team } from './team';

export enum ACCOUNTSTATUS {
  INVITED = 'INVITED',
  REGISTERINGTEAM = 'REGISTERINGTEAM',
  COMPLETED = 'COMPLETED',
}

export const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  status: ACCOUNTSTATUS;
  phoneNumber: string;
  isAdmin: boolean;
  team: Team;
}

export interface NewCaptain {
  firstName: string;
  lastName: string;
  dob: string;
  teamName: string;
  phoneNumber: string;
  email: string;
}

// NOT USED ATM:
export interface UserInput {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}
