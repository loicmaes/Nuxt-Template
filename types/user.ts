export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type IUpdateUser = Partial<Omit<Omit<Omit<IBackUser, "createdAt">, "updatedAt">, "uid">>;

export interface IUser {
  uid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  verifiedAt?: Date;
}
export type IBackUser = IUser & { password: string };

export interface IUserActionRequest {
  uid: string;
  userUid: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}
export type IAccountVerification = IUserActionRequest;
export type IPasswordRequest = IUserActionRequest;
