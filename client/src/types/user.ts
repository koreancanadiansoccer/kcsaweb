export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}

export interface UserInput {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}
