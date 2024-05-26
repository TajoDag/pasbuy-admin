import { IUser } from "../user";

export interface ILogin {
  username: string;
  password: string;
}

export interface IResultLogin {
  token: string;
  user: IUser;
}
