export interface ICreateUser {
  username: string;
  password: string;
}

export interface IUser {
  uid: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
