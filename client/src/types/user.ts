import { Team } from './team';
export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  isAdmin: boolean;
  team: Team;
}

export interface NewCaptain {
  name: string;
  teamName: string;
  phoneNumber: string;
  email: string;
}

// NOT USED ATM:
export interface UserInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}
