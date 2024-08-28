interface IBaseUser {
  email: string;
  createdAt: Date;
}

export interface IUser extends IBaseUser {
  username?: string;
  googleId?: string;
  displayName?: string;
  password?: string;
}

export interface ILocalUser extends IBaseUser {
  username: string;
  password: string;
}

export interface IGoogleUser extends IBaseUser {
  googleId: string;
  displayName: string;
}