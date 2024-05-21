import { IUser } from "../user";

export interface ILogin {
  email: string;
  password: string;
}

export interface IResultLogin {
  token: string;
  user: IUser;
}
