export interface ICreateAuthSession {
  userUid: string;
  expiresIn?: number; // time in seconds
}

export interface IAuthSession {
  token: string;
  userUid: string;
  createdAt: Date;
  expiresAt: Date;
}
