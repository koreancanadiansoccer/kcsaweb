import { Team } from './team';
export interface User {
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
  password: string;
  email: string;
  phoneNumber: string;
}
