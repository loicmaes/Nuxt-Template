export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  uid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export type IBackUser = IUser & { password: string };
